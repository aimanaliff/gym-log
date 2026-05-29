import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { workoutsService } from '../services/workouts'

type Set = {
  reps: string
  weight: string
}

type Exercise = {
  name: string
  sets: Set[]
}

function LogWorkout() {
  const navigate = useNavigate()
  const [workoutType, setWorkoutType] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [exerciseName, setExerciseName] = useState('')
  const [saving, setSaving] = useState(false)

  function addExercise() {
    if (!exerciseName.trim()) return
    setExercises([...exercises, { name: exerciseName, sets: [] }])
    setExerciseName('')
  }

  function addSet(exerciseIndex: number) {
    const updated = [...exercises]
    updated[exerciseIndex].sets.push({ reps: '', weight: '' })
    setExercises(updated)
  }

  function updateSet(exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: string) {
    const updated = [...exercises]
    updated[exerciseIndex].sets[setIndex][field] = value
    setExercises(updated)
  }

  async function finishWorkout() {
    if (!workoutType) {
      alert('Please select a workout type')
      return
    }
    if (exercises.length === 0) {
      alert('Add at least one exercise')
      return
    }

    setSaving(true)
    try {
      await workoutsService.create({
        type: workoutType,
        exercises: exercises.map(ex => ({
          name: ex.name,
          sets: ex.sets
            .filter(s => s.reps && s.weight)
            .map(s => ({
              reps: parseInt(s.reps),
              weight: parseFloat(s.weight),
            })),
        })),
      })
      navigate('/history')
    } catch (err) {
      console.error(err)
      alert('Failed to save workout')
      setSaving(false)
    }
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-white mb-4">Log Workout</h1>

      <div className="flex gap-2 mb-6">
        {['Push', 'Pull', 'Legs'].map(type => (
          <button
            key={type}
            onClick={() => setWorkoutType(type)}
            className={`flex-1 py-2 rounded-xl font-semibold text-sm ${
              workoutType === type
                ? 'bg-blue-500 text-white'
                : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Exercise name (e.g. Bench Press)"
          value={exerciseName}
          onChange={e => setExerciseName(e.target.value)}
          className="flex-1 bg-zinc-800 text-white rounded-xl px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={addExercise}
          className="bg-blue-500 text-white px-4 rounded-xl font-bold"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {exercises.map((exercise, eIndex) => (
          <div key={eIndex} className="bg-zinc-800 rounded-2xl p-4">
            <p className="text-white font-semibold mb-3">{exercise.name}</p>

            <div className="flex gap-2 mb-2 px-1">
              <p className="text-zinc-500 text-xs w-8">SET</p>
              <p className="text-zinc-500 text-xs flex-1">REPS</p>
              <p className="text-zinc-500 text-xs flex-1">WEIGHT (kg)</p>
            </div>

            {exercise.sets.map((set, sIndex) => (
              <div key={sIndex} className="flex gap-2 mb-2 items-center">
                <p className="text-zinc-500 text-sm w-8">{sIndex + 1}</p>
                <input
                  type="number"
                  placeholder="0"
                  value={set.reps}
                  onChange={e => updateSet(eIndex, sIndex, 'reps', e.target.value)}
                  className="flex-1 bg-zinc-700 text-white rounded-lg px-3 py-2 text-sm outline-none"
                />
                <input
                  type="number"
                  placeholder="0"
                  value={set.weight}
                  onChange={e => updateSet(eIndex, sIndex, 'weight', e.target.value)}
                  className="flex-1 bg-zinc-700 text-white rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>
            ))}

            <button
              onClick={() => addSet(eIndex)}
              className="mt-2 text-blue-400 text-sm font-semibold"
            >
              + Add Set
            </button>
          </div>
        ))}
      </div>

      {exercises.length > 0 && (
        <button
          onClick={finishWorkout}
          disabled={saving}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 disabled:bg-zinc-700 text-white font-semibold py-3 rounded-xl"
        >
          {saving ? 'Saving...' : 'Finish Workout'}
        </button>
      )}
    </div>
  )
}

export default LogWorkout