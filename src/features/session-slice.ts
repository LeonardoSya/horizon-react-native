import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

//  [longitude, latitude]
export type Trace = [number, number]

export type TraceState = {
  traces: Trace[]
}

export type Session = {
  length: number
  start: number
  end: number
  avgPace: string
  energy: number
  traces: Trace[]
}

const initialState: Session = {
  length: 0,
  start: 0,
  end: 0,
  avgPace: '',
  energy: 0,
  traces: [],
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    saveSession(state, action: PayloadAction<Session>) {
      return action.payload
    },
  },
})

export const { saveSession } = sessionSlice.actions

export const selectSession = (state: RootState) => state.session

export default sessionSlice.reducer
