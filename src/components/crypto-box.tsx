"use client";

import { useQuery } from "@tanstack/react-query";

interface CryptoItem {
  id: string;
  name: string;
  num_market_pairs: number;
  symbol: string;
}

export default function CryptoBox() {
  const { isLoading, error, data } = useQuery<CryptoItem[]>({
    queryKey: ["crypto-data"],
    queryFn: () => fetch("/api/crypto").then((res) => res.json()),
  });

  console.log("datafromdash", data);

  if (isLoading) return "Loading...";

  if (error instanceof Error) return `An error has occurred: ${error.message}`;

  return (
    <div className="m-auto mt-5 flex max-w-[900px] items-center justify-center rounded border shadow">
      <ul className="flex flex-wrap gap-2 p-4">
        {data?.map((item) => (
          <li
            key={item.id}
            className="flex size-[150px] flex-col items-center justify-center gap-4 rounded border p-4 text-sm"
          >
            <p className="text-md text-center">{item.name}</p>
            <p>{item.num_market_pairs}</p>
            <p>{item.symbol}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
