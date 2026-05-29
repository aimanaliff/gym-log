import { useState, useEffect } from 'react'
import { workoutsService, type Workout } from '../services/workouts'

const typeColors: Record<string, string> = {
  Push: 'bg-blue-500',
  Pull: 'bg-purple-500',
  Legs: 'bg-green-500',
}

function History() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    workoutsService.getAll()
      .then(data => {
        setWorkouts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load workouts')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="p-4 text-zinc-400">Loading...</div>
  }

  if (error) {
    return <div className="p-4 text-red-400">{error}</div>
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-white mb-6">History</h1>

      {workouts.length === 0 ? (
        <p className="text-zinc-400">No workouts logged yet. Start your first workout!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {workouts.map(workout => (
            <div key={workout.id} className="bg-zinc-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs text-white font-bold px-2 py-1 rounded-lg ${typeColors[workout.type]}`}>
                    {workout.type.toUpperCase()}
                  </span>
                  <p className="text-white font-semibold">{workout.type} Day</p>
                </div>
                <p className="text-zinc-400 text-xs">
                  {new Date(workout.date).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {workout.exercises.map(exercise => (
                  <div key={exercise.id} className="bg-zinc-700 rounded-xl p-3">
                    <p className="text-white text-sm font-semibold mb-2">{exercise.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {exercise.sets.map(set => (
                        <span key={set.id} className="text-zinc-300 text-xs bg-zinc-600 px-2 py-1 rounded-lg">
                          {set.reps} reps × {set.weight}kg
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History