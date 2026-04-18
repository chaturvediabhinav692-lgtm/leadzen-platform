import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadService } from '../services/leadService';
import { Lead } from '../types';

export function useLeads() {
  const queryClient = useQueryClient();

  const leadsQuery = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadService.getLeads().then(res => {
      if (!res.success) throw new Error(res.error || 'Failed to fetch leads');
      return res.data;
    }),
  });

  const createLeadMutation = useMutation({
    mutationFn: (data: Partial<Lead>) => leadService.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const updateLeadStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      leadService.updateLead(id, { status } as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: (id: string) => leadService.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  return {
    leads: leadsQuery.data || [],
    isLoading: leadsQuery.isLoading,
    error: leadsQuery.error,
    refetch: leadsQuery.refetch,
    createLead: createLeadMutation.mutateAsync,
    updateStatus: updateLeadStatusMutation.mutateAsync,
    deleteLead: deleteLeadMutation.mutateAsync,
    isCreating: createLeadMutation.isPending,
    isUpdating: updateLeadStatusMutation.isPending,
    isDeleting: deleteLeadMutation.isPending,
  };
}

export function useLeadAnalytics() {
  return useQuery({
    queryKey: ['lead-analytics'],
    queryFn: () => leadService.getAnalytics().then(res => {
      if (!res.success) throw new Error(res.error || 'Failed to fetch analytics');
      return res.data;
    }),
  });
}
