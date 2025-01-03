import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useForm } from "@tanstack/react-form";
// import type { FieldApi } from "@tanstack/react-form";
// import { api } from "@/lib/api";
import { createExpense } from "@/lib/actions";

export const Route = createFileRoute("/create-expense")({
	component: CreateExpenseComponent,
});

function CreateExpenseComponent() {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			title: "",
			amount: 0,
		},
    onSubmit: async ({ value }) => {
      // await new Promise(r => setTimeout(r, 3000))
      // await api.expenses.$post({json: value})
      await createExpense({value})
			console.log(value);
			navigate({ to: "/expenses" });
		},
	});

	function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		console.log(e);
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	}

	return (
		<div className="flex mt-6 justify-center max-w-2xl flex-col gap-4 mx-auto">
			<h2>Create Expense</h2>

			<form
				onSubmit={handleFormSubmit}
				className="border p-4 rounded space-y-2"
			>
				<form.Field
					name="title"
					children={(field) => (
						<>
							<Label htmlFor="title">Title</Label>
							<Input
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="title"
							/>
							{field.state.meta.isTouched ? (
								<em>{field.state.meta.errors}</em>
							) : null}
						</>
					)}
				/>
				<form.Field
					name="amount"
					children={(field) => (
						<>
							<Label htmlFor="amount">Amount</Label>
							<Input
								type="number"
								inputMode="numeric"
								pattern="[0-9]+"
								placeholder="enter your amount"
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(Number(e.target.value))
								}
              />
              {field.state.meta.isTouched ? (
								<em>{field.state.meta.errors}</em>
							) : null}
						</>
					)}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? 'Submitting...' : "Submit"}
            </Button>
          )}
        />
			</form>
		</div>
	);
}
