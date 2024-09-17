import { API_BASE_URL, getJwt, parseIPWhitelist } from '@/lib/utils';
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

export async function getUsers(pageSize: number, currentPage: number, search?: any) {
	
	try {
		const jwt = getJwt();

		const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";

		const response = await fetch(`${API_BASE_URL}/admin/admins
			?perPage=${pageSize}
			&currentPage=${currentPage}
			&sort=createdAt
			${searchParam}`, {
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

export async function getUsersCount(search?: any) {
	
	try {
		const jwt = getJwt();
		
		const searchParam = search ? `?search=${encodeURIComponent(search)}` : "";
	
		const response = await fetch(`${API_BASE_URL}/admin/admins/count${searchParam}`, {
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
		
		// Convert ipWhitelist from string to array
		const ipWhitelistArray: string[] = parseIPWhitelist(user.ipWhitelist);

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

export async function getUserById(userId: string) {
	
	try {
		const jwt = getJwt();

		const response = await fetch(`${API_BASE_URL}/admin/admins/${userId}`, {
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

export async function editUser(userId: string, userData: any) {
	try {
		const jwt = getJwt();
		
		// Convert ipWhitelist from string to array
		const ipWhitelistArray: string[] = parseIPWhitelist(userData.ipWhitelist);

		const updatedUser: UserDTO = {
			...userData,
			ipWhitelist: ipWhitelistArray,
		};

		const response = await fetch(`${API_BASE_URL}/admin/admins/${userId}`, {
			method: "PUT",
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

export async function deleteUsers(ids: string[]) {
	try {
		const jwt = getJwt();

		const response = await fetch(`${API_BASE_URL}/admin/admins`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ids }),
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