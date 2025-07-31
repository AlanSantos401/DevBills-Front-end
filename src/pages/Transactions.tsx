import { AlertCircle, ArrowDown, ArrowUp, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router";
import MonthYearSelect from "../components/MonthYearSelect";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Card from "../components/Card";
import { TransactionType, type Transaction } from "../types/transactions";
import { deleteTransaction, getTransactions } from "../services/transactionService";
import Button from "../components/button";
import { formatCurrency, formatDate } from "../utils/formatters";
import { toast } from "react-toastify";

const Transactions = () => {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [deletingId, setDeletingId] = useState<string>("");

	const fetchTransactions = async () => {
		try {
			setLoading(true);
			setError("");
			const data = await getTransactions({ year, month });
			setTransactions(data);
		} catch (err) {
			setError("Não foi possível carregar as transações. Tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			setDeletingId(id);
			await deleteTransaction(id);
			setTransactions((prev) => prev.filter((transactions) => transactions.id !== id));
			toast.success("Transação excluída com sucesso!");
		} catch (err) {
         console.error(err)
		 toast.error("Erro ao excluir a transação. Tente novamente.");
		} finally {
			setDeletingId("");
		}
	}

	const confirmDelete = (id: string) => {
		if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
			handleDelete(id);
		}
	}

	useEffect(() => {
		fetchTransactions();
	}, [year, month]);

	return (
		<div className="container-app py-5">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">transações</h1>
				<Link
					to="/transacoes/nova"
					className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600"
				>
					<Plus className="w-4 h-4 mr-2" />
					Nova Transação
				</Link>
			</div>

			<Card className="mb-6">
				<MonthYearSelect
					month={month}
					year={year}
					onYearChange={setYear}
					onMonthChange={setMonth}
				/>
			</Card>
			<Card className="mb-6">
				<Input
					placeholder="Pesquisar transações..."
					icon={<Search className="w-4 h-4" />}
					fullWidth
				/>
			</Card>

			<Card className="overflow-auto">
				{loading ? (
					<div className="flex items-center justify-center ">
						<div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
					</div>
				) : error ? (
					<div className="p-8 text-center">
						<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
						<p>{error}</p>
						<Button onClick={fetchTransactions} className="mx-auto mt-6">
							Tente novamente
						</Button>
					</div>
				) : transactions?.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 mb-4">Nenhuam transação encontrada.</p>

						<Link
							to="/transacoes/nova"
							className="w-fit mx-auto mt-6 bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600"
						>
							<Plus className="w-4 h-4 mr-2" />
							Nova Transação
						</Link>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="divide-y divide-gray-700 min-h-full w-full">
							<thead>
								<tr>
									<th
										scope="col"
										className="px-3 py-3 text-left text-sm  font-medium text-gray-400 uppercase"
									>
										Descrição
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-left text-sm  font-medium text-gray-400 uppercase"
									>
										Data
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-left text-sm  font-medium text-gray-400 uppercase"
									>
										Categoria
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-left text-sm  font-medium text-gray-400 uppercase"
									>
										Valor
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-left text-sm  font-medium text-gray-400 uppercase"
									>
										{""}
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-700">
								{transactions.map((transaction) => (
									<tr key={transaction.id} className="hover:bg-gray-800">
										<td className="px-3 py-4 text-sm text-gray-400 whitespace-nowrap">
											<div className="flex items-center">
												<div className="mr-2">
													{transaction.type === TransactionType.INCOME ? (
														<ArrowUp className="w-4 h-4 text-primary-500" />
													) : (
														<ArrowDown className="w-4 h-4 text-red-500" />
													)}
												</div>
												<span className="text-sm font-medium text-gray-50">
													{transaction.description}
												</span>
											</div>
										</td>

										<td className="px-3 py-4  text-gray-400 whitespace-nowrap">
											{formatDate(transaction.date)}
										</td>

										<td className="px-3 py-4  text-gray-400 whitespace-nowrap">
											<div className="flex items-center">
												<div
													className="w-2 h-2 rounded-full mr-2"
													style={{
														backgroundColor: transaction.category.color,
													}}
												/>

												<span className="text-sm text-gray-400">
													{transaction.category.name}
												</span>
											</div>
										</td>

										<td className="px-3 py-4  text-gray-400 whitespace-nowrap">
											<span
												className={`${transaction.type === TransactionType.INCOME ? "text-primary-500" : "text-red-500"}`}
											>
												{formatCurrency(transaction.amount)}
											</span>
										</td>

										<td className="px-3 py-4  text-gray-400 whitespace-nowrap ">
											<button  type="button"
											onClick={() => confirmDelete(transaction.id)}
                                            className="text-gray-400 hover:text-red-400 rounded-full"
											disabled={deletingId === transaction.id}

											>
												{deletingId === transaction.id ? (
													<span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"/>
												): (<Trash2 className="w-4 h-4 cursor-pointer" />)}
												
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Card>
		</div>
	);
};

export default Transactions
