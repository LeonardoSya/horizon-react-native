import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { UserLocationChangeEvent } from 'react-native-maps'
import uuid from 'react-native-uuid'
import {
    MapEvent,
    TrackItem,
    addMarker,
    removeMarker,
    startTracking,
    stopTracking,
    selectRegion,
    selectMarkers,
    selectIsTracking,
    selectTrackCoordinates,
    updateTrackCoordinates,
    selectTrackData,
} from '@/features/map-slice'

const useMap = () => {
    const dispatch = useAppDispatch()
    const markers = useAppSelector(selectMarkers)
    const region = useAppSelector(selectRegion)
    const isTracking = useAppSelector(selectIsTracking)
    const trackCoordinates = useAppSelector(selectTrackCoordinates)
    const trackData = useAppSelector(selectTrackData)

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
        console.log('Start!')
        dispatch(startTracking())
    }

    const handleStopTracking = () => {
        const newTrackItem: TrackItem = {
            id: uuid.v4(),
            data: trackCoordinates.map(coord => [coord.latitude, coord.longitude, coord.timestamp]),
        }
        console.log('Stop!')
        dispatch(stopTracking(newTrackItem))
        console.log(trackData)
    }

    const handleUpdateTrackCoordinates = (e: UserLocationChangeEvent) => {
        const newCoordinate = {
            latitude: e.nativeEvent.coordinate!.latitude,
            longitude: e.nativeEvent.coordinate!.longitude,
            timestamp: new Date().getTime(),
        }
        dispatch(updateTrackCoordinates(newCoordinate))
    }

    return {
        region,
        markers,
        isTracking,
        trackCoordinates,
        trackData,
        handleAddMarker,
        handleRemoveMarker,
        handleStartTracking,
        handleStopTracking,
        handleUpdateTrackCoordinates,
    }
}


export default useMap