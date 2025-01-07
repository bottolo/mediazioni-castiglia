import {Hono} from "hono";
import {serveStatic} from "hono/bun";
import {logger} from "hono/logger";
import {resendRoute} from "./routes/resend/resend.tsx";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/resend", resendRoute);
app.use("*", serveStatic({ root: "./frontend/dist" }));
app.use("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
