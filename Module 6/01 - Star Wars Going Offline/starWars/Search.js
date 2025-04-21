// Import required components and styles
import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button } from 'react-native';
import styles from './styles';
import LazyImage from './LazyImage';

export default function Search() {
  // State for search input and modal visibility
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Show modal when input is submitted
  const handleSearchSubmit = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <LazyImage
        source={require('./assets/Star_Wars_Logo.png')}
        style={{ width: '100%', height: 100, marginBottom: 10 }}
        resizeMode='contain'
      />
      <Text style={styles.title}>Search Star Wars Data</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Enter search text'
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType='search'
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>You searched for:</Text>
            <Text style={styles.modalText}>{searchText}</Text>
            <Button
              title='Close'
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
