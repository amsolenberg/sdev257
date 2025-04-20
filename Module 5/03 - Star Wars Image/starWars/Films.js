// Import necessary modules and styles
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import SwipeableItem from './SwipeableItem';
import LazyImage from './LazyImage';

export default function Films() {
  // Define state for films data and loading status
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch film data from API on component mount
  useEffect(() => {
    fetch('https://www.swapi.tech/api/films')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // Update state with results from API
        setFilms(data.result);
      })
      .catch((error) => console.error('Error fetching films: ', error))
      .finally(() => setLoading(false)); // End loading state
  }, []);

  // Show loading indicator while data is being fetched
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

  // Render list of film titles
  return (
    <View style={styles.container}>
      <LazyImage
        source={require('./assets/Star_Wars_Logo.png')}
        style={{ width: '100%', height: 100, marginBottom: 10 }}
        resizeMode='contain'
      />
      <ScrollView>
        {films.map((item) => (
          <SwipeableItem
            key={item.uid}
            label={item.properties?.title}
          />
        ))}
      </ScrollView>
    </View>
  );
}
