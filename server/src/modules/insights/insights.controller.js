const { generateFinancialInsights, generateCashFlowTips, generateRoomRecommendation } = require('../../services/aiService');
const { RoomParticipant, Room, Winner, User } = require('../../db/models');
const { Op } = require('sequelize');

// Get financial insights for current user
async function getUserFinancialInsights(req, res) {
  try {
    const userId = req.user.id;
    const userName = req.user.name;

    // Get user's arisan stats
    const totalParticipated = await RoomParticipant.count({ where: { userId } });
    const totalWon = await Winner.count({ where: { userId } });
    const winRate = totalParticipated > 0 ? ((totalWon / totalParticipated) * 100).toFixed(1) : 0;

    // Get average win amount
    const wins = await Winner.findAll({ 
      where: { userId },
      include: [{ model: Room, attributes: ['dues'] }]
    });
    const avgWinAmount = wins.length > 0 ? 
      wins.reduce((sum, win) => sum + (win.Room?.dues || 0), 0) / wins.length : 0;

    // Get months active (from first participation)
    const firstParticipation = await RoomParticipant.findOne({ 
      where: { userId }, 
      order: [['joinedAt', 'ASC']] 
    });
    const monthsActive = firstParticipation ? 
      Math.ceil((Date.now() - new Date(firstParticipation.joinedAt).getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0;

    // Get current active rooms
    const currentRooms = await RoomParticipant.count({ 
      where: { userId },
      include: [{ model: Room, where: { status: { [Op.in]: ['waiting', 'ongoing'] } } }]
    });

    const userData = {
      userName,
      totalParticipated,
      totalWon,
      winRate: parseFloat(winRate),
      avgWinAmount,
      monthsActive,
      currentRooms
    };

    const insights = await generateFinancialInsights(userData);

    res.json({
      success: true,
      data: {
        stats: userData,
        insights
      }
    });
  } catch (error) {
    console.error('Financial insights error:', error);
    res.status(500).json({ message: 'Failed to generate insights' });
  }
}

// Get cash flow recommendations
async function getCashFlowTips(req, res) {
  try {
    const userId = req.user.id;
    const { monthlyIncome } = req.body;

    if (!monthlyIncome || monthlyIncome <= 0) {
      return res.status(400).json({ message: 'Valid monthly income required' });
    }

    // Get user's current arisan commitments
    const activeRooms = await RoomParticipant.findAll({
      where: { userId },
      include: [{
        model: Room,
        where: { status: { [Op.in]: ['waiting', 'ongoing'] } },
        attributes: ['id', 'name', 'dues', 'drawFrequencyUnit'],
        required: true // Ensure Room data is present
      }]
    });

    console.log(`Cash Flow Debug - User ${userId}:`, {
      activeRoomsCount: activeRooms.length,
      rooms: activeRooms.map(rp => ({
        roomId: rp.Room?.id,
        roomName: rp.Room?.name,
        dues: rp.Room?.dues,
        status: rp.Room?.status
      }))
    });

    const arisanCommitments = activeRooms
      .filter(rp => rp.Room) // Extra safety check
      .map(rp => ({
        roomName: rp.Room.name,
        amount: rp.Room.dues || 0,
        period: rp.Room.drawFrequencyUnit || 'monthly'
      }));

    const tips = await generateCashFlowTips(monthlyIncome, arisanCommitments);

    res.json({
      success: true,
      data: {
        monthlyIncome,
        commitments: arisanCommitments,
        totalCommitment: arisanCommitments.reduce((sum, room) => sum + room.amount, 0),
        tips
      }
    });
  } catch (error) {
    console.error('Cash flow tips error:', error);
    res.status(500).json({ message: 'Failed to generate cash flow tips' });
  }
}

// Get room recommendations
async function getRoomRecommendations(req, res) {
  try {
    const userId = req.user.id;
    const { monthlyBudget, riskTolerance = 'medium', goals = 'saving' } = req.body;

    if (!monthlyBudget || monthlyBudget <= 0) {
      return res.status(400).json({ message: 'Valid monthly budget required' });
    }

    // Get available rooms (not full, user not already in)
    const userRoomIds = await RoomParticipant.findAll({
      where: { userId },
      attributes: ['roomId']
    }).then(rps => rps.map(rp => rp.roomId));

    // Get available rooms (simplified query)
    const availableRooms = await Room.findAll({
      where: {
        status: { [Op.in]: ['waiting', 'ongoing'] },
        id: { [Op.notIn]: userRoomIds }
      },
      attributes: ['id', 'name', 'dues', 'drawFrequencyUnit', 'capacity']
    });

    // Get participant counts separately
    const roomsWithCounts = await Promise.all(
      availableRooms.map(async (room) => {
        const participantCount = await RoomParticipant.count({
          where: { roomId: room.id }
        });
        
        return {
          id: room.id,
          name: room.name,
          amount: room.dues || 0,
          period: room.drawFrequencyUnit || 'monthly',
          participants: participantCount,
          maxParticipants: room.capacity || 0
        };
      })
    );

    // Filter rooms that aren't full
    const openRooms = roomsWithCounts.filter(room => 
      !room.maxParticipants || room.participants < room.maxParticipants
    );

    const userProfile = { riskTolerance, monthlyBudget, goals };
    const recommendations = await generateRoomRecommendation(userProfile, openRooms);

    res.json({
      success: true,
      data: {
        userProfile,
        availableRooms: openRooms,
        recommendations
      }
    });
  } catch (error) {
    console.error('Room recommendations error:', error);
    res.status(500).json({ message: 'Failed to generate recommendations' });
  }
}

module.exports = {
  getUserFinancialInsights,
  getCashFlowTips,
  getRoomRecommendations
};
