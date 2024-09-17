import {
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query";

import { signIn, signOut, sendPWResetToken, passwordReset } from "@/lib/api/AuthApi"
import { createUser, deleteUsers, editUser, getCurrentUser, getUserById, getUsers, getUsersCount} from "@/lib/api/UserApi";
import { accountPWChange, accountUpdate } from "@/lib/api/Account";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";


// ============================================================
// AUTH QUERIES
// ============================================================

export const useSignIn = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) =>
			signIn(user),
	});
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

export const useSendPWResetToken = () => {
	return useMutation({
		mutationFn: (email: string) =>
		sendPWResetToken(email),
	});
};

export const usePasswordReset = () => {
	return useMutation({
		mutationFn: (user: { email: string; newPassword: string; newPWConfirm: string; resetToken: string }) =>
		passwordReset(user),
	});
};

// ============================================================
// USER QUERIES
// ============================================================

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	});
};

export const useGetUsersCount = (search?: any) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USERS_COUNT, search],
		queryFn:  () => getUsersCount(search),
	});
};

export const useGetUsers = (pageSize: number, currentPage: number, search?: any) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USERS, pageSize, currentPage, search],
		queryFn: () => getUsers(pageSize, currentPage, search)
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (user: any) =>
			createUser(user),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.GET_USERS], /* Refetch updated user data */
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.GET_USERS_COUNT],
				});
			}
	});
};

export const useEditUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, user }: { id: string; user: any }) =>
      editUser(id, user),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.GET_USERS], /* Refetch updated user data */
				});
			}
	});
};

export const useGetUserById = (userId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId,
	});
};

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => deleteUsers(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
			queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS_COUNT],
      });
    },
  });
};

// ============================================================
// ACCOUNT QUERIES
// ============================================================
export const useAccountUpdate = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (user: any ) =>
			accountUpdate(user),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.GET_CURRENT_USER], /* Refetch updated user data */
				});
			}
	});
};

export const useAccountPWChange = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (user: any ) =>
			accountPWChange(user),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.GET_CURRENT_USER], /* Refetch updated user data */
				});
			}
	});
};