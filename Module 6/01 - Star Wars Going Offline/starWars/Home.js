// Import UI components and navigation hook
import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import LazyImage from './LazyImage';

export default function Home() {
  // Get navigation instance
  const navigation = useNavigation();

  // Display welcome message and navigation buttons
  return (
    <View style={styles.container}>
      <LazyImage
        source={require('./assets/Star_Wars_Logo.png')}
        style={{ width: '100%', height: 100, marginBottom: 10 }}
        resizeMode='contain'
      />
      <Text style={styles.title}>Welcome to the Star Wars App</Text>

      <View style={styles.button}>
        <Button
          title='Search'
          onPress={() => navigation.navigate('Search')}
        />
      </View>

      <View style={styles.button}>
        <Button
          title='Go to Planets'
          onPress={() => navigation.navigate('Planets')}
        />
      </View>

      <View style={styles.button}>
        <Button
          title='Go to Spaceships'
          onPress={() => navigation.navigate('Spaceships')}
        />
      </View>

      <View style={styles.button}>
        <Button
          title='Go to Films'
          onPress={() => navigation.navigate('Films')}
        />
      </View>
    </View>
  );
}
