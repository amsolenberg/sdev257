import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function PlanetDetail({ route }) {
  const { uid } = route.params;
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${uid}`)
      .then((response) => response.json())
      .then((data) => setPlanet(data.result.properties))
      .catch((error) => console.error('Error fetching planet details:', error))
      .finally(() => setLoading(false));
  }, [uid]);

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

  if (!planet) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>Planet not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{planet.name}</Text>

      <View style={{ marginTop: 20 }}>
        <DetailItem
          label='Climate'
          value={planet.climate}
        />
        <DetailItem
          label='Diameter'
          value={planet.diameter}
        />
        <DetailItem
          label='Gravity'
          value={planet.gravity}
        />
        <DetailItem
          label='Orbital Period'
          value={planet.orbital_period}
        />
        <DetailItem
          label='Population'
          value={planet.population}
        />
        <DetailItem
          label='Terrain'
          value={planet.terrain}
        />
        <DetailItem
          label='Rotation Period'
          value={planet.rotation_period}
        />
        <DetailItem
          label='Surface Water'
          value={planet.surface_water}
        />
      </View>
    </ScrollView>
  );
}

function DetailItem({ label, value }) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{label}:</Text>
      <Text style={{ fontSize: 16, color: '#555' }}>{value}</Text>
    </View>
  );
}
