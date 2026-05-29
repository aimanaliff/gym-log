import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { workoutsService, type Workout } from '../services/workouts'

function Dashboard() {
  const navigate = useNavigate()
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    workoutsService.getAll()
      .then(data => {
        setRecentWorkouts(data.slice(0, 3))
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-white mb-1">Hey, Aliff 👋</h1>
      <p className="text-zinc-400 text-sm mb-6">Ready to train today?</p>

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

      <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Recent Workouts</p>
      {loading ? (
        <p className="text-zinc-400 text-sm">Loading...</p>
      ) : recentWorkouts.length === 0 ? (
        <p className="text-zinc-400 text-sm">No workouts yet. Start your first one!</p>
      ) : (
        <div className="flex flex-col gap-3">
          {recentWorkouts.map(workout => (
            <div key={workout.id} className="bg-zinc-800 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">{workout.type} Day</p>
                <p className="text-zinc-400 text-sm">
                  {new Date(workout.date).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
              </div>
              <p className="text-zinc-400 text-sm">{workout.exercises.length} exercises</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard