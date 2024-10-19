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
	icon?: React.ComponentType;
	label: string;
	route: string;
	restrictions: string[];
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
	imageUrl: string;
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

export type PresetAvatars = {
	fileName: string;
	path: string;
};

export type Logs = {
	info: string;
	createdAt: Date;
};