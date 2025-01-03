import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})


import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";


import { useTotalExpenses } from '@/lib/hooks';



export default function Index() {
	const {isPending, data, error} = useTotalExpenses()

	if (isPending) return "loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="bg-black/70 min-h-screen text-white flex flex-col items-center p-4">
			<Card className={"w-[380px]"}>
				<CardHeader>
					<CardTitle>Total Spent</CardTitle>
					<CardDescription>
						The Total Amount You've spent
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					{isPending ? "..." : data}
				</CardContent>
				<CardFooter>
					<Button className="w-full">Refresh Total Expenses.</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
