import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { UserLocationChangeEvent } from 'react-native-maps'
import {
    MapEvent,
    addMarker,
    removeMarker,
    startTracking,
    stopTracking,
    selectRegion,
    selectMarkers,
    selectIsTracking,
    selectTrackCoordinates,
    updateTrackCoordinates,
} from '@/features/map-slice'

const useMap = () => {
    const dispatch = useAppDispatch()
    const markers = useAppSelector(selectMarkers)
    const region = useAppSelector(selectRegion)
    const isTracking = useAppSelector(selectIsTracking)
    const trackCoordinates = useAppSelector(selectTrackCoordinates)

    const handleAddMarker = useCallback((e: MapEvent) => {
        const newMarker = {
            id: Date.now().toString(),
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            title: 'New Marker',
            description: 'Added by User',
        }
        dispatch(addMarker(newMarker))
    }, [dispatch])

    const handleRemoveMarker = (markerId: string) => {
        dispatch(removeMarker(markerId))
    }

    const handleStartTracking = () => {
        dispatch(startTracking())
    }

    const handleStopTracking = () => {
        dispatch(stopTracking())
    }

    const handleUpdateTrackCoordinates = (e: UserLocationChangeEvent) => {
        const newCoordinate = {
            latitude: e.nativeEvent.coordinate!.latitude,
            longitude: e.nativeEvent.coordinate!.longitude,
        }
        console.log(`User's current location: [${newCoordinate.latitude}, ${newCoordinate.longitude}]`)
        dispatch(updateTrackCoordinates(newCoordinate))
    }

    return {
        region,
        markers,
        isTracking,
        trackCoordinates,
        handleAddMarker,
        handleRemoveMarker,
        handleStartTracking,
        handleStopTracking,
        handleUpdateTrackCoordinates,
    }
}


export default useMap