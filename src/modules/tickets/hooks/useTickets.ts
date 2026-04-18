import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketService } from '../services/ticketService';
import { Ticket } from '../types';

export function useTickets() {
  const queryClient = useQueryClient();

  const ticketsQuery = useQuery({
    queryKey: ['tickets'],
    queryFn: () => ticketService.getTickets().then(res => {
      if (!res.success) throw new Error(res.error || 'Failed to fetch tickets');
      return res.data;
    }),
  });

  const createTicketMutation = useMutation({
    mutationFn: (data: Pick<Ticket, 'subject' | 'description' | 'priority' | 'issueType'>) => 
      ticketService.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  const updateTicketStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      ticketService.updateTicket(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  return {
    tickets: ticketsQuery.data || [],
    isLoading: ticketsQuery.isLoading,
    error: ticketsQuery.error,
    refetch: ticketsQuery.refetch,
    createTicket: createTicketMutation.mutateAsync,
    updateStatus: updateTicketStatusMutation.mutateAsync,
    isCreating: createTicketMutation.isPending,
    isUpdating: updateTicketStatusMutation.isPending,
  };
}

export function useUploadData() {
  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => ticketService.uploadData(formData),
  });

  return {
    uploadData: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    error: uploadMutation.error,
  };
}
