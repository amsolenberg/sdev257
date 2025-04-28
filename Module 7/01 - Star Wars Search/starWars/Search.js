import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import LazyImage from './LazyImage';
import SwipeableItem from './SwipeableItem';
import NetInfo from '@react-native-community/netinfo';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(true);

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

    Promise.all([
      fetch('https://www.swapi.tech/api/planets').then((res) => res.json()),
      fetch('https://www.swapi.tech/api/films').then((res) => res.json()),
      fetch('https://www.swapi.tech/api/starships').then((res) => res.json())
    ])
      .then(([planetsData, filmsData, starshipsData]) => {
        // Normalize the fetched data so everything has a "name" field
        const planets = (planetsData.results || []).map((item) => ({
          uid: item.uid,
          name: item.name
        }));

        const films = (filmsData.result || []).map((item) => ({
          uid: item.uid,
          name: item.properties?.title || ''
        }));

        const starships = (starshipsData.results || []).map((item) => ({
          uid: item.uid,
          name: item.name
        }));

        const mergedData = [...planets, ...films, ...starships];

        setData(mergedData);
        setFilteredData(mergedData);
      })
      .catch((error) => console.error('Error fetching search data:', error))
      .finally(() => setLoading(false));
  }, [connected]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredData(data);
    } else {
      const lowercasedText = searchText.toLowerCase();
      const filtered = data.filter((item) => {
        return item.name.toLowerCase().includes(lowercasedText);
      });
      setFilteredData(filtered);
    }
  }, [searchText, data]);

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

      <Text style={styles.title}>Search Star Wars Data</Text>

      <TextInput
        style={styles.textInput}
        placeholder='Enter search text...'
        value={searchText}
        onChangeText={setSearchText}
        returnKeyType='search'
      />

      <ScrollView key={searchText}>
        {filteredData.map((item) => (
          <SwipeableItem
            key={item.uid}
            label={item.name}
          />
        ))}
      </ScrollView>
    </View>
  );
}
