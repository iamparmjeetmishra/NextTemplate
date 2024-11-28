import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between bg-blue-200 p-4">
      <Link href="/dashboard">Logo</Link>
      <nav className="flex cursor-pointer gap-4">
        <Link href="#">Home</Link>
        <Link href="#">Dashboard</Link>
        <Link href="#">Account</Link>
      </nav>
    </header>
  );
}
