export type NavLink = {
	imgURL?: string;
	route: string;
	label: string;
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