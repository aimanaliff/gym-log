import { useNavigate, useLocation } from 'react-router-dom'

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/log', label: 'Log', icon: '➕' },
    { path: '/history', label: 'History', icon: '📋' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-zinc-900 border-t border-zinc-700 py-3">
      {tabs.map(tab => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          className={`flex flex-col items-center text-xs gap-1 px-4 ${
            location.pathname === tab.path ? 'text-blue-400' : 'text-zinc-400'
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default BottomNav