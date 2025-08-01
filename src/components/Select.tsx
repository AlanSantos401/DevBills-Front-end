import { ChevronDown } from "lucide-react";
import { useId, type ReactNode, type SelectHTMLAttributes } from "react";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	icon?: ReactNode;
	fullWidth?: boolean;
	options: SelectOption[];
}

const Select = ({
	label,
	options,
	icon,
	error,
	fullWidth = true,
	className = "",
	id,
	...rest
}: SelectProps) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;

	return (
		<div className={`${fullWidth ? "w-full" : ""} mb-4 relative`}>
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium text-gray-50 mb-2"
				>
					{label}
				</label>
			)}

			<div className="relative">
				{icon && (
					<div className="absolute inset-y-0 top-2 left-0 flex items-center pl-2 text-gray-400">
						{icon}
					</div>
				)}

				<select
					id={inputId}
					{...rest}
					className={`block w-full bg-gray-800 py-3 pl-10 pr-4 rounded-xl text-gray-50 text-sm border ${
						error ? "border-red-500" : "border-gray-700"
					} ${
						error ? "focus:border-red-500" : "focus:border-primary-500"
					} outline-none appearance-none ${className}`}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>

				<div className="absolute inset-y-0 top-2 right-0 flex items-center pr-3">
					<ChevronDown className="h-5 w-5 text-gray-50" />
				</div>
			</div>

			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default Select;
