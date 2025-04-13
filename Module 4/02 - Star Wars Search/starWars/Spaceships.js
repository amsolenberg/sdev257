// Import components and styles
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import styles from './styles';

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
      <FlatList
        data={spaceships}
        keyExtractor={(item) => item.uid.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
