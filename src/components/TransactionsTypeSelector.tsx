import { TransactionType } from "../types/transactions";

interface TransactionsTypeSelectorProps {
	value: TransactionType;
	id?: string;
	onChange: (value: TransactionType) => void;
}

const TransactionsTypeSelector = ({
	value,
	onChange,
	id,
}: TransactionsTypeSelectorProps) => {
	const transactionsTypeButttons = [
		{
			type: TransactionType.EXPENSE,
			label: "Despesa",
			activeClasses: "bg-red-500 border-red-500 text-red-700 font-medium",
			inativeClasses:
				"bg-transparent border-red-300 text-red-500 hover:bg-red-50",
		},
		{
			type: TransactionType.INCOME,
			label: "Receita",
			activeClasses: "bg-green-100 border-green-500 text-green-700 font-medium",
			inativeClasses:
				"bg-transparent border-green-300 text-green-500 hover:bg-green-50",
		},
	];

	return (
		<fieldset id={id} className="grid grid-cols-2 gap-4">
			{transactionsTypeButttons.map((item) => (
				<button
					key={item.type}
					type="button"
					onClick={() => onChange(item.type)}
					className={`cursor-pointer flex items-center justify-center border rounded-md py-2 px-4 transition-all
                     ${value === item.type ? item.activeClasses : item.inativeClasses}
                    `}
				>
					{item.label}
				</button>
			))}
		</fieldset>
	);
};

export default TransactionsTypeSelector;
