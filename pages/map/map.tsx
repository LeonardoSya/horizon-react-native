import { View, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import useMap from '@/hooks/useMap'

const Map = () => {
    const { region, markers, onRegionChange, handleAddMarker, handleRemoveMarker } = useMap();

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={onRegionChange}
                onLongPress={handleAddMarker}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.description}
                        onCalloutPress={() => handleRemoveMarker(marker.id)}
                    />
                ))}
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
