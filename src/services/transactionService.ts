import type {
	TransactionFilter,
	Transaction,
	TransactionSummary,
	MonthlyItem,
	createTransactionDTO,
} from "../types/transactions";
import { api } from "./api";

export const getTransactions = async (
	filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
	const response = await api.get<Transaction[]>("/transactions", {
		params: filter,
	});

	return response.data;
};

export const getTransactionsSummary = async (
	month: number,
	year: number,
): Promise<TransactionSummary> => {
	const response = await api.get<TransactionSummary>("/transactions/summary", {
		params: {
			month,
			year,
		},
	});

	return response.data;
};

export const getTransactionsMonthly = async (
	month: number,
	year: number,
	months?: number,
): Promise<{ history: MonthlyItem[] }> => {
	const response = await api.get("/transactions/historical", {
		params: {
			month,
			year,
			months,
		},
	});

	return response.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
	await api.delete(`/transactions/${id}`);
};

export const createTransaction = async (
	transacrionData: createTransactionDTO,
): Promise<Transaction> => {
	const response = await api.post<Transaction>("/transactions", transacrionData);
	return response.data;
};
