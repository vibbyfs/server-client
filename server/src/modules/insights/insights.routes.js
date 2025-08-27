const express = require('express');
const { getUserFinancialInsights, getCashFlowTips, getRoomRecommendations } = require('./insights.controller');

const router = express.Router();

// Get user's financial insights and analytics
router.get('/financial', getUserFinancialInsights);

// Get cash flow management tips
router.post('/cashflow', getCashFlowTips);

// Get room recommendations based on user profile
router.post('/recommendations', getRoomRecommendations);

module.exports = router;
