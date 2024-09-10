export type NavLink = {
	icon?: React.ComponentType;
	route: string;
	label: string;
	requiresAuth: boolean;
	restrictions: string[];
	hidden: boolean;
	subMenu?: SubMenuItem[];
};

export type SubMenuItem = {
	label: string;
	route: string;
	icon?: React.ComponentType;
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

export interface UserFormProps {
	userId?: string;  
	userData?: User; 
	userAction?: "user-create" | "user-edit" | "account-edit";
}

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