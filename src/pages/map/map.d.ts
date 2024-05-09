import { Region } from 'react-native-maps'

declare global {
  interface Coordinate {
    latitude: number
    longitude: number
    timestamp: number
  }

  interface Marker {
    id: string
    latitude: number
    longitude: number
    title?: string
    description?: string
  }

  interface MapEvent {
    nativeEvent: {
      coordinate: {
        latitude: number
        longitude: number
      }
      position: {
        x: number
        y: number
      }
    }
  }

  interface TrackItem {
    id: string | number[]
    data: number[][]
  }

  type MapState = {
    markers?: Marker[]
    isTracking: boolean
    currentId?: string | null
    trackCoordinates: Coordinate[]
    trackData?: TrackItem[]
  }
}
