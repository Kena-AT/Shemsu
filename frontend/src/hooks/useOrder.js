import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export const useOrder = () => {
  // Create Order Mutation
  const useCheckout = () => useMutation({
    mutationFn: async (orderData) => {
      const { data } = await api.post('/orders/checkout', orderData);
      return data;
    },
    onSuccess: (data) => {
      // Success is handled by redirecting to data.checkoutUrl in the component
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Checkout failed. Please try again.');
    }
  });

  // Get Buyer Orders
  const useGetBuyerOrders = () => useQuery({
    queryKey: ['orders', 'buyer'],
    queryFn: async () => {
      const { data } = await api.get('/orders/buyer');
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Get Seller Orders
  const useGetSellerOrders = () => useQuery({
    queryKey: ['orders', 'seller'],
    queryFn: async () => {
      const { data } = await api.get('/orders/seller');
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Update Item Status Mutation
  const useUpdateItemStatus = () => useMutation({
    mutationFn: async ({ itemId, status }) => {
      const { data } = await api.patch(`/orders/item/${itemId}/status`, { status });
      return data;
    },
    onSuccess: () => {
      toast.success('Order status updated');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  });

  // Get Seller Analytics
  const useGetSellerAnalytics = () => useQuery({
    queryKey: ['seller-analytics'],
    queryFn: async () => {
      const { data } = await api.get('/seller/analytics');
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Verify Order Status (Manual Fallback)
  const useVerifyOrder = (txRef) => useQuery({
    queryKey: ['orders', 'verify', txRef],
    queryFn: async () => {
      const { data } = await api.get(`/orders/verify/${txRef}`);
      return data;
    },
    enabled: !!txRef,
    retry: 1, // Minimize retries for sensitive payment checks
  });

  return {
    useCheckout,
    useGetBuyerOrders,
    useGetSellerAnalytics,
    useGetSellerOrders,
    useVerifyOrder,
    useUpdateItemStatus
  };
};
