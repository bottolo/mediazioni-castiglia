import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { CalendarEvent } from "@backend/routes/types/calendar.ts";

type UseCalendarEventsProps = {
	queryKeys?: string[];
	enabled?: boolean;
};

export function useCalendarEvents({
	queryKeys = [],
	enabled = true,
}: UseCalendarEventsProps = {}) {
	return useQuery({
		queryKey: ["calendar", "events", ...queryKeys],
		queryFn: async () => {
			try {
				const response = await api.google.calendar.$get();

				if (!response.ok) {
					const errorData = await response.json().catch(() => null);
					throw new Error(
						`API error ${response.status}: ${errorData?.error || response.statusText}`,
					);
				}

				const data = await response.json();

				if (!Array.isArray(data)) {
					console.error("Expected array of events, got:", data);
					return [];
				}

				return data as CalendarEvent[];
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(`Failed to fetch calendar events: ${error.message}`);
				}
				throw new Error("Failed to fetch calendar events");
			}
		},
		enabled,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: true,
	});
}
