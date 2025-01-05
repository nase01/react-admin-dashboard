import { API_BASE_URL } from '@/lib/utils';

export async function getLatestVersion(repo: string) {

	try {
		const response = await fetch(`${API_BASE_URL}/${repo}/v`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		
		return data.data; 
	} catch (error) {
		console.log(error);
	}
}


export async function getReleases(repo: string, tag?: string) {
	
	const tagParam = tag ? `?tag=${encodeURIComponent(tag)}` : "";

	try {
		const response = await fetch(`${API_BASE_URL}/${repo}/releases${tagParam}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		
		return data.data; 
	} catch (error) {
		console.log(error);
	}
}
