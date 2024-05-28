import React, { useMemo, useRef } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import BottomSheet, { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet'
import { Text } from '@rneui/themed'
import useLocation from '@/hooks/useLocation'
import { useAppSelector } from '@/hooks/redux-hooks'
import { selectLocation } from '@/features/location-slice'
import AnimatedPressable from '@/components/animated-pressable'

const MapBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['32%', '65%'], [])
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
      backgroundStyle={{ backgroundColor: '#fafafa' }}
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
        {/* <Text>{locationMsg}</Text> */}
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
        <AnimatedPressable
          style={styles.buttonView}
          onPress={isActive ? handlePause : handleStart}
          size={0.95}
        >
          <Text style={{ color: '#fafafa', fontSize: 18, letterSpacing: 1, fontWeight: '600' }}>
            {isActive ? 'Pause' : 'Start'}
          </Text>
        </AnimatedPressable>
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
    backgroundColor: '#fafafa',
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
    alignSelf: 'center',
    width: 100,
    height: 45,
    margin: 10,
    backgroundColor: '#315c59',
    borderRadius: 12,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
})

export default MapBottomSheet
