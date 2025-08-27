import React from 'react'
import http from '../services/http'

export default function FinancialInsights({ isOpen, onClose }) {
  const [insights, setInsights] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('insights')
  const [cashFlowForm, setCashFlowForm] = React.useState({ monthlyIncome: '' })
  const [recommendationForm, setRecommendationForm] = React.useState({
    monthlyBudget: '',
    riskTolerance: 'medium',
    goals: 'saving'
  })
  const [cashFlowTips, setCashFlowTips] = React.useState(null)
  const [recommendations, setRecommendations] = React.useState(null)

  React.useEffect(() => {
    if (isOpen && activeTab === 'insights') {
      loadFinancialInsights()
    }
  }, [isOpen, activeTab])

  async function loadFinancialInsights() {
    setLoading(true)
    try {
      const { data } = await http.get('/insights/financial')
      setInsights(data.data)
    } catch (error) {
      console.error('Failed to load insights:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadCashFlowTips() {
    if (!cashFlowForm.monthlyIncome) return
    setLoading(true)
    try {
      const { data } = await http.post('/insights/cashflow', {
        monthlyIncome: parseInt(cashFlowForm.monthlyIncome)
      })
      setCashFlowTips(data.data)
    } catch (error) {
      console.error('Failed to load cash flow tips:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadRecommendations() {
    if (!recommendationForm.monthlyBudget) return
    setLoading(true)
    try {
      const { data } = await http.post('/insights/recommendations', {
        monthlyBudget: parseInt(recommendationForm.monthlyBudget),
        riskTolerance: recommendationForm.riskTolerance,
        goals: recommendationForm.goals
      })
      setRecommendations(data.data)
    } catch (error) {
      console.error('Failed to load recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🤖 AI Financial Insights</h2>
              <p className="text-blue-100 mt-1">Analisis keuangan arisan Anda</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-gray-50">
          <div className="flex">
            {[
              { id: 'insights', label: '📊 Insights', icon: '📊' },
              { id: 'cashflow', label: '💰 Cash Flow', icon: '💰' },
              { id: 'recommendations', label: '🎯 Rekomendasi', icon: '🎯' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">AI sedang menganalisis data Anda...</p>
            </div>
          )}

          {/* Financial Insights Tab */}
          {activeTab === 'insights' && insights && !loading && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{insights.stats.totalParticipated}</div>
                  <div className="text-sm text-green-700">Total Ikut Arisan</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{insights.stats.totalWon}</div>
                  <div className="text-sm text-blue-700">Total Menang</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{insights.stats.winRate}%</div>
                  <div className="text-sm text-purple-700">Win Rate</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{insights.stats.currentRooms}</div>
                  <div className="text-sm text-orange-700">Room Aktif</div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  🤖 AI Analysis
                </h3>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {insights.insights}
                </div>
              </div>
            </div>
          )}

          {/* Cash Flow Tab */}
          {activeTab === 'cashflow' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold mb-4">Input Penghasilan Bulanan</h3>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Penghasilan per bulan (Rp)"
                    value={cashFlowForm.monthlyIncome}
                    onChange={(e) => setCashFlowForm({ monthlyIncome: e.target.value })}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={loadCashFlowTips}
                    disabled={!cashFlowForm.monthlyIncome || loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analisis
                  </button>
                </div>
              </div>

              {cashFlowTips && !loading && (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <div className="text-lg font-bold text-green-600">
                        Rp {cashFlowTips.monthlyIncome.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-700">Penghasilan Bulanan</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="text-lg font-bold text-blue-600">
                        Rp {cashFlowTips.totalCommitment.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-700">Komitmen Arisan</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <div className="text-lg font-bold text-purple-600">
                        {((cashFlowTips.totalCommitment / cashFlowTips.monthlyIncome) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-purple-700">dari Penghasilan</div>
                    </div>
                  </div>

                  {/* AI Tips */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      💡 AI Cash Flow Tips
                    </h3>
                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {cashFlowTips.tips}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold mb-4">Profil & Preferensi</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="number"
                    placeholder="Budget bulanan (Rp)"
                    value={recommendationForm.monthlyBudget}
                    onChange={(e) => setRecommendationForm({ ...recommendationForm, monthlyBudget: e.target.value })}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select
                    value={recommendationForm.riskTolerance}
                    onChange={(e) => setRecommendationForm({ ...recommendationForm, riskTolerance: e.target.value })}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Risk Rendah</option>
                    <option value="medium">Risk Sedang</option>
                    <option value="high">Risk Tinggi</option>
                  </select>
                  <select
                    value={recommendationForm.goals}
                    onChange={(e) => setRecommendationForm({ ...recommendationForm, goals: e.target.value })}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="saving">Menabung</option>
                    <option value="investment">Investasi</option>
                    <option value="emergency">Dana Darurat</option>
                  </select>
                </div>
                <button
                  onClick={loadRecommendations}
                  disabled={!recommendationForm.monthlyBudget || loading}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Dapatkan Rekomendasi
                </button>
              </div>

              {recommendations && !loading && (
                <div className="space-y-4">
                  {/* Available Rooms */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold mb-3">Room Tersedia ({recommendations.availableRooms.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {recommendations.availableRooms.map(room => (
                        <div key={room.id} className="bg-white p-3 rounded-lg border">
                          <div className="font-medium">{room.name}</div>
                          <div className="text-sm text-gray-600">
                            Rp {room.amount.toLocaleString()} • {room.participants} peserta
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      🎯 AI Recommendations
                    </h3>
                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {recommendations.recommendations}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
