import { View } from 'react-native'
import { MapMarkerProps, MapPolylineProps, MapViewProps } from 'react-native-maps'

const MyMapView = (props: MapViewProps) => <View />
const Marker = (props: MapMarkerProps) => <View />
const Polyline = (props: MapPolylineProps) => <View />
const PROVIDER_GOOGLE = 'google'

export default MyMapView
export { Marker, Polyline, PROVIDER_GOOGLE }
