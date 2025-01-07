import app from "./app.ts";

const server = Bun.serve({
	port: process.env.PORT || 3000,
	fetch: app.fetch,
	idleTimeout: 20,
});

console.log("Server started at", server.port);
