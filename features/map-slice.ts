import { Marker, Region } from 'react-native-maps'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export const initialState: MapState = {
    region: {
        latitude: 40.0027,
        longitude: 116.3479,
        latitudeDelta: 0.00522,
        longitudeDelta: 0.00221,
    },
    markers: [],
    isTracking: false,
    trackCoordinates: [],
    trackData: [],
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMarkers: (state, action: PayloadAction<Marker[]>) => {
            state.markers = action.payload
        },
        addMarker: (state, action: PayloadAction<Marker>) => {
            state.markers!.push(action.payload)
        },
        removeMarker: (state, action: PayloadAction<string>) => {
            state.markers = state.markers!.filter(marker => marker.id !== action.payload) 
        },

        startTracking: (state) => {
            state.isTracking = true
            state.trackCoordinates = []
        },
        stopTracking: (state,action: PayloadAction<TrackItem>) => {
            state.isTracking = false
            state.trackData?.push(action.payload)
        },
        updateTrackCoordinates: (state, action: PayloadAction<Coordinate>) => {
            state.isTracking && state.trackCoordinates.push(action.payload)
        },
    }
})

export const {
    setMarkers,
    addMarker,
    removeMarker,
    startTracking,
    stopTracking,
    updateTrackCoordinates,
} = mapSlice.actions

export const selectRegion = (state: RootState) => state.map.region
export const selectMarkers = (state: RootState) => state.map.markers
export const selectIsTracking = (state: RootState) => state.map.isTracking
export const selectTrackCoordinates = (state: RootState) => state.map.trackCoordinates
export const selectTrackData = (state: RootState) => state.map.trackData

export default mapSlice.reducer