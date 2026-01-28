import { HiArrowDown, HiDocumentReport } from 'react-icons/hi'

const activities = [
  { type: 'incoming', title: 'Incoming Transfer Bitcoin', time: '10:30 AM' },
  { type: 'report', title: 'Sales Report Ethereum', time: '11:15 AM' },
  { type: 'incoming', title: 'Incoming Transfer Binance', time: '12:00 PM' },
  { type: 'incoming', title: 'Incoming Transfer Bitcoin', time: '1:45 PM' },
  { type: 'incoming', title: 'Incoming Transfer Bitcoin', time: '2:30 PM' },
]

function RecentActivity() {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-bold text-white mb-6">Today 22nd Jan, 2021</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                activity.type === 'incoming'
                  ? 'bg-purple-600/20 border-purple-600/30 text-purple-400'
                  : 'bg-pink-600/20 border-pink-600/30 text-pink-400'
              }`}
            >
              {activity.type === 'incoming' ? (
                <HiArrowDown className="w-5 h-5" />
              ) : (
                <HiDocumentReport className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{activity.title}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity

