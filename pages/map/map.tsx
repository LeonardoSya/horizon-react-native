import { View, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import useMap from '@/hooks/useMap'
import { Button } from '@rneui/themed'

const Map: React.FC = () => {
    const {
        region,
        markers,
        handleAddMarker,
        handleRemoveMarker,
        isTracking,
        trackCoordinates,
        handleStartTracking,
        handleStopTracking,
        handleUpdateTrackCoordinates,
    } = useMap()

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onLongPress={handleAddMarker}
                onUserLocationChange={isTracking ? handleUpdateTrackCoordinates : undefined}
                showsUserLocation={true}
                showsTraffic={true}
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
                {isTracking && (
                    <Polyline
                        coordinates={trackCoordinates}
                        strokeColor='#000'
                        strokeWidth={4}
                    />
                )}
            </MapView>
            <Button
                title={isTracking ? 'Stop Tracking' : 'Start Tracking'}
                onPress={isTracking ? handleStopTracking : handleStartTracking}
            />
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
