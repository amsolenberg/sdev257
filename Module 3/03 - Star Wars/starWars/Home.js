import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Star Wars App</Text>

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
