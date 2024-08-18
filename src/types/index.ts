export type NavLink = {
	imgURL?: string;
	route: string;
	label: string;
	requiresAuth: boolean;
	restrictions: string[];
	hidden: boolean;
};

export type User = {
	id: string;
	name: string;
	email: string;
	accountType: string;
	role: string;
	active: boolean;
	pwForceChange: boolean;
	ip: string;
	ipWhitelist: [];
};

export interface UserDTO {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	ipWhitelist: string[];
	role: string;
	active: boolean;
	pwForceChange: boolean;
}

export interface JwtPayload {
  id: number;
  accountType: string;
  email: string;
  role: string;
  ip: string;
  userAgent: string;
  iat: number;
  exp: number;
}