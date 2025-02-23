import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { auth } from '../firebaseConfig';

import { fetchItems } from '@/app/services/api';
import { Item } from '@/app/types';
import Header from '@/components/Header';
import ListItemFavorites from '@/components/ListItemFavorites';

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Item[]>([]);
  const user = auth.currentUser;

  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        try {
          if (user) {
            const favorites = await AsyncStorage.getItem(`favorites_${user.uid}`);
            const favoriteIds: string[] = favorites ? JSON.parse(favorites) : [];

            const items = await fetchItems(['nature', 'city', 'sea']);

            const favoriteItems = items.filter((item) =>
              favoriteIds.includes(item.id)
            );

            setFavorites(favoriteItems);
          }
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error);
        }
      };
      loadFavorites();
    }, [user])
  );

  const handleRemoveFavorite = async (id: string) => {
    if (!user) return;

    const favorites = await AsyncStorage.getItem(`favorites_${user.uid}`);
    const favoriteIds: string[] = favorites ? JSON.parse(favorites) : [];
    const updatedFavoriteIds = favoriteIds.filter((favId) => favId !== id);
    await AsyncStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updatedFavoriteIds));

    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItemFavorites
            item={item}
            onFavorite={handleRemoveFavorite}
            textColor="black"
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default FavoritesScreen;