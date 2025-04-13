import React from 'react';
import { StyleSheet, View } from 'react-native';
import LocationMap from './LocationMap'; //Import the custom LocationMap component

export default function App() {
  return (
    // Root view container with full screen flex styling
    <View style={styles.container}>
      <LocationMap />
    </View>
  );
}

// Basic full-screen container style
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
