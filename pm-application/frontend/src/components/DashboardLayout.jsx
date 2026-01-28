import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiCog, HiHome, HiChevronLeft, HiChevronRight, HiDocumentText, HiPuzzle, HiBriefcase } from 'react-icons/hi'

function DashboardLayout({ children }) {
  const [menuCollapsed, setMenuCollapsed] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)
  const location = useLocation()

  const menuItems = [
    { name: 'Home', icon: HiHome, path: '/' },
    { name: 'Client Engagements', icon: HiBriefcase, path: '/client-engagements' },
    { name: 'Tools', icon: HiPuzzle, path: '/tools' },
    { name: 'Documentation', icon: HiDocumentText, path: '/documentation' },
  ]

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className={`${menuCollapsed ? 'w-20' : 'w-64'} bg-gray-800 border-r border-gray-700 transition-all duration-300 overflow-hidden flex flex-col`}>
        {/* Logo Section */}
        <div className={`flex items-center ${menuCollapsed ? 'justify-center px-4' : 'justify-between px-6'} py-6 border-b border-gray-700`}>
          {menuCollapsed ? (
            <button
              onClick={() => setMenuCollapsed(false)}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
              title="Expand menu"
            >
              {logoHovered ? (
                <HiChevronRight className="w-6 h-6 text-white" />
              ) : (
                <span className="text-white font-bold text-xl">A</span>
              )}
            </button>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-lg font-bold text-white tracking-tight">ARTIUM</span>
              </div>
              <button
                onClick={() => setMenuCollapsed(true)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-700"
                title="Collapse menu"
              >
                <HiChevronLeft className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuCollapsed ? (
            <div className="space-y-2 px-3">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-center p-3 rounded-lg transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    title={item.name}
                  >
                    <IconComponent className="w-6 h-6" />
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="space-y-1 px-3">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </nav>

        {/* Settings Section */}
        <div className="border-t border-gray-700 py-4">
          {menuCollapsed ? (
            <div className="px-3">
              <Link
                to="/settings"
                className={`flex items-center justify-center p-3 rounded-lg transition-all cursor-pointer group ${
                  location.pathname === '/settings'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                title="Settings"
              >
                <HiCog className="w-6 h-6" />
              </Link>
            </div>
          ) : (
            <div className="px-3">
              <Link
                to="/settings"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer group ${
                  location.pathname === '/settings'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <HiCog className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">Settings</span>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
        {/* Top Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">
              {location.pathname === '/' ? 'Home' :
               location.pathname === '/client-engagements/github' || location.pathname === '/agents' ? 'GitHub' :
               location.pathname === '/client-engagements/ado' || location.pathname === '/ado' ? 'ADO' :
               location.pathname === '/settings' ? 'Settings' :
               location.pathname === '/documentation' ? 'Documentation' :
               location.pathname === '/tools' ? 'Tools' :
               location.pathname === '/client-engagements' ? 'Client Engagements' :
               'Dashboard'}
            </h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
