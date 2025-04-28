import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

let currentlyOpenSwipeable = null;

export default function SwipeableItem({ label, itemData, isPlanet }) {
  const navigation = useNavigation();
  const swipeableRef = useRef(null);

  const handleSwipe = async () => {
    if (isPlanet && itemData) {
      try {
        const response = await fetch(itemData.url);
        const data = await response.json();
        const fullPlanetData = data.result?.properties || {};

        if (Object.keys(fullPlanetData).length > 0) {
          navigation.navigate('PlanetDetail', { uid: itemData.uid });
        } else {
          console.error('Planet details missing.');
        }
      } catch (error) {
        console.error('Error fetching planet details:', error);
      }
    }
  };

  const handleSwipeableWillOpen = () => {
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeableRef.current) {
      currentlyOpenSwipeable.close();
    }
    currentlyOpenSwipeable = swipeableRef.current;
  };

  const renderRightActions = () => <View style={styles.rightBackground} />;

  return (
    <Swipeable
      ref={swipeableRef}
      onSwipeableOpen={isPlanet ? handleSwipe : undefined}
      onSwipeableWillOpen={isPlanet ? handleSwipeableWillOpen : undefined}
      renderRightActions={isPlanet ? renderRightActions : undefined}
      friction={2}
      rightThreshold={40}
      overshootRight={false}
    >
      <View style={styles.foreground}>
        <Text style={styles.itemText}>{label}</Text>
      </View>
    </Swipeable>
  );
}

export function closeCurrentlyOpenSwipeable() {
  if (currentlyOpenSwipeable) {
    currentlyOpenSwipeable.close();
    currentlyOpenSwipeable = null;
  }
}

const styles = StyleSheet.create({
  foreground: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center'
  },
  rightBackground: {
    backgroundColor: '#4CAF50',
    flex: 1,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20
  },
  itemText: {
    fontSize: 18,
    color: '#333'
  }
});
