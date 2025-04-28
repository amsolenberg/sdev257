import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import SwipeableItem, { closeCurrentlyOpenSwipeable } from './SwipeableItem';
import LazyImage from './LazyImage';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(true);

  // Close open swipeables when leaving the screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        closeCurrentlyOpenSwipeable();
      };
    }, [])
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected && state.isInternetReachable !== false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!connected) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch('https://www.swapi.tech/api/planets')
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results || []);
      })
      .catch((error) => console.error('Error fetching planets:', error))
      .finally(() => setLoading(false));
  }, [connected]);

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

  return (
    <View style={styles.container}>
      <LazyImage
        source={require('./assets/Star_Wars_Logo.png')}
        style={{ width: '100%', height: 100, marginBottom: 10 }}
        resizeMode='contain'
      />

      {!connected && (
        <View style={{ padding: 10, backgroundColor: '#ffe0e0', borderRadius: 6, marginBottom: 10 }}>
          <Text style={{ color: '#990000', textAlign: 'center' }}>
            No internet connection. Data may be outdated or unavailable.
          </Text>
        </View>
      )}

      <ScrollView>
        {planets.map((item) => (
          <SwipeableItem
            key={item.uid}
            label={item.name}
            itemData={item}
            isPlanet={true}
          />
        ))}
      </ScrollView>
    </View>
  );
}
