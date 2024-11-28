"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CryptoBox from "@/components/crypto-box";
import DashboardHeader from "@/components/header";

const queryClient = new QueryClient();

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <QueryClientProvider client={queryClient}>
        <DashboardHeader />
        <CryptoBox />
      </QueryClientProvider>
    </div>
  );
}
