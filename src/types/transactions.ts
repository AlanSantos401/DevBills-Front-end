import type { Category, CategorySummary } from "./category";

export enum TransactionType {
	EXPENSE = "expense",
	INCOME = "income",
	
}

export interface Transaction {
	id: string;
	userId: string;
	description: string;
	amount: number;
	date: string | Date;
	categoryId: string;
	category: Category;
	type: TransactionType;
	updateAt?: string | Date;
	createAt?: string | Date;
}

export interface TransactionFilter {
	month: number;
	year: number;
	categoryId?: string;
	type?: TransactionType;
}

export interface TransactionSummary {
	totalIncomes: number;
	totalExpenses: number;
	balance: number;
	expenseCategory: CategorySummary[];
}
