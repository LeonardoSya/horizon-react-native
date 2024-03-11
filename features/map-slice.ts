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
        latitude: 116.41667,
        longitude: 39.91667,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    markers: [],
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setRegion: (state, action: PayloadAction<Region>) => {
            state.region = action.payload
        },
        setMarkers: (state, action: PayloadAction<Marker[]>) => {
            state.markers = action.payload
        },
        addMarker: (state, action: PayloadAction<Marker>) => {
            state.markers.push(action.payload)
        },
        removeMarker: (state, action: PayloadAction<string>) => {
            state.markers = state.markers.filter(marker => marker.id !== action.payload)  // 从markers[]中移除具有指定id的marker
        },
    }
})

export const { setRegion, setMarkers, addMarker, removeMarker } = mapSlice.actions

export const selectRegion = (state: RootState) => state.map.region
export const selectMarkers = (state: RootState) => state.map.markers

export default mapSlice.reducer