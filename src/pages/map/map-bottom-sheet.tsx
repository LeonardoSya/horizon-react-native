import React, { useMemo, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import BottomSheet, { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet'
import { Text, Button } from '@rneui/themed'
import useLocation from '@/hooks/useLocation'
import { useAppSelector } from '@/hooks/redux-hooks'
import { selectLocation } from '@/features/location-slice'

const MapBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['28%', '65%'], [])
  const { startTime, avgPace, energy, isActive, location, length, totalTime, altitude } =
    useAppSelector(selectLocation)
  const { handleStart, handlePause, formatTime } = useLocation()

  const distanceMsg = (length / 1000).toFixed(3)
  const locationMsg = location ? JSON.stringify(location.coords) : 'Waiting...'
  const timeMsg = startTime ? new Date(startTime) : new Date()
  const altitudeMsg = altitude.toFixed(1)

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      detached={false}
      enableDynamicSizing={true}
      handleIndicatorStyle={{ backgroundColor: '#d9d9d9' }}
      style={{ borderRadius: 28, shadowOpacity: 0.2 }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.showKm}>
          <Text h2>{distanceMsg}</Text>
          <Text style={{ marginTop: 17 }}>km</Text>
        </View>
        <Text style={styles.date}>
          {timeMsg.toLocaleString('en-CN', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Text>
        <View style={styles.cells}>
          <View>
            <Text h4>{formatTime(totalTime)}</Text>
            <Text style={styles.cellDiscription}>Duration</Text>
          </View>
          <View>
            <Text h4>{avgPace}</Text>
            <Text style={styles.cellDiscription}>Avg Pace</Text>
          </View>
          <View>
            <Text h4>{energy}</Text>
            <Text style={styles.cellDiscription}>Calories</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <Button
            title={isActive ? 'Pause' : 'Start'}
            onPress={isActive ? handlePause : handleStart}
          />
        </View>
        <Text>{locationMsg}</Text>
        <View style={styles.cells}>
          <View>
            <Text h4>1</Text>
            <Text style={styles.cellDiscription}>Species</Text>
          </View>
          <View>
            <Text h4>
              {altitudeMsg}
              <Text> m</Text>
            </Text>
            <Text style={styles.cellDiscription}>Altitude</Text>
          </View>
          <View>
            <Text h4>
              28<Text>℃</Text>
            </Text>
            <Text style={styles.cellDiscription}>Temper</Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    paddingTop: 5,
  },
  showKm: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
  date: {
    paddingLeft: 15,
    marginBottom: 10,
  },
  cells: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  cellDiscription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8c8c8c',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MapBottomSheet
