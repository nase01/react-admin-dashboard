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

export type UserDTO = Omit<User, "id" | "accountType" | "ip"> & {
	password: string;
	passwordConfirm: string;
};

export type JwtPayload = {
  id: number;
  accountType: string;
  email: string;
  role: string;
  ip: string;
  userAgent: string;
  iat: number;
  exp: number;
}