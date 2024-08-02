import {
	useMutation,
	useQuery,
} from "@tanstack/react-query";

import {
	signIn,
	signOut,
	getCurrentUser,
	getAllUsers
} from "@/lib/api";
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

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	});
};

export const useGetAllUsers = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_ALL_USERS],
		queryFn: getAllUsers,
	});
};
  