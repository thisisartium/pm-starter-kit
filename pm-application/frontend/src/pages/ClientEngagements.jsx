import { Link } from 'react-router-dom'
import { HiUser, HiCloud } from 'react-icons/hi'

function ClientEngagements() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
        <h2 className="text-3xl font-bold text-white mb-8">Client Engagements</h2>
        
        {/* Engagement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GitHub Card */}
          <Link
            to="/client-engagements/github"
            className="bg-gray-700 hover:bg-gray-600 rounded-xl border border-gray-600 p-8 text-left transition-all hover:border-purple-500 hover:shadow-lg group cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <HiUser className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">GitHub</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Connect and manage GitHub repositories. Query codebases, analyze commits, and interact with your GitHub projects.
            </p>
          </Link>

          {/* ADO Card */}
          <Link
            to="/client-engagements/ado"
            className="bg-gray-700 hover:bg-gray-600 rounded-xl border border-gray-600 p-8 text-left transition-all hover:border-purple-500 hover:shadow-lg group cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <HiCloud className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Azure DevOps</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Connect and manage Azure DevOps repositories. Query codebases, analyze commits, and interact with your ADO projects.
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ClientEngagements

