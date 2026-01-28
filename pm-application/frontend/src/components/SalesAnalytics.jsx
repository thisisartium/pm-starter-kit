import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'M', value: 45 },
  { day: 'T', value: 52 },
  { day: 'W', value: 48 },
  { day: 'T', value: 67, highlighted: true },
  { day: 'F', value: 72 },
]

function SalesAnalytics() {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-bold text-white mb-6">Sales Analytics</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
          <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
            labelStyle={{ color: '#F3F4F6' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#EC4899"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
            dot={(entry) => {
              if (entry.highlighted) {
                return { fill: '#EC4899', r: 6, stroke: '#fff', strokeWidth: 2 }
              }
              return false
            }}
            activeDot={{ r: 7 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesAnalytics

