import React from 'react';
import { StyleSheet, View } from 'react-native';
import LocationMap from './LocationMap';

export default function App() {
  return (
    <View style={styles.container}>
      <LocationMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
