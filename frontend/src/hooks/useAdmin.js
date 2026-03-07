import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useAdmin = () => {
  const queryClient = useQueryClient();

  // Dashboard Stats
  const useGetStats = () => useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data } = await api.get('/admin/stats');
      return data;
    },
    refetchInterval: 60000, // Refresh every minute
  });

  // Analytics
  const useGetAnalytics = () => useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const { data } = await api.get('/admin/detailed-analytics');
      return data;
    }
  });

  // Payouts
  const useGetPayouts = () => useQuery({
    queryKey: ['admin-payouts'],
    queryFn: async () => {
      const { data } = await api.get('/admin/payouts');
      return data;
    }
  });

  // Products
  const useGetProductById = (id) => useQuery({
    queryKey: ['admin-product', id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/products/${id}`);
      return data;
    },
    enabled: !!id
  });

  // Users
  const useGetUsers = (params) => useQuery({
    queryKey: ['admin-users', params],
    queryFn: async () => {
      const { data } = await api.get('/admin/users', { params });
      return data;
    }
  });

  const useGetUserById = (id) => useQuery({
    queryKey: ['admin-user', id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/users/${id}`);
      return data;
    },
    enabled: !!id
  });

  // Verification Queue
  const useGetVerificationQueue = (params) => useQuery({
    queryKey: ['admin-verification-queue', params],
    queryFn: async () => {
      const { data } = await api.get('/admin/sellers/verification-queue', { params });
      return data;
    }
  });

  // Moderation Queue
  const useGetModerationQueue = (params) => useQuery({
    queryKey: ['admin-moderation-queue', params],
    queryFn: async () => {
      const { data } = await api.get('/admin/products/moderation-queue', { params });
      return data;
    }
  });

  // Global Orders
  const useGetGlobalOrders = (params) => useQuery({
    queryKey: ['admin-orders', params],
    queryFn: async () => {
      const { data } = await api.get('/admin/orders', { params });
      return data;
    }
  });

  const useGetOrderDetails = (id) => useQuery({
    queryKey: ['admin-order', id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/orders/${id}`);
      return data;
    },
    enabled: !!id
  });

  // System Settings
  const useGetSettings = () => useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const { data } = await api.get('/admin/settings');
      // Transfrom array to object for easier form handling if needed, 
      // but controller returns array. Let's keep it consistent or transform.
      return data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
    }
  });

  // Audit Logs
  const useGetAuditLogs = () => useQuery({
    queryKey: ['admin-audit-logs'],
    queryFn: async () => {
      const { data } = await api.get('/admin/audit-logs');
      return data;
    }
  });

  // Actions
  const updateStatus = useMutation({
    mutationFn: ({ id, status, reason }) => api.patch(`/admin/users/${id}/status`, { status, reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-users']);
      queryClient.invalidateQueries(['admin-user']);
    }
  });

  const verifySeller = useMutation({
    mutationFn: ({ id, status, reviewNotes, reason }) => api.patch(`/admin/sellers/verify/${id}`, { status, reviewNotes, reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-verification-queue']);
      queryClient.invalidateQueries(['admin-stats']);
      queryClient.invalidateQueries(['admin-user']);
    }
  });

  const moderateProduct = useMutation({
    mutationFn: ({ id, status, reason }) => api.patch(`/admin/products/${id}/moderate`, { status, reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-moderation-queue']);
      queryClient.invalidateQueries(['admin-stats']);
      queryClient.invalidateQueries(['admin-product']);
    }
  });

  const overrideOrderStatus = useMutation({
    mutationFn: ({ id, status, reason }) => api.patch(`/admin/orders/${id}/status-override`, { status, reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders']);
      queryClient.invalidateQueries(['admin-order']);
    }
  });

  const updateSettings = useMutation({
    mutationFn: (settingsData) => api.patch('/admin/settings', settingsData),
    onSuccess: () => queryClient.invalidateQueries(['admin-settings'])
  });

  const processPayout = useMutation({
    mutationFn: (payoutData) => api.post('/admin/payouts/process', payoutData),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-payouts']);
      queryClient.invalidateQueries(['admin-stats']);
    }
  });

  return {
    useGetStats,
    useGetUsers,
    useGetUserById,
    useGetVerificationQueue,
    useGetModerationQueue,
    useGetProducts: useGetModerationQueue, // Alias for component consistency
    useGetProductById,
    useGetGlobalOrders,
    useGetOrderDetails,
    useGetSettings,
    useGetAuditLogs,
    useGetAnalytics,
    useGetPayouts,
    updateStatus,
    verifySeller,
    moderateProduct,
    updateProductStatus: moderateProduct, // Alias for component consistency
    overrideOrderStatus,
    updateSettings,
    processPayout
  };
};
