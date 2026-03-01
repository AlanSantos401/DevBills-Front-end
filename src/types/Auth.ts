export interface AuthState {
	user: {
		uid: string;
		name: string | null;
		email: string | null;
		avatar: string | null;
	} | null;
	error: string | null;
	loading: boolean;
}
