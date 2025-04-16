import { z } from "zod";

const dateTimeSchema = z.object({
	dateTime: z.string(),
	timeZone: z.string(),
});

export const CalendarEventSchema = z.object({
	kind: z.string(),
	etag: z.string(),
	id: z.string(),
	status: z.string(),
	htmlLink: z.string(),
	updated: z.string(),
	start: dateTimeSchema,
	end: dateTimeSchema,
	iCalUID: z.string(),

	summary: z.string().optional(),
	description: z.string().optional(),
	location: z.string().optional(),
	visibility: z.string().optional(),
	creator: z
		.object({
			email: z.string(),
			displayName: z.string().optional(),
			self: z.boolean().optional(),
		})
		.optional(),
	organizer: z
		.object({
			email: z.string(),
			displayName: z.string().optional(),
			self: z.boolean().optional(),
		})
		.optional(),
	attendees: z
		.array(
			z.object({
				email: z.string(),
				displayName: z.string().optional(),
				responseStatus: z.string().optional(),
				self: z.boolean().optional(),
				organizer: z.boolean().optional(),
				optional: z.boolean().optional(),
			}),
		)
		.optional(),
	recurrence: z.array(z.string()).optional(),
	recurringEventId: z.string().optional(),
	originalStartTime: dateTimeSchema.optional(),
	transparency: z.string().optional(),
	colorId: z.string().optional(),
	sequence: z.number().optional(),
	reminders: z
		.object({
			useDefault: z.boolean().optional(),
			overrides: z
				.array(
					z.object({
						method: z.string(),
						minutes: z.number(),
					}),
				)
				.optional(),
		})
		.optional(),
	conferenceData: z.any().optional(),
});

export const CalendarEventsSchema = z.array(CalendarEventSchema);

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;

/**
 * Validates calendar event data against the schema
 * @param data Data to validate
 * @returns Validated data with proper typing
 * @throws Zod validation error if data doesn't match the schema
 */
export function validateCalendarEvents(data: unknown): CalendarEvent[] {
	return CalendarEventsSchema.parse(data);
}

/**
 * Safe version of validation that doesn't throw
 * @param data Data to validate
 * @returns An object with success flag and either validated data or error
 */
export function safeValidateCalendarEvents(
	data: unknown,
):
	| { success: true; data: CalendarEvent[] }
	| { success: false; error: z.ZodError } {
	return CalendarEventsSchema.safeParse(data);
}
