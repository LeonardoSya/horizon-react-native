import React, { useRef } from 'react'
import { StyleSheet, Image } from 'react-native'
import MapView, { MapType, Marker, Polyline } from 'react-native-maps'
import { useAppSelector } from '@/hooks/redux-hooks'
import { selectLocation } from '@/features/location-slice'

interface MyMapViewProps {
  mapType: MapType;
}

const MyMapView: React.FC<MyMapViewProps> = ({ mapType }) => {
  const mapRef = useRef<MapView>(null)
  const { traces, region, startLocation } = useAppSelector(selectLocation)

  return (
    region && (
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        // followsUserLocation={true}
        mapType={mapType}
      >
        <Marker coordinate={startLocation} pinColor='#237804' />
        <Marker coordinate={{ latitude: 40.41025, longitude: 115.8477 }}>
          <Image
            source={require('../../../assets/images/野鸭湖手绘图.png')}
            style={styles.chartingMap}
          />
        </Marker>
        <Polyline
          coordinates={traces.map(trace => ({
            latitude: trace[1],
            longitude: trace[0],
          }))}
          strokeColor='#000'
          strokeWidth={10}
        />
      </MapView>
    )
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  chartingMap: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
})

export default MyMapView
