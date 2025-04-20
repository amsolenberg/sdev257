// Import necessary modules and styles
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';

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
      <FlatList
        data={films}
        keyExtractor={(item) => item.uid.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.properties.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
