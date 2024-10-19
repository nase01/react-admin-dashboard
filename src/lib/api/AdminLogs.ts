import { API_BASE_URL, getJwt } from '@/lib/utils';

export async function getAdminLogs(pageSize: number, currentPage: number, search?: any) {
	
	try {
		const jwt = getJwt();

		const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";

		const response = await fetch(`${API_BASE_URL}/admin/logs/admins
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

export async function getAdminLogsCount(search?: any) {
	
	try {
		const jwt = getJwt();
		
		const searchParam = search ? `?search=${encodeURIComponent(search)}` : "";
	
		const response = await fetch(`${API_BASE_URL}/admin/logs/admins/count${searchParam}`, {
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