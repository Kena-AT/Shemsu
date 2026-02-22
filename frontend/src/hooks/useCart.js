import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export const useCart = () => {
  const queryClient = useQueryClient();

  // Fetch Cart
  const useGetCart = () => useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await api.get('/cart');
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Add to Cart
  const useAddToCart = () => useMutation({
    mutationFn: async ({ productId, quantity, attributes }) => {
      const { data } = await api.post('/cart/add', { productId, quantity, attributes });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Added to cart!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  });

  // Update Item
  const useUpdateItem = () => useMutation({
    mutationFn: async ({ id, quantity }) => {
      const { data } = await api.put(`/cart/item/${id}`, { quantity });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  });

  // Remove Item
  const useRemoveItem = () => useMutation({
    mutationFn: async (id) => {
      await api.delete(`/cart/item/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Removed from cart');
    }
  });

  // Clear Cart
  const useClearCart = () => useMutation({
    mutationFn: async () => {
      await api.delete('/cart/clear');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  return {
    useGetCart,
    useAddToCart,
    useUpdateItem,
    useRemoveItem,
    useClearCart
  };
};
