type Set = {
    reps: number
    weight: number
  }
  
  type Exercise = {
    name: string
    sets: Set[]
  }
  
  type Workout = {
    id: number
    type: string
    date: string
    exercises: Exercise[]
  }
  
  const workoutHistory: Workout[] = [
    {
      id: 1,
      type: 'Push',
      date: 'Mon, 5 May 2026',
      exercises: [
        { name: 'Bench Press', sets: [{ reps: 10, weight: 80 }, { reps: 8, weight: 85 }, { reps: 6, weight: 90 }] },
        { name: 'Overhead Press', sets: [{ reps: 10, weight: 50 }, { reps: 8, weight: 55 }] },
        { name: 'Lateral Raises', sets: [{ reps: 15, weight: 12 }, { reps: 15, weight: 12 }] },
      ]
    },
    {
      id: 2,
      type: 'Pull',
      date: 'Tue, 6 May 2026',
      exercises: [
        { name: 'Deadlift', sets: [{ reps: 5, weight: 140 }, { reps: 5, weight: 145 }] },
        { name: 'Barbell Row', sets: [{ reps: 10, weight: 80 }, { reps: 8, weight: 85 }] },
        { name: 'Face Pulls', sets: [{ reps: 15, weight: 20 }, { reps: 15, weight: 20 }] },
      ]
    },
    {
      id: 3,
      type: 'Legs',
      date: 'Wed, 7 May 2026',
      exercises: [
        { name: 'Squat', sets: [{ reps: 8, weight: 100 }, { reps: 8, weight: 105 }, { reps: 6, weight: 110 }] },
        { name: 'Leg Press', sets: [{ reps: 12, weight: 160 }, { reps: 10, weight: 170 }] },
        { name: 'Romanian Deadlift', sets: [{ reps: 10, weight: 80 }, { reps: 10, weight: 80 }] },
      ]
    },
  ]
  
  const typeColors: Record<string, string> = {
    Push: 'bg-blue-500',
    Pull: 'bg-purple-500',
    Legs: 'bg-green-500',
  }
  
  function History() {
    return (
      <div className="p-4 pb-24">
        <h1 className="text-2xl font-bold text-white mb-6">History</h1>
  
        <div className="flex flex-col gap-4">
          {workoutHistory.map(workout => (
            <div key={workout.id} className="bg-zinc-800 rounded-2xl p-4">
              {/* Workout Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs text-white font-bold px-2 py-1 rounded-lg ${typeColors[workout.type]}`}>
                    {workout.type.toUpperCase()}
                  </span>
                  <p className="text-white font-semibold">{workout.type} Day</p>
                </div>
                <p className="text-zinc-400 text-xs">{workout.date}</p>
              </div>
  
              {/* Exercises */}
              <div className="flex flex-col gap-2">
                {workout.exercises.map((exercise, eIndex) => (
                  <div key={eIndex} className="bg-zinc-700 rounded-xl p-3">
                    <p className="text-white text-sm font-semibold mb-2">{exercise.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {exercise.sets.map((set, sIndex) => (
                        <span key={sIndex} className="text-zinc-300 text-xs bg-zinc-600 px-2 py-1 rounded-lg">
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
      </div>
    )
  }
  
  export default History