import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, Button, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function SwipeableItem({ label }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.x >= 150) {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.swipeContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.itemText}>{label}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ width: 200 }} />
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType='slide'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>You selected:</Text>
            <Text style={styles.modalText}>{label}</Text>
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
