import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { AuthState } from "../types/Auth";
import {
	signInWithPopup,
	onAuthStateChanged,
	signOut as firebaSignOut,
} from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "../config/firebase";

interface AuthContextProps {
	authState: AuthState;
	signWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authState, setAuthState] = useState<AuthState>({
		user: null,
		error: null,
		loading: false,
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			firebaseAuth,
			(user) => {
				console.log(user);
				if (user) {
					setAuthState({
						user: {
							uid: user.uid,
							dispalyName: user.displayName,
							email: user.email,
							photoURL: user.photoURL,
						},
						error: null,
						loading: false,
					});
				} else {
					setAuthState({
						user: null,
						error: null,
						loading: false,
					});
				}
			},
			(error) => {
				console.error("Erro na autenticação");
				setAuthState({
					user: null,
					error: error.message,
					loading: false,
				});
			},
		);

		return () => unsubscribe();
	}, []);

	const signWithGoogle = async (): Promise<void> => {
		setAuthState((prev) => ({ ...prev, loading: true }));

		try {
			await signInWithPopup(firebaseAuth, googleAuthProvider);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Error ao tentar logar";

			console.error(err);
			setAuthState((prev) => ({ ...prev, loading: false, error: message }));
		}
	};

	const signOut = async (): Promise<void> => {
		setAuthState((prev) => ({ ...prev, loading: true }));
		
        try {
			await firebaSignOut(firebaseAuth);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Error ao tentar logar";

			console.error(err);
			setAuthState((prev) => ({ ...prev, loading: false, error: message }));
		}
	};

	return (
		<AuthContext.Provider value={{ authState, signWithGoogle, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
