import { View, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { Region, selectRegion, setRegion } from '@/features/map-slice'

const Map = () => {
    const dispatch = useAppDispatch()
    const region = useAppSelector(selectRegion)

    const onRegionChange = (newRegion: Region) => {
        dispatch(setRegion(newRegion))
    }

    return (
        <View style={styles.container}>
            <MapView
                region={region}
                onRegionChangeComplete={onRegionChange}
                style={styles.map}
            >
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})


export default Map;
