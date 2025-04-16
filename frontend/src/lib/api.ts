import type { ApiRoutes } from "@backend/app.ts";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const api = client?.api;
