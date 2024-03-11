import { Marker } from 'react-native-maps';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export interface Region {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
}

export interface Coordinate {
    latitude: number;
    longitude: number;
}

export interface Marker {
    id: string
    latitude: number
    longitude: number
    title?: string
    description?: string
}

export interface MapState {
    region: Region
    markers: Marker[]
    isTracking: boolean
    trackCoordinates: Coordinate[]
}

export interface MapEvent {
    nativeEvent: {
        coordinate: {
            latitude: number;
            longitude: number;
        };
        position: {
            x: number;
            y: number;
        };
    }
}


export const initialState: MapState = {
    region: {
        latitude: 40.0027,
        longitude: 116.3539,
        latitudeDelta: 0.00522,
        longitudeDelta: 0.00221,
    },
    markers: [],
    isTracking: false,
    trackCoordinates: [],
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMarkers: (state, action: PayloadAction<Marker[]>) => {
            state.markers = action.payload
        },
        addMarker: (state, action: PayloadAction<Marker>) => {
            state.markers.push(action.payload)
        },
        removeMarker: (state, action: PayloadAction<string>) => {
            state.markers = state.markers.filter(marker => marker.id !== action.payload)  // 从markers[]中移除具有指定id的marker
        },

        startTracking: (state) => {
            state.isTracking = true
        },
        stopTracking: (state) => {
            state.isTracking = false
        },
        updateTrackCoordinates: (state, action: PayloadAction<Coordinate>) => {
            state.isTracking && state.trackCoordinates.push(action.payload)
        }
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

export default mapSlice.reducer