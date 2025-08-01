import type { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
	title?: string;
	subtitle?: string;
	icon?: ReactNode;
	red?: boolean;
	hover?: boolean;
	glowEffect?: boolean;
	className?: string;
}

const Card = ({
	children,
	title,
	subtitle,
	icon,
	red,
	hover = false,
	glowEffect = false,
	className = "",
}: CardProps) => {
	return (
		<div
			className={`bg-gray-900 rounded-xl border border-gray-700 shadow-md p-6 transition-all cursor-pointer
            ${hover ? "hover:border-primary-500 hover:shadow-lg hover:-translate-y-0.5" : ""}
			${red ? "hover:border-red-600 hover:shadow-lg hover:-translate-y-0.5" : ""}
            ${glowEffect ? "glow" : ""}
            ${className}
            `}
		>
			{(title || icon) && (
                <div className=" flex items-center space-x-3 mb-4">
                    {icon && (
                        <div className="p-2 bg-primary-500/10 rounded-xl flex items-center justify-center">
                             {icon} 
                        </div>
                    )}

                        {(title || subtitle) && (
                            <div >
                                {title && <h3 className="text-lg font-medium">{title}</h3>}
                                {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
                            </div>
                        )}

                </div>
            )}

			{children}
		</div>
	);
};

export default Card;
