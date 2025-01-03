import { api } from "./api";

export  async function getTotalSpent() {
	const res = await api.expenses["/total"].$get();
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	// console.log('Res', res)
	const data = await res.json();
	const total = await data[0]["value"]
	return total;
}

export  async function getAllExpenses() {
	const res = await api.expenses.$get();
	if (!res.ok) {
		throw new Error("Server error");
	}
	const data = await res.json();
	return data;
}


type createExpenseType = {
  title: string
  amount: number
}


export async function createExpense({value}: {value:createExpenseType}) {
  await api.expenses.$post({json: value})
}