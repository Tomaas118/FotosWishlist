import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { Item } from '@/app/types';

type ListItemProps = {
  item: Item | undefined;
  onFavorite: (id: string) => void;
  textColor?: string;
};

const ListItemFavorites: React.FC<ListItemProps> = ({ item, onFavorite, textColor = 'black' }) => {
  const [modalVisible, setModalVisible] = useState(false);

  if (!item) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flex: 1 }}>
          <View style={styles.itemContent}>
            <Image source={{ uri: item.urls.small }} style={styles.image} />
            <Text style={[styles.title, { color: textColor }]}>{item.description}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onFavorite(item.id)}>
          <Text style={styles.removeButton}>❌</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: item.urls.small }} style={styles.modalImage} />
            <Text style={styles.modalDescription}>{item.description || 'No description'}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
  },
  removeButton: {
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#0047AB',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListItemFavorites;