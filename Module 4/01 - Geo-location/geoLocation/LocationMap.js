import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location'; // Expo library for accessing device GPS/location
import MapView, { Marker } from 'react-native-maps'; // Map view and marker from react-native-maps

export default function LocationMap() {
  // State for storing user location
  const [location, setLocation] = useState(null);
  // State for any error messages
  const [errorMsg, setErrorMsg] = useState(null);

  // Hardcoded nearby restaurant location and info
  const fakeRestaurant = {
    name: 'Galactic Grill',
    description: 'A Star Wars themed diner in downtown Indy',
    latitude: 39.7684,
    longitude: -86.1581
  };

  useEffect(() => {
    // Request location permission and fetch current GPS coordinates
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get current position and update state
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  // If permission was denied, show error message
  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red', padding: 20 }}>{errorMsg}</Text>
      </View>
    );
  }

  // If still loading location, show spinner and message
  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' />
        <Text>Getting your location…</Text>
      </View>
    );
  }

  // Once location is available, render the map
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05, // Map zoom level
        longitudeDelta: 0.05
      }}
      showsPointsOfInterest={false} // Hide default POIs
      showsUserLocation // Show blue dot for current user location
      followUserLocation // Auto-follow user as they move
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

// Style definitions
const styles = StyleSheet.create({
  map: {
    flex: 1 // Fill available space
  },
  center: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center' // Center vertically
  }
});
