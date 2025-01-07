import {hc} from "hono/client";
import type {ApiRoutes} from "../../backend/app.ts";

const client = hc<ApiRoutes>("/");

export const api = client?.api;
