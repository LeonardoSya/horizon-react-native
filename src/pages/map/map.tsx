import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from '@rneui/themed'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { MapType } from 'react-native-maps'
import MapBottomSheet from '@/pages/map/map-bottom-sheet'
import MyMapView from '@/pages/map/map-view'

const Map = () => {
  const [mapType, setMapType] = useState('standard')

  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'hybrid' : 'standard')
  }

  return (
    <View style={styles.mapContainer}>
      <MyMapView mapType={mapType as MapType} />
      <Button
        icon={<Feather name='layers' size={24} color='black' />}
        radius={100}
        buttonStyle={{
          backgroundColor: '#f0f0f0',
          borderRadius: 100,
          paddingHorizontal: 14,
          paddingVertical: 14,
        }}
        containerStyle={{
          position: 'absolute',
          right: '5%',
          top: '13%',
        }}
        onPress={toggleMapType}
      />
      <Button
        icon={<MaterialIcons name='3d-rotation' size={28} color='black' />}
        radius={100}
        buttonStyle={{
          backgroundColor: '#f0f0f0',
          borderRadius: 100,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
        containerStyle={{
          position: 'absolute',
          right: '5%',
          top: '22%',
        }}
        onPress={() => {}}
      />
      <MapBottomSheet />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default Map
