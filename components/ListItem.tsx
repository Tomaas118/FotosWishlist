import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Item } from '@/app/types';

type ListItemProps = {
  item: Item | undefined;
  onFavorite: (id: string) => void;
  textColor?: string;
};

const ListItem: React.FC<ListItemProps> = ({ item, onFavorite, textColor = 'black' }) => {
  if (!item) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.urls.small }} style={styles.image} />
      <Text style={[styles.title, { color: textColor }]}>{item.description}</Text>
      <TouchableOpacity onPress={() => onFavorite(item.id)}>
        <Text style={styles.favorite}>
          {item.isFavorite ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
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
  favorite: {
    fontSize: 24,
  },
});

export default ListItem;