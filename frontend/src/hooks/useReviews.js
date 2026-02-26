import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export const useReviews = (productId) => {
  const queryClient = useQueryClient();

  const useGetProductReviews = () => {
    return useQuery({
      queryKey: ['reviews', productId],
      queryFn: async () => {
        const { data } = await api.get(`/products/${productId}/reviews`);
        return data;
      },
      enabled: !!productId,
    });
  };

  const addReview = useMutation({
    mutationFn: async ({ rating, comment }) => {
      const { data } = await api.post(`/products/${productId}/reviews`, { rating, comment });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', productId]);
      queryClient.invalidateQueries(['product', productId]); // Invalidate to update average rating
      toast.success('Thank you for your review!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Error submitting review');
    },
  });

  return {
    useGetProductReviews,
    addReview,
  };
};
