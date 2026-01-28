import { HiChartBar } from 'react-icons/hi'

function OperationsCard() {
  const operations = [12, 15, 18, 14, 16, 15, 17, 15, 16, 15, 16, 15]

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-3">Operations</p>
          <p className="text-4xl font-bold text-white mb-4">15.893</p>
          <div className="flex items-end space-x-1 h-16">
            {operations.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t"
                style={{ height: `${(value / 20) * 100}%`, minHeight: '4px' }}
              ></div>
            ))}
          </div>
        </div>
        <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-600/30">
          <HiChartBar className="w-8 h-8 text-purple-400" />
        </div>
      </div>
    </div>
  )
}

export default OperationsCard

