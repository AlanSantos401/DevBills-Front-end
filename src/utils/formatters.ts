export const formatCurrency = (value?: number): string => {
	if (value == null) {
		return "R$ 0,00";
	}

	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
};



export const formatDate = (date: string | Date): string => {
const dataObj = date instanceof Date ? date : new Date(date);
return new Intl.DateTimeFormat("pt-BR").format(dataObj);
}