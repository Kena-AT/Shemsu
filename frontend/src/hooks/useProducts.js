import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export const useProducts = () => {
  const queryClient = useQueryClient();

  // Get all products (Buyer)
  const useGetProducts = (filters = {}) => {
    return useQuery({
      queryKey: ['products', filters],
      queryFn: async () => {
        const { data } = await api.get('/products', { params: filters });
        return data;
      },
    });
  };

  // Get single product
  const useGetProduct = (id) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: async () => {
        const { data } = await api.get(`/products/${id}`);
        return data;
      },
      enabled: !!id,
    });
  };

  // Get seller stats
  const useGetSellerStats = () => {
    return useQuery({
      queryKey: ['seller-stats'],
      queryFn: async () => {
        const { data } = await api.get('/products/seller/stats');
        return data;
      },
    });
  };

  // Create product
  const createProduct = useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Product created successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Error creating product');
    },
  });

  // Update product
  const updateProduct = useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await api.patch(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Product updated successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Error updating product');
    },
  });

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/products/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Product deleted successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Error deleting product');
    },
  });

  // Get products for seller
  const useGetSellerProducts = () => {
    return useQuery({
      queryKey: ['seller-products'],
      queryFn: async () => {
        const { data } = await api.get('/products/seller');
        return data;
      },
    });
  };

  return {
    useGetProducts,
    useGetSellerProducts,
    useGetProduct,
    useGetSellerStats,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
