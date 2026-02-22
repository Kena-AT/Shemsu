import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/products/categories'); // I'll need to add this simple endpoint
      return data;
    },
  });
};
