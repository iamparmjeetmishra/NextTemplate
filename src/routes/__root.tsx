import {
	createRootRoute,
	Link,
	Outlet,
} from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
    <>
      <Navbar />
			<hr />
			<Outlet />
		</>
	),
});

function Navbar() {
	return (
		<div className="p-4 flex gap-3 justify-center">
			<Link to="/" className="[&.active]:font-bold">
				Home
			</Link>{" "}
			<Link to="/about" className="[&.active]:font-bold">
				About
			</Link>
			<Link to="/expenses" className="[&.active]:font-bold">
				Expenses
			</Link>
			<Link to="/create-expense" className="[&.active]:font-bold">
				Create
			</Link>
		</div>
	);
}
