import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export interface Region {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
}
export interface RegionState {
    region: Region
}

export const initialState: RegionState = {
    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setRegion: (state, action: PayloadAction<Region>) => {
            state.region = action.payload
        }
    }
})

export const { setRegion } = mapSlice.actions

export const selectRegion = (state: RootState) => state.map.region

export default mapSlice.reducer