import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button } from 'react-native';
import styles from './styles';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearchSubmit = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
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
