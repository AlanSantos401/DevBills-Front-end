import { useId, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	fullWidth?: boolean;
	icon?: ReactNode;
	label?: string;
	error?: string;
	id?: string;
}

const Input = ({
	icon,
	fullWidth,
	error,
	label,
	id,
	className,
	...rest
}: InputProps ) => {
	const generateId = useId();
	const inputId = id || generateId;

	return (
		<div className={`${fullWidth ? "w-full" : ""} mb-4`}>
			{label && (
				<label
					htmlFor={inputId}
					className="block mb-2 text-sm font-medium text-gray-400"
				>
					{label}
				</label>
			)}
			<div className="relative">
				{icon && (
					<div className="absolute bottom-0 top-6 left-0 pl-3 flex items-center cursor-pointer text-gray-400">
						{icon}
					</div>
				)}
			</div>
			<input
				id={inputId}
				className={`block w-full rounded-xl border ${error ? "border-red-500" : "border-gray-700"}
            bg-gray-800 px-4 py-3 text-sm text-gray-50
            transition-all focus:outline-none focus:ring-2
            ${error ? "focus:border-red-500 focus:ring-red-500/2" : "focus:border-primary-500 focus:ring-primary-500/2"}
            ${icon ? "pl-10" : ""}   
            ${className}
            `}
				{...rest}
			/>
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
};

export default Input;
