import { Hono } from "hono";
import { google } from "googleapis";
import { safeValidateCalendarEvents } from "../types/calendar.ts";

const apiKey: string =
	import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY ||
	process.env.GOOGLE_CALENDAR_API_KEY;

const calendarId: string =
	import.meta.env.VITE_GOOGLE_CALENDAR_ID || process.env.GOOGLE_CALENDAR_ID;

export const calendarRoute = new Hono().get("/calendar", async (c) => {
	const requestId = crypto.randomUUID();

	if (!apiKey) {
		console.error(
			`[${requestId}] Error: Google Calendar API key is not configured`,
		);
		return c.json(
			{
				error: "Server configuration error",
				details: "API key is missing",
				requestId,
			},
			500,
		);
	}

	if (!calendarId) {
		console.error(`[${requestId}] Error: Google Calendar ID is not configured`);
		return c.json(
			{
				error: "Server configuration error",
				details: "Calendar ID is missing",
				requestId,
			},
			500,
		);
	}

	try {
		console.log(
			`[${requestId}] Initializing Google Calendar API for calendar: ${calendarId}`,
		);

		const calendar = google.calendar({
			version: "v3",
			auth: apiKey,
		});

		console.log(`[${requestId}] Fetching calendar events`);

		const response = await calendar.events.list({
			calendarId: calendarId,
			timeMin: new Date().toISOString(),
			maxResults: 50,
			singleEvents: true,
			orderBy: "startTime",
		});

		const events = response.data.items;

		if (!events || events.length === 0) {
			console.log(`[${requestId}] No upcoming events found`);
			return c.json([]);
		}

		const validationResult = safeValidateCalendarEvents(events);

		if (!validationResult.success) {
			console.error(`[${requestId}] Validation error:`, validationResult.error);

			validationResult.error.errors.map(
				(err: { path: any[]; message: any }) => {
					console.error(
						`[${requestId}] Validation issue at path ${err.path.join(".")}: ${err.message}`,
					);
				},
			);

			return c.json(
				{
					error: "Invalid calendar data format",
					details:
						"The data returned by Google Calendar API did not match the expected format",
					validation: validationResult.error.format(),
					requestId,
				},
				500,
			);
		}

		console.log(
			`[${requestId}] Successfully fetched and validated ${events.length} calendar events`,
		);
		return c.json(validationResult.data);
	} catch (error: any) {
		if (error.response) {
			const { status, data } = error.response;
			console.error(`[${requestId}] Google API error (${status}):`, data);

			switch (status) {
				case 400:
					return c.json(
						{
							error: "Invalid request to Google Calendar API",
							details: data.error?.message || "Bad request",
							requestId,
						},
						400,
					);

				case 401:
				case 403:
					return c.json(
						{
							error: "Authentication failed with Google Calendar API",
							details: data.error?.message || "Invalid or expired API key",
							requestId,
						},
						401,
					);

				case 404:
					return c.json(
						{
							error: "Calendar not found",
							details: `Calendar ID '${calendarId}' does not exist or is not accessible`,
							requestId,
						},
						404,
					);

				case 429:
					return c.json(
						{
							error: "Google Calendar API rate limit exceeded",
							details: data.error?.message || "Too many requests",
							requestId,
						},
						429,
					);

				default:
					return c.json(
						{
							error: "Google Calendar API error",
							details: data.error?.message || `HTTP status ${status}`,
							status,
							requestId,
						},
						status,
					);
			}
		}

		if (
			error.code === "ENOTFOUND" ||
			error.code === "ETIMEDOUT" ||
			error.code === "ECONNREFUSED"
		) {
			console.error(`[${requestId}] Network error:`, error);
			return c.json(
				{
					error: "Network error",
					details: "Failed to connect to Google Calendar API",
					message: error.message,
					requestId,
				},
				503,
			);
		}

		console.error(`[${requestId}] Unexpected error:`, error);
		return c.json(
			{
				error: "Internal server error",
				details: "An unexpected error occurred when fetching calendar events",
				message: error.message || String(error),
				requestId,
			},
			500,
		);
	}
});
