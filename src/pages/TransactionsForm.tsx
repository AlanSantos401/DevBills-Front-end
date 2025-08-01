import {
	useEffect,
	useId,
	useState,
	type ChangeEvent,
	type FormEvent,
} from "react";
import {
	TransactionType,
	type createTransactionDTO,
} from "../types/transactions";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types/category";
import Card from "../components/Card";
import TransactionsTypeSelector from "../components/TransactionsTypeSelector";
import Input from "../components/Input";
import { AlertCircle, Calendar, DollarSign, Save, Tag } from "lucide-react";
import Select from "../components/Select";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { createTransaction } from "../services/transactionService";
import { toast } from "react-toastify";

interface FormData {
	description: string;
	amount: number;
	date: string;
	categoryId: string;
	type: TransactionType;
}

const initialFormData = {
	description: "",
	amount: 0,
	date: "",
	categoryId: "",
	type: TransactionType.EXPENSE,
};

const TransactionsForm = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const formId = useId();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCategories = async (): Promise<void> => {
			const response = await getCategories();
			setCategories(response);
		};

		fetchCategories();
	}, []);

	const filteredCategories = categories.filter(
		(category) => category.type === formData.type,
	);

	const validadeForm = (): boolean => {
		if (
			!formData.description ||
			!formData.amount ||
			!formData.date ||
			!formData.categoryId
		) {
			setError("Todos os campos são obrigatórios.");
			return false;
		}

		if (formData.amount <= 0) {
			return false;
		}

		return true;
	};

	const handleTransactionType = (itemType: TransactionType): void => {
		setFormData((prev) => ({ ...prev, type: itemType }));
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	): void => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		setLoading(true);
		setError(null);

		try {
			if (!validadeForm()) {
				return;
			}

			const transactionData: createTransactionDTO = {
				description: formData.description,
				amount: formData.amount,
				date: `${formData.date}T12:00:00Z`,
				categoryId: formData.categoryId,
				type: formData.type,
			};

			await createTransaction(transactionData);
			toast.success("Transação adicionada com sucesso!");
			navigate("/transacoes");
		} catch (err) {
			toast.error("Erro ao adicionar transação.");
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		navigate("/transacoes");
	};

	return (
		<div className="container-app py-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">Nova Transação</h1>

				<Card>
					{error && (
						<div className="flex items-center bg-red-300 border border-red-700 rounded-xl p-4 mb-6 gap-2">
							<AlertCircle className="w-5 h-5 text-red-700" />
							<p className="text-red-700">{error}</p>
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-4 gap-2 flex flex-col">
							<label htmlFor={formId}> Tipo de Transação</label>
							<TransactionsTypeSelector
								id={formId}
								value={formData.type}
								onChange={handleTransactionType}
							/>
						</div>
						<Input
							label="Descrição"
							name="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="Ex: Supermercado, Salário, etc..."
						/>

						<Input
							label="Valor"
							name="amount"
							type="number"
							step="0.01"
							value={formData.amount}
							onChange={handleChange}
							icon={<DollarSign className="h-4 w-4" />}
							placeholder="R$ 0,00"
						/>

						<Input
							label="Data"
							name="date"
							type="date"
							value={formData.date}
							onChange={handleChange}
							icon={<Calendar className="h-4 w-4" />}
						/>

						<Select
							label="Categoria"
							className="text-gray-400"
							name="categoryId"
							value={formData.categoryId}
							onChange={handleChange}
							icon={<Tag className="w-4 h-4" />}
							options={[
								{ value: "", label: "Selecione uma categoria" },
								...filteredCategories.map((category) => ({
									value: category.id,
									label: category.name,
								})),
							]}
						/>

						<div className="flex justify-end space-x-3 mt-2">
							<Button
								onClick={handleCancel}
								type="button"
								variant="outline"
								disabled={loading}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								variant={
									formData.type === TransactionType.EXPENSE
										? "danger"
										: "success"
								}
								disabled={loading}
							>
								{loading ? (
									<div className="flex items-center justify-center ">
										<div className={`w-4 h-4 border-4 mr-1 border-t-transparent rounded-full animate-spin
											${formData.type === TransactionType.EXPENSE ? "border-white": "border-black"}
											`} />
									</div>
								) : (
									<Save className="h-4 w-4 mr-2" />
								)}
								Salvar
							</Button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default TransactionsForm;
