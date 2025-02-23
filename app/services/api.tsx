import axios from 'axios';
import { Item } from '@/app/types';

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID UECcpl-XyiZ4sEpghjVMY8UXfOsIgefoCUhI6ZPR6j4',
  },
});

type UnsplashResponse = {
  results: {
    id: string;
    description: string | null;
    urls: {
      small: string;
    };
  }[];
};

export const fetchItems = async (queries: string[] = ['nature', 'city', 'sea']): Promise<Item[]> => {
  try {
    const results = await Promise.all(
      queries.map((query) =>
        api.get<UnsplashResponse>(`/search/photos?query=${query}&per_page=30`)
      )
    );

    const items = results.flatMap((response) =>
      response.data.results.map((photo) => ({
        id: photo.urls.small,
        description: photo.description || 'Sem descrição',
        urls: {
          small: photo.urls.small,
        },
        category: queries.length === 1 ? queries[0] : 'all',
      }))
    );

    return items;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return [];
  }
};

export default api;