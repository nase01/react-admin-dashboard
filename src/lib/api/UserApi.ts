import { API_BASE_URL, getJwt } from '@/lib/utils';
import { UserDTO } from '@/types';

export async function getCurrentUser() {
	try {
		const jwt = getJwt();

		const response = await fetch(`${API_BASE_URL}/admin/auth/user`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		
		return data.data.currentAdmin;
	} catch (error) {
		console.log(error);
	}
}

export async function getUsers(perPage: number, currentPage: number) {
	
	try {
		const jwt = getJwt();

		const response = await fetch(`${API_BASE_URL}/admin/admins
			?perPage=${perPage}
			&currentPage=${currentPage}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		
		return data.data; 
	} catch (error) {
		console.log(error);
	}
}

export async function getUsersCount() {
	
	try {
		const jwt = getJwt();

		const response = await fetch(`${API_BASE_URL}/admin/admins/count`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		
		return data.data; 
	} catch (error) {
		console.log(error);
	}
}

export async function createUser(user: any) {
	try {
		const jwt = getJwt();
		
		const ipWhitelistArray: string[] = user.ipWhitelist
			? user.ipWhitelist
				.split('\n')
				.map((ip: string) => ip.trim()) // Trim whitespace
				.filter((ip: string) => ip !== "") // Filter out empty strings
			: [];

		const updatedUser: UserDTO = {
			...user,
			ipWhitelist: ipWhitelistArray,
		};

		const response = await fetch(`${API_BASE_URL}/admin/admins`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUser),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.errors[0].detail);
		}

		const data = await response.json();
		
		return data.data; 

	} catch (error) {
		return { errors: [{ detail: (error as Error).message }] };
	}
}