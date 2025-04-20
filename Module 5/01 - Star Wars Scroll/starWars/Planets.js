// Import components and styles
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import SwipeableItem from './SwipeableItem';

export default function Planets() {
  // State for planet data and loading status
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch planets data on component mount
  useEffect(() => {
    fetch('https://www.swapi.tech/api/planets')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setPlanets(data.results);
      })
      .catch((error) => {
        console.error('Error fetching planets: ', error);
      })
      .finally(() => setLoading(false));
  }, []);

  // Show loading spinner while fetching
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

  // Render list of planets
  return (
    <View style={styles.container}>
      <ScrollView>
        {planets.map((item) => (
          <SwipeableItem
            key={item.uid}
            label={item.name}
          />
        ))}
      </ScrollView>
    </View>
  );
}
