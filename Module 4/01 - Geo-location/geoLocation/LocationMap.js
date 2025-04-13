import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function LocationMap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fakeRestaurant = {
    name: 'Galactic Grill',
    description: 'A Star Wars themed diner in downtown Indy',
    latitude: 39.7684,
    longitude: -86.1581
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red', padding: 20 }}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' />
        <Text>Getting your location…</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }}
      showsPointsOfInterest={false}
      showsUserLocation
      followUserLocation
    >
      <Marker
        title={fakeRestaurant.name}
        description={fakeRestaurant.description}
        coordinate={{
          latitude: fakeRestaurant.latitude,
          longitude: fakeRestaurant.longitude
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
