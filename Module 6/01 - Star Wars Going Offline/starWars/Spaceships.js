// Import components and styles
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import SwipeableItem from './SwipeableItem';
import LazyImage from './LazyImage';

export default function Spaceships() {
  // State for spaceship data and loading flag
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch spaceship data on mount
  useEffect(() => {
    fetch('https://www.swapi.tech/api/starships')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setSpaceships(data.results);
      })
      .catch((error) => console.error('Error fetching spaceships: ', error))
      .finally(() => setLoading(false));
  }, []);

  // Display spinner while loading
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
