import type { JSX } from "react";
import Button from "../components/button";
import { Wallet, TrendingUp, List, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

interface Feature {
	icon: JSX.Element;
	title: string;
	description: string;
}

const Home = () => {
const navigate = useNavigate();

	const auth =useAuth();
	console.log(auth)

	const festures: ReadonlyArray<Feature> = [
		{
			icon: <Wallet className="w-8 h-8 text-primary-500" />,
			title: "Controle Finaceiro",
			description:
				"Monitore suas despesas e receitas em um so lugar, com interface intuitiva e fácil de usar.",
		},
		{
			icon: <TrendingUp className="w-8 h-8 text-primary-500" />,
			title: "Relatórios",
			description:
				"Vizualize graficamente seus gastos e entenda para onde seu dinehiro  está indo.",
		},
		{
			icon: <List className="w-8 h-8 text-primary-500" />,
			title: "Categorias Personalizadas",
			description:
				"Organize suas tranzições em categorias para melhor análise.",
		},
		{
			icon: <CreditCard className="w-8 h-8 text-primary-500" />,
			title: "Taansações Ilimitadas",
			description:
				"Adicione quantas trannsações quiser e mantenha um histórico completo de suas finanças.",
		},
	];

	return (
		<div className="bg-gray-950 min-h-screen">
			<div className="container-app">
				<section className="py-12 md:py-20">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12  items-center">
						<div>
							<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
								Gerencie suas financias com o
								<span className="text-primary-500">DevBills</span>
							</h1>
							<p className="text-lg text-white mb-8">
								Uma plataforma para você gerenciar suas finanças de forma
								simples e eficiente. Organize suas finanças pessoais ou de seu
								negócio com facilidade.
							</p>
							<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
								<Button className="text-center px-6 py-3" onClick={() => navigate("/login")}>Começar Agora</Button>
							</div>
						</div>
					</div>
				</section>

				<section className="py-12 md:py-20 bg-gray-950 rounded-xl">
					<div className="container-app">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-white mb-4">
								Recurso do DevBills
							</h2>
							<p className="text-lg text-white max-w-2xl mx-auto">
								Nossa plataforma oferece tudo o que você precisa para manter
								suas fonanças organizada.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{festures.map((Feature) => (
								<div
									key={Feature.title}
									className="bg-gray-800 p-6 rounder-xl hover:shadow-lg"
								>
									<div className="mb-4 bg-primary-500/10 p-3 rounded-full inline-block">
										{Feature.icon}
									</div>
									<h3 className="text-xl font-semibold text-white mb-2">
										{Feature.title}
									</h3>
									<p className="text-gray-400">{Feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="py-12 md:py-20">
					<div className="bg-gray-900 p-8 md:p-12 rounnded-xl text-center border border-gray-700">
						<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Pronto para organizar suas finanças?</h2>
						<p className="text-white text-opacity-90 max-w-2xl mx-auto mb-8">
							Comece a usar o DevBills hoje mesmo e tenha o controle total sobre
							seu dinheiro. É gratuito e fácil de usar!
						</p>
						<Button className="mx-auto px-6 py-3" onClick={() => navigate("/login")}>Criar Conta Gratuita</Button>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
