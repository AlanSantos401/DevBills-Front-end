import { useEffect, useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Login = () => {
	const { signWithGoogle, authState } = useAuth();
	const navigate = useNavigate();
	const googleButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (authState.user && !authState.loading) {
			navigate("/dashboard");
		}
	}, [authState.user, authState.loading, navigate]);

	const handleGoogleClick = () => {
		const button = googleButtonRef.current?.querySelector(
			'div[role="button"]'
		) as HTMLElement | null;

		button?.click();
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 p-2">
				<header>
					<h1 className="text-center text-3xl font-extrabold text-gray-900">
						DevBills
					</h1>
					<p className="mt-2 text-center text-sm text-gray-600">
						Gerencie as finanças de forma simples e eficiente
					</p>
				</header>

				<main className="mt-8 bg-white items-center py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
					<section className="mb-6">
						<h2 className="text-lg font-medium text-gray-900 text-center">
							Faça login para continuar
						</h2>
						<p className="mt-1 text-sm text-gray-600 text-center">
							Acesse sua conta para começar a gerenciar suas finanças
						</p>
					</section>

					<div className="flex justify-center relative w-full">
						{/* GoogleLogin invisível */}
						<div
							ref={googleButtonRef}
							className="absolute inset-0 opacity-0 cursor-pointer"
						>
							<GoogleLogin
								onSuccess={async (credentialResponse) => {
									if (!credentialResponse.credential) return;
									await signWithGoogle(
										credentialResponse.credential
									);
								}}
								onError={() => {
									console.error("Erro no login Google");
								}}
							/>
						</div>

						{/* Seu botão estilizado */}
						<GoogleLoginButton
							isLoading={authState.loading}
							onClick={handleGoogleClick}
						/>
					</div>

					{authState.error && (
						<div className="bg-red-50 text-center text-red-700 mt-4 p-2 rounded">
							<p>{authState.error}</p>
						</div>
					)}

					<footer className="mt-6">
						<p className="mt-1 text-sm text-gray-600 text-center">
							Ao fazer login, você concorda com nossos termos de uso e
							política de privacidade
						</p>
					</footer>
				</main>
			</div>
		</div>
	);
};

export default Login;

