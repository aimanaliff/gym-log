import { useNavigate } from 'react-router-dom'

const recentWorkouts = [
  { id: 1, type: 'Push', date: 'Mon, 5 May', exercises: 5 },
  { id: 2, type: 'Pull', date: 'Tue, 6 May', exercises: 4 },
  { id: 3, type: 'Legs', date: 'Wed, 7 May', exercises: 6 },
]

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <h1 className="text-2xl font-bold text-white mb-1">Hey, Aliff 👋</h1>
      <p className="text-zinc-400 text-sm mb-6">Ready to train today?</p>

      {/* Today's Plan */}
      <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Today's Plan</p>
        <p className="text-white text-xl font-bold mb-3">Push Day 💪</p>
        <button
          onClick={() => navigate('/log')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
        >
          Start Workout
        </button>
      </div>

      {/* Recent Workouts */}
      <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Recent Workouts</p>
      <div className="flex flex-col gap-3">
        {recentWorkouts.map(workout => (
          <div key={workout.id} className="bg-zinc-800 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">{workout.type} Day</p>
              <p className="text-zinc-400 text-sm">{workout.date}</p>
            </div>
            <p className="text-zinc-400 text-sm">{workout.exercises} exercises</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard