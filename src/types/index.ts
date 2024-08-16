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
	ipWhitelist: string[];
};

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