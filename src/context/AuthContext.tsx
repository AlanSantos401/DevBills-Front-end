import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { AuthState } from "../types/Auth";
import { api } from "../services/api";

interface AuthContextProps {
	authState: AuthState;
	signWithGoogle: (idToken: string) => Promise<void>;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authState, setAuthState] = useState<AuthState>({
		user: null,
		error: null,
		loading: true,
	});

	// 🔹 Verifica se já existe token salvo
	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			setAuthState({ user: null, error: null, loading: false });
			return;
		}

		// Aqui você poderia validar token no backend futuramente
		setAuthState((prev) => ({ ...prev, loading: false }));
	}, []);

	// 🔹 Login via Google
	const signWithGoogle = async (idToken: string): Promise<void> => {
		setAuthState((prev) => ({ ...prev, loading: true }));

		try {
			const response = await api.post("/auth/google", { idToken });


			localStorage.setItem("token", response.data.token);

			setAuthState({
				user: response.data.user,
				error: null,
				loading: false,
			});
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Erro ao tentar logar";

			setAuthState({
				user: null,
				error: message,
				loading: false,
			});
		}
	};

	// 🔹 Logout simples
	const signOut = () => {
		localStorage.removeItem("token");

		setAuthState({
			user: null,
			error: null,
			loading: false,
		});
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
