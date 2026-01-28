import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [{ name: 'Sales', value: 71 }, { name: 'Remaining', value: 29 }]
const COLORS = ['#9333EA', '#E5E7EB']

function SalesOverview() {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Sales Overview</h3>
        <select className="text-sm border border-gray-600 rounded-lg px-4 py-2 text-white bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
          <option>Today</option>
        </select>
      </div>
      <div className="flex items-center space-x-8">
        <div className="relative w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">71%</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-semibold text-white">System status</span>
          </div>
          <p className="text-sm text-purple-400 font-semibold mb-4">OPTIMUM</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Lorem ipsum dolor sit amet consectur adipiscing elit sed do eiusmod tempor.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SalesOverview

