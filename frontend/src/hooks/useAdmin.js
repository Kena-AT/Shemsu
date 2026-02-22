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

  // Users
  const useGetUsers = (params) => useQuery({
    queryKey: ['admin-users', params],
    queryFn: async () => {
      const { data } = await api.get('/admin/users', { params });
      return data;
    }
  });

  // Verification Queue
  const useGetVerificationQueue = () => useQuery({
    queryKey: ['admin-verification-queue'],
    queryFn: async () => {
      const { data } = await api.get('/admin/sellers/verification-queue');
      return data;
    }
  });

  // Moderation Queue
  const useGetModerationQueue = () => useQuery({
    queryKey: ['admin-moderation-queue'],
    queryFn: async () => {
      const { data } = await api.get('/admin/products/moderation-queue');
      return data;
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
    onSuccess: () => queryClient.invalidateQueries(['admin-users'])
  });

  const verifySeller = useMutation({
    mutationFn: ({ id, status, reviewNotes, reason }) => api.patch(`/admin/sellers/verify/${id}`, { status, reviewNotes, reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-verification-queue']);
      queryClient.invalidateQueries(['admin-stats']);
    }
  });

  const moderateProduct = useMutation({
    mutationFn: ({ id, status, reason }) => api.patch(`/admin/products/${id}/moderate`, { status, reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-moderation-queue']);
      queryClient.invalidateQueries(['admin-stats']);
    }
  });

  return {
    useGetStats,
    useGetUsers,
    useGetVerificationQueue,
    useGetModerationQueue,
    useGetAuditLogs,
    updateStatus,
    verifySeller,
    moderateProduct
  };
};
