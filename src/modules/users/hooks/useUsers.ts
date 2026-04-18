import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';

export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers().then(res => {
      if (!res.success) throw new Error(res.error || 'Failed to fetch User Directory');
      return res.data;
    }),
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => 
      userService.updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    refetch: usersQuery.refetch,
    updateRole: updateRoleMutation.mutateAsync,
    isUpdating: updateRoleMutation.isPending,
  };
}
