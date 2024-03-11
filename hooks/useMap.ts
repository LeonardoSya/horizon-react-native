import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import {
    MapEvent,
    addMarker,
    removeMarker,
    setRegion,
    selectRegion,
    selectMarkers,
    Region,
} from '@/features/map-slice'

const useMap = () => {
    const dispatch = useAppDispatch()
    const markers = useAppSelector(selectMarkers)
    const region = useAppSelector(selectRegion)

    const onRegionChange = (newRegion: Region) => {
        dispatch(setRegion(newRegion))
    }

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

    return {
        onRegionChange,
        handleAddMarker,
        handleRemoveMarker,
        region,
        markers
    }
}


export default useMap