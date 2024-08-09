import { API_BASE_URL, getJwt } from '@/lib/utils';

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
		const jwt = getJwt();

		const response = await fetch(`${API_BASE_URL}/admin/auth/signout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${jwt}`,
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.errors[0].detail);
		}
		
		localStorage.removeItem('jwt');
		return { success: true };
	} catch (error) {
		return { errors: [{ detail: (error as Error).message }] };
	}
}

export async function sendPWResetToken(email: string) {

	try {
		const response = await fetch(`${API_BASE_URL}/admin/account/pwreset`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, "accountType": "admin" }),
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

export async function passwordReset(user: { email: string; newPassword: string; newPWConfirm: string; resetToken: string }) {

	try {
		const response = await fetch(`${API_BASE_URL}/admin/account/pwreset`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ 
				"accountType": "admin",
				"email": user.email,  
				"newPassword": user.newPassword,  
				"newPasswordConfirm": user.newPWConfirm,  
				"token": user.resetToken,  
			}),
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