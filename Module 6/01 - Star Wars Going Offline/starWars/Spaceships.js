// Import components and styles
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import SwipeableItem from './SwipeableItem';
import LazyImage from './LazyImage';
import NetInfo from '@react-native-community/netinfo';

export default function Spaceships() {
  // State for spaceship data and loading flag
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(true);

  // Monitor network connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected && state.isInternetReachable !== false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch spaceship data only if connected
  useEffect(() => {
    if (!connected) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch('https://www.swapi.tech/api/starships')
      .then((response) => response.json())
      .then((data) => setSpaceships(data.results))
      .catch((error) => console.error('Error fetching spaceships: ', error))
      .finally(() => setLoading(false));
  }, [connected]);

  // Show spinner while loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size='large'
          color='#0000ff'
        />
      </View>
    );
  }

  // Show list of spaceship names
  return (
    <View style={styles.container}>
      <LazyImage
        source={require('./assets/Star_Wars_Logo.png')}
        style={{ width: '100%', height: 100, marginBottom: 10 }}
        resizeMode='contain'
      />

      {/* Show offline message if not connected */}
      {!connected && (
        <View style={{ padding: 10, backgroundColor: '#ffe0e0', borderRadius: 6, marginBottom: 10 }}>
          <Text style={{ color: '#990000', textAlign: 'center' }}>
            No internet connection. Data may be outdated or unavailable.
          </Text>
        </View>
      )}

      {/* Scrollable list of swipeable planet items */}
      <ScrollView>
        {spaceships.map((item) => (
          <SwipeableItem
            key={item.uid}
            label={item.name}
          />
        ))}
      </ScrollView>
    </View>
  );
}
