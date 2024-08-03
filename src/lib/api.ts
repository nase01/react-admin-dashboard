const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function signIn(user: { email: string; password: string }) {
	try {
		const response = await fetch(`${API_BASE_URL}/admin/auth/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.errors[0].detail);
		}

		const data = await response.json();
		localStorage.setItem('jwt', data.data.user.token);

		return data;
	} catch (error) {
		return { errors: [{ detail: (error as Error).message }] };
	}
}

export async function signOut() {
	try {
		const token = localStorage.getItem('jwt');
		if (!token) {
			throw new Error('No token found');
		}

		/*
		// TODO: Add signout endpoint on the backend
		const response = await fetch(`${API_BASE_URL}/admin/auth/signout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.errors[0].detail);
		}
		*/

		localStorage.removeItem('jwt');
		return { success: true };
	} catch (error) {
		return { errors: [{ detail: (error as Error).message }] };
	}
}

export async function sendPWResetToken(user: { email: string; accountType?: string }) {
	const { email, accountType = "admin" } = user;

	try {
		const response = await fetch(`${API_BASE_URL}/admin/account/pwreset`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, accountType }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.errors[0].detail);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		return { errors: [{ detail: (error as Error).message }] };
	}
}

export async function getCurrentUser() {
	try {
		const jwt = localStorage.getItem('jwt');

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

export async function getAllUsers() {
	
	try {
		const jwt = localStorage.getItem('jwt');

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
    