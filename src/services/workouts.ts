import api from './api'

export type SetData = {
  reps: number
  weight: number
}

export type ExerciseData = {
  name: string
  sets: SetData[]
}

export type Workout = {
  id: number
  type: string
  date: string
  exercises: {
    id: number
    name: string
    sets: {
      id: number
      reps: number
      weight: number
    }[]
  }[]
}

export type WorkoutCreate = {
  type: string
  exercises: ExerciseData[]
}

export const workoutsService = {
  getAll: async (): Promise<Workout[]> => {
    const response = await api.get('/workouts/')
    return response.data
  },

  create: async (workout: WorkoutCreate): Promise<Workout> => {
    const response = await api.post('/workouts/', workout)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/workouts/${id}`)
  },
}