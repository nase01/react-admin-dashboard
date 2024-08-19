import {
	useMutation,
	useQuery,
} from "@tanstack/react-query";

import { signIn, signOut, sendPWResetToken, passwordReset } from "@/lib/api/AuthApi"
import { createUser, getCurrentUser, getUsers, getUsersCount} from "@/lib/api/UserApi";

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

export const useGetUsersCount = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USERS_COUNT],
		queryFn: getUsersCount,
	});
};

export const useGetUsers = (perPage: number, currentPage: number) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USERS, perPage, currentPage],
		queryFn: () => getUsers(perPage, currentPage)
	});
};

export const useCreateUser = () => {
	return useMutation({
		mutationFn: (user: any) =>
			createUser(user),
	});
};

