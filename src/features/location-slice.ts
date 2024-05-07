import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import type { LocationObject } from 'expo-location'
import type { Region } from 'react-native-maps'

export type Trace = [number, number]

export interface LocationState {
  isActive: boolean
  startTime: number | null
  length: number
  avgPace: string
  energy: number
  totalTime: number
  altitude: number
  location: LocationObject | null
  region: Region | null
  traces: Trace[]
  startLocation: { latitude: number; longitude: number }
}

const initialState: LocationState = {
  isActive: false,
  startTime: null,
  length: 0,
  avgPace: '--',
  energy: 0,
  totalTime: 0,
  altitude: 0,
  location: null,
  region: null,
  traces: [],
  startLocation: { latitude: 0, longitude: 0 },
}

export const incrementLength = createAction<number>('location/incrementLength')

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    toggleIsActive: state => {
      state.isActive = !state.isActive
    },
    setStartTime: (state, action: PayloadAction<number | null>) => {
      state.startTime = action.payload
    },
    setLength: (state, action: PayloadAction<number>) => {
      state.length = action.payload
    },
    setAvgPace: (state, action: PayloadAction<string>) => {
      state.avgPace = action.payload
    },
    setEnergy: (state, action: PayloadAction<number>) => {
      state.energy = action.payload
    },
    setTotalTime: (state, action: PayloadAction<number>) => {
      state.totalTime = action.payload
    },
    setAltitude: (state, action: PayloadAction<number>) => {
      state.altitude = action.payload
    },
    setLocation: (state, action: PayloadAction<LocationObject | null>) => {
      state.location = action.payload
    },
    setStartLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.startLocation = action.payload
    },
    setRegion: (state, action: PayloadAction<Region | null>) => {
      state.region = action.payload
    },
    setTraces: (state, action: PayloadAction<Trace>) => {
      const newTrace = action.payload
      const lastTrace = state.traces[state.traces.length - 1]
      if (!lastTrace || lastTrace[0] !== newTrace[0] || lastTrace[1] !== newTrace[1]) {
        state.traces.push(newTrace)
      }
      // 如果newTrace和lastTrace相同则不修改state
      return state
    },
    clearTraces: state => {
      state.traces = []
    },
  },
  extraReducers: builder => {
    builder.addCase(incrementLength, (state, action) => {
      state.length += action.payload
    })
  },
})

export const {
  toggleIsActive,
  setStartTime,
  setLength,
  setAvgPace,
  setEnergy,
  setTotalTime,
  setLocation,
  setRegion,
  setTraces,
  clearTraces,
  setAltitude,
  setStartLocation,
} = locationSlice.actions

export const selectLocation = (state: RootState) => state.location

export default locationSlice.reducer
