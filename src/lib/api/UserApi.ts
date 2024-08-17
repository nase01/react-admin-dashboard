import { API_BASE_URL, getJwt } from '@/lib/utils';

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

export async function getUsers() {
	
	try {
		const jwt = getJwt();

		const response = await fetch(`${API_BASE_URL}/admin/admins?perPage=5&currentPage=1`, {
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