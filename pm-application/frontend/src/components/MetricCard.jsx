import { HiArrowUp, HiArrowDown } from 'react-icons/hi'

function MetricCard({ title, value, change, changeType, icon: Icon, iconBg }) {
  const isPositive = changeType === 'positive'
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600'
  const ArrowIcon = isPositive ? HiArrowUp : HiArrowDown

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-3">{title}</p>
          <p className="text-4xl font-bold text-white mb-4">{value}</p>
          <div className={`flex items-center space-x-1 ${changeColor}`}>
            <ArrowIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">{change}</span>
          </div>
        </div>
        <div className={`w-16 h-16 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-700`}>
          {Icon && <Icon className="w-8 h-8 text-white" />}
        </div>
      </div>
    </div>
  )
}

export default MetricCard

