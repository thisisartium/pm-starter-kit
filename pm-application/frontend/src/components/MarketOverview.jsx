import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: '1', activity: 45, goal: 60 },
  { name: '2', activity: 52, goal: 65 },
  { name: '3', activity: 48, goal: 70 },
  { name: '4', activity: 61, goal: 75 },
  { name: '5', activity: 55, goal: 80 },
  { name: '6', activity: 67, goal: 85 },
  { name: '7', activity: 72, goal: 90 },
  { name: '8', activity: 65, goal: 85 },
  { name: '9', activity: 78, goal: 95 },
  { name: '10', activity: 82, goal: 100 },
]

function MarketOverview() {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-bold text-white mb-6">Market Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
          <YAxis stroke="#9CA3AF" domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
            labelStyle={{ color: '#F3F4F6' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }} />
          <Bar dataKey="activity" fill="#9333EA" name="Activity" radius={[8, 8, 0, 0]} />
          <Bar dataKey="goal" fill="#EC4899" name="Goal" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MarketOverview

