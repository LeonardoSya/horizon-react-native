import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import * as Location from 'expo-location'
import haversine from 'haversine'
import {
  selectLocation,
  setStartLocation,
  setLocation,
  toggleIsActive,
  setStartTime,
  setLength,
  setTotalTime,
  setAvgPace,
  setEnergy,
  incrementLength,
  setRegion,
  setTraces,
  clearTraces,
  setAltitude,
} from '@/features/location-slice'
import { Trace, saveSession } from '@/features/session-slice'

const useLocation = () => {
  const intervalRef = useRef<number | null>(null)
  const secondRef = useRef<number>(0)
  const watcherRef = useRef<Location.LocationSubscription | null>(null)
  const lastLocationRef = useRef<{ latitude: number; longitude: number }>(null)

  const dispatch = useAppDispatch()
  const { isActive, startTime, length, totalTime, avgPace, energy, traces } =
    useAppSelector(selectLocation)

  const handleStart = () => {
    dispatch(toggleIsActive())
    if (!isActive) {
      dispatch(setStartTime(Date.now()))
      dispatch(setLength(0))
      dispatch(setTotalTime(0))
      dispatch(setAvgPace('--'))
      dispatch(setEnergy(0))
      dispatch(clearTraces())
      dispatch(setAltitude(0))
      dispatch(setStartLocation({ latitude: 0, longitude: 0 }))
    }
  }

  const handlePause = () => dispatch(toggleIsActive())

  // 计时器
  // 设置secondsRef用于追踪当前秒数而不用放入useEffect依赖数组中，因此计时器的设置和清除只依赖于isActive，避免重复渲染
  const incrementSeconds = () => {
    secondRef.current += 1
    dispatch(setTotalTime(secondRef.current))
  }
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(incrementSeconds, 1000)
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
      secondRef.current = 0
    }
  }, [isActive])
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  // 位置追踪和距离计算
  useEffect(() => {
    const getInitialLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }
      const currentLocation = await Location.getCurrentPositionAsync({})
      const { longitude, latitude } = currentLocation.coords
      dispatch(setLocation(currentLocation))
      dispatch(setStartLocation({ longitude, latitude }))
      dispatch(
        setRegion({
          longitude: longitude,
          latitude: latitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.006,
        }),
      )
      dispatch(setTraces([currentLocation.coords.longitude, currentLocation.coords.latitude]))
    }
    getInitialLocation()

    const startTracking = async () => {
      // 开始监听位置变化
      watcherRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        newLocation => {
          const { longitude, latitude, altitude } = newLocation.coords
          dispatch(setLocation(newLocation))
          dispatch(setAltitude(altitude as number))

          if (lastLocationRef.current) {
            const dist = haversine(
              lastLocationRef.current,
              { longitude, latitude },
              { unit: 'meter' },
            )
            // 基于当前值更新length时，派发incrementLength action而不是setLength
            dispatch(incrementLength(dist))
            dispatch(setTraces([longitude, latitude]))
          }
          // @ts-ignore
          lastLocationRef.current = { longitude, latitude }
        },
      )
    }
    // @ts-ignore
    isActive ? startTracking() : (lastLocationRef.current = null)

    return () => {
      watcherRef.current?.remove()
    }
  }, [isActive, dispatch])

  // 计算平均速度
  useEffect(() => {
    if (length > 0 && startTime) {
      const elapsedTime = (Date.now() - startTime) / 60000 // 总时间(分钟)
      const pace = elapsedTime / (length / 1000) // 平均配速(每公里分钟)
      const minutes = Math.floor(pace)
      const seconds = Math.round((pace - minutes) * 60)
      dispatch(setAvgPace(`${minutes}'${seconds < 10 ? '0' : ''}${seconds}"`))
    }
  }, [length, startTime])

  // 计算卡路里消耗
  useEffect(() => {
    if (length > 0 && totalTime > 0) dispatch(setEnergy(Math.floor(length * 0.0441)))
  }, [length, totalTime])

  // 保存会话
  useEffect(() => {
    if (!isActive && length !== 0) {
      const sessionData = {
        length,
        start: startTime as number,
        end: Date.now(),
        avgPace,
        energy,
        traces: traces as Trace[],
      }
      dispatch(saveSession(sessionData))
      console.log(sessionData)
    }
  }, [isActive])

  return {
    handleStart,
    handlePause,
    formatTime,
  }
}

export default useLocation
