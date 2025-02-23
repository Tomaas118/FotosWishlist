import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebaseConfig';

import { fetchItems } from '@/app/services/api';
import { Item } from '@/app/types';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem';

type HomeScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState<string[]>(['nature', 'city', 'sea']);
  const user = auth.currentUser;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchItems(query);
        if (user) {
          const favorites = await AsyncStorage.getItem(`favorites_${user.uid}`);
          const favoriteIds: string[] = favorites ? JSON.parse(favorites) : [];
          const updatedItems = data.map((item) => ({
            ...item,
            isFavorite: favoriteIds.includes(item.id),
          }));
          setItems(updatedItems);
        } else {
          setItems(data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    loadData();
  }, [query, user]);

  const handleFavorite = async (id: string) => {
    if (!user) return;

    const favorites = await AsyncStorage.getItem(`favorites_${user.uid}`);
    const favoriteIds: string[] = favorites ? JSON.parse(favorites) : [];

    const updatedFavoriteIds = favoriteIds.includes(id)
      ? favoriteIds.filter((favId) => favId !== id)
      : [...favoriteIds, id];

    await AsyncStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updatedFavoriteIds));

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setQuery(['nature'])}>
          <Icon name="nature" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Natureza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setQuery(['city'])}>
          <Icon name="location-city" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Cidade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setQuery(['sea'])}>
          <Icon name="waves" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Mar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setQuery(['nature', 'city', 'sea'])}>
          <Icon name="all-inclusive" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Todas</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem item={item} onFavorite={handleFavorite} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0047AB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default HomeScreen;