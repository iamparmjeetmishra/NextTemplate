import axios from "axios";
import { Hono } from "hono";
import { handle } from "hono/vercel";

import { API_SECRET, API_URL } from "@/lib/constants";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/health", (c) => {
  return c.text("Health ok");
});

app.get("/crypto", async (c) => {
  const res = await axios.get(`${API_URL}`, {
    headers: {
      "X-CMC_PRO_API_KEY": `${API_SECRET}`,
    },
  });
  console.log("Here");
  // console.log(res);

  const data = await res.data.data;
  console.log(data);

  return c.json(data);
});

export const GET = handle(app);
export const POST = handle(app);
