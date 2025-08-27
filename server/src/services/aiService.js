const axios = require('axios');
const config = require('../config');

// Base AI function with context support
async function generateAI(text, context = 'general') {
  if (!config.useAI || !config.llm.baseUrl || !config.llm.apiKey) {
    return getDefaultResponse(context);
  }

  const systemPrompts = {
    general: 'Kamu Arisan Bot yang ramah dan helpful. Bantu user dengan pertanyaan arisan, keuangan, dan tips saving. Gunakan bahasa Indonesia casual tapi informatif. Maks 120 kata.',
    welcome: 'Kamu Arisan Bot yang ramah. Sambut member baru dengan hangat, jelaskan singkat cara kerja arisan, dan beri semangat. Gunakan emoji dan bahasa Indonesia casual. Maks 100 kata.',
    financial: 'Kamu Arisan Bot yang ahli keuangan. Analisis data dan berikan insight finansial yang praktis untuk arisan. Beri saran yang actionable. Gunakan bahasa Indonesia. Maks 150 kata.',
    onboarding: 'Kamu Arisan Bot yang sabar dan jelas. Jelaskan aturan arisan dengan mudah dipahami untuk pemula. Gunakan contoh dan step by step. Bahasa Indonesia friendly. Maks 140 kata.'
  };

  const body = {
    model: config.llm.model,
    messages: [
      { role: 'system', content: systemPrompts[context] || systemPrompts.general },
      { role: 'user', content: String(text).slice(0, 4000) }
    ],
    temperature: 0.7,
    max_tokens: 200
  };

  try {
    const resp = await axios.post(config.llm.baseUrl, body, {
      headers: {
        'Authorization': `Bearer ${config.llm.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    const data = resp.data || {};
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content.trim();
    }
    return getDefaultResponse(context);
  } catch {
    return 'Bot lagi sibuk, coba lagi sebentar ya. 🤖';
  }
}

function getDefaultResponse(context) {
  const defaults = {
    general: 'Halo! Saya Arisan Bot siap bantu kamu. Ketik /ai [pertanyaan] atau @bot untuk ngobrol! 😊',
    welcome: 'Selamat datang di arisan! 🎉 Mari menabung bersama dengan cara yang seru dan fair!',
    financial: 'Konsistensi adalah kunci! Arisan membantu disiplin menabung dan membangun masa depan finansial yang baik. 💰',
    onboarding: 'Arisan itu simple: semua kontribusi setiap periode, lalu diundi fair. Yang menang dapat semua uang periode itu! 🎲'
  };
  return defaults[context] || defaults.general;
}

// 1. Smart Chat Assistant - Enhanced
async function handleChatAssistant(message, userName) {
  const lowerMsg = message.toLowerCase();
  
  // Detect specific topics
  if (lowerMsg.includes('aturan') || lowerMsg.includes('cara') || lowerMsg.includes('gimana')) {
    return await generateAI(`${userName} bertanya tentang cara kerja arisan: "${message}"`, 'onboarding');
  }
  
  if (lowerMsg.includes('uang') || lowerMsg.includes('nabung') || lowerMsg.includes('tips') || lowerMsg.includes('keuangan')) {
    return await generateAI(`${userName} butuh tips keuangan: "${message}"`, 'financial');
  }
  
  // General chat
  return await generateAI(`${userName} bertanya: "${message}"`, 'general');
}

// 2. Auto Welcome & Onboarding
async function generateWelcomeMessage(userName, roomName, roomDetails) {
  const prompt = `Member baru "${userName}" join room arisan "${roomName}". Room info: ${roomDetails.participants || 0} peserta, kontribusi ${roomDetails.amount || 'belum diset'}, periode ${roomDetails.period || 'belum diset'}. Sambut hangat dan jelaskan basic arisan!`;
  return await generateAI(prompt, 'welcome');
}

async function generateOnboardingTips(userName, phase = 'basic') {
  const prompts = {
    basic: `Jelaskan ke ${userName} cara dasar arisan bekerja dengan bahasa yang mudah dipahami`,
    rules: `Jelaskan ke ${userName} aturan penting dalam arisan yang harus diikuti`,
    tips: `Beri ${userName} tips sukses mengikuti arisan untuk pemula`
  };
  
  return await generateAI(prompts[phase] || prompts.basic, 'onboarding');
}

// 3. Financial Insights & Analytics
async function generateFinancialInsights(userData) {
  const {
    userName,
    totalParticipated = 0,
    totalWon = 0,
    winRate = 0,
    avgWinAmount = 0,
    monthsActive = 0,
    currentRooms = 0
  } = userData;

  const prompt = `Analisis finansial untuk ${userName}:
- Total ikut arisan: ${totalParticipated} kali
- Total menang: ${totalWon} kali (${winRate}% win rate)
- Rata-rata menang: Rp ${avgWinAmount.toLocaleString()}
- Aktif: ${monthsActive} bulan
- Room aktif saat ini: ${currentRooms}

Berikan insight dan saran finansial yang praktis!`;

  return await generateAI(prompt, 'financial');
}

async function generateCashFlowTips(monthlyIncome, arisanCommitments) {
  const totalCommitment = arisanCommitments.reduce((sum, room) => sum + room.amount, 0);
  const percentage = (totalCommitment / monthlyIncome * 100).toFixed(1);

  const prompt = `User punya income ${monthlyIncome.toLocaleString()}/bulan, komitmen arisan total ${totalCommitment.toLocaleString()} (${percentage}% dari income). Komitmen di ${arisanCommitments.length} room. Beri tips mengatur cash flow arisan yang sehat!`;

  return await generateAI(prompt, 'financial');
}

async function generateRoomRecommendation(userProfile, availableRooms) {
  const { riskTolerance, monthlyBudget, goals } = userProfile;
  
  const prompt = `User profile: budget ${monthlyBudget.toLocaleString()}/bulan, risk tolerance: ${riskTolerance}, goals: ${goals}. 

Available rooms: ${availableRooms.map(room => 
    `"${room.name}" (${room.amount.toLocaleString()}/periode, ${room.participants} peserta)`
  ).join(', ')}

Rekomendasikan room mana yang cocok dan kenapa!`;

  return await generateAI(prompt, 'financial');
}

module.exports = { 
  generateAI,
  handleChatAssistant,
  generateWelcomeMessage,
  generateOnboardingTips,
  generateFinancialInsights,
  generateCashFlowTips,
  generateRoomRecommendation
};
