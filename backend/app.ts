import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { megaRoute } from "./routes/mega/mega.ts";
import { resendRoute } from "./routes/resend/resend.tsx";
import { calendarRoute } from "./routes/google/calendar.ts";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app
	.basePath("/api")
	.route("/mega", megaRoute)
	.route("/resend", resendRoute)
	.route("/google", calendarRoute);
app.use("*", serveStatic({ root: "./frontend/dist" }));
app.use("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
