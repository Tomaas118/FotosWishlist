export type Item = {
  id: string;
  description: string;
  urls: {
    small: string;
  };
  isFavorite?: boolean;
  category?: string; 
};