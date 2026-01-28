import { useState } from 'react'
import { HiX, HiDocumentText, HiLightBulb, HiCalendar } from 'react-icons/hi'

function Tools() {
  const [isStoryWritingModalOpen, setIsStoryWritingModalOpen] = useState(false)
  const [isPromptsModalOpen, setIsPromptsModalOpen] = useState(false)
  const [isCalendarSyncModalOpen, setIsCalendarSyncModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
        <h2 className="text-3xl font-bold text-white mb-8">Tools</h2>
        
        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Story Writing Card */}
          <button
            onClick={() => setIsStoryWritingModalOpen(true)}
            className="bg-gray-700 hover:bg-gray-600 rounded-xl border border-gray-600 p-6 text-left transition-all hover:border-purple-500 hover:shadow-lg group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiDocumentText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Story Writing</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Create and manage user stories for your projects.
            </p>
          </button>

          {/* Prompts Card */}
          <button
            onClick={() => setIsPromptsModalOpen(true)}
            className="bg-gray-700 hover:bg-gray-600 rounded-xl border border-gray-600 p-6 text-left transition-all hover:border-purple-500 hover:shadow-lg group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiLightBulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Prompts</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Create, manage, and reuse AI prompts for your workflows.
            </p>
          </button>

          {/* Calendar Sync Card */}
          <button
            onClick={() => setIsCalendarSyncModalOpen(true)}
            className="bg-gray-700 hover:bg-gray-600 rounded-xl border border-gray-600 p-6 text-left transition-all hover:border-purple-500 hover:shadow-lg group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiCalendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Calendar Sync</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Sync and manage calendar events across different platforms.
            </p>
          </button>
        </div>
      </div>

      {/* Story Writing Modal */}
      {isStoryWritingModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[80]"
            onClick={() => setIsStoryWritingModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div
              className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                    <HiDocumentText className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Story Writing</h2>
                </div>
                <button
                  onClick={() => setIsStoryWritingModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="Close modal"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-gray-400">
                  Story writing tool content will be added here.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Prompts Modal */}
      {isPromptsModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[80]"
            onClick={() => setIsPromptsModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div
              className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                    <HiLightBulb className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Prompts</h2>
                </div>
                <button
                  onClick={() => setIsPromptsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="Close modal"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-gray-400">
                  Prompts tool content will be added here.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Calendar Sync Modal */}
      {isCalendarSyncModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[80]"
            onClick={() => setIsCalendarSyncModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <div
              className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                    <HiCalendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Calendar Sync</h2>
                </div>
                <button
                  onClick={() => setIsCalendarSyncModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="Close modal"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-gray-400">
                  Calendar sync tool content will be added here.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Tools

