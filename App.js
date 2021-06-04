import React, { useEffect, useState } from 'react'
import  Mapview, { Marker }  from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
export default function App() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [coordinateCurrent, setCoordinateCurrent] = useState(null);
  const [secondCoordinate, setSecondCoordinate] = useState(null);

    const getOneTimeLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
          setCoordinateCurrent({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.log(`error`, error);
          setTimeout(() => {
            getOneTimeLocation();
          }, 2000);
        },
        {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
      );
    };
      useEffect(() => {
        getOneTimeLocation();
      }, [])
  return (
      <Mapview
      onPress={(coordinate) => {
        setSecondCoordinate(coordinate.nativeEvent.coordinate);
      }}
      onRegionChangeComplete={(coordinate) => {
        setRegion(coordinate);
        console.log(`coordinate`, coordinate)
      }}
        style={{height: '100%', width: '100%'}}
        region={region}>
         {coordinateCurrent && <Marker coordinate={coordinateCurrent}/>}
         {secondCoordinate && <Marker coordinate={secondCoordinate}/>}
      </Mapview>
  )
}
