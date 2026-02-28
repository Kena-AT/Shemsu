import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export const useSeller = () => {
  const queryClient = useQueryClient();

  // Get verification status
  const useGetVerificationStatus = () => useQuery({
    queryKey: ['seller-verification'],
    queryFn: async () => {
      const { data } = await api.get('/seller/verification-status');
      return data;
    }
  });

  // Submit/Update verification
  const submitVerification = useMutation({
    mutationFn: (verifyData) => api.post('/seller/verify', verifyData),
    onSuccess: () => {
      queryClient.invalidateQueries(['seller-verification']);
      toast.success('Verification data submitted successfully! Our team will review it shortly.');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
    }
  });

  return {
    useGetVerificationStatus,
    submitVerification
  };
};
