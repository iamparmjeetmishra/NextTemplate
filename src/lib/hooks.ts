import { useQuery } from "@tanstack/react-query";
import { getAllExpenses, getTotalSpent } from "./actions";

export function useTotalExpenses() {
  const { isPending, error, data } = useQuery({
		queryKey: ["total-spent"],
		queryFn: getTotalSpent,
  });
  
  return {
    isPending,
    error,
    data
  }
}

export function useAllExpenses() {
  const { isPending, data, error } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  return {
    isPending,
    error,
    data
  }
}
