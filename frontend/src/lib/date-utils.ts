import _ from "lodash";

export const DateUtils = {
	isSameDay: (date1: Date, date2: Date): boolean => {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	},

	getWeekDays: (date: Date): Date[] => {
		const sunday = new Date(date);
		sunday.setDate(date.getDate() - date.getDay());
		return _.range(7).map((i) => {
			const day = new Date(sunday);
			day.setDate(sunday.getDate() + i);
			return day;
		});
	},

	formatTime: (date: Date): string => {
		return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
	},

	getEventDuration: (start: Date, end: Date): number => {
		return (end.getTime() - start.getTime()) / (1000 * 60);
	},

	getEventHeight: (start: Date, end: Date): number => {
		const durationInMinutes = DateUtils.getEventDuration(start, end);
		return (durationInMinutes / 60) * 100;
	},

	calculateEventStyle: (
		event: EnhancedEvent,
	): { top: string; height: string } => {
		const startTime = new Date(event.start.dateTime);
		const endTime = new Date(event.end.dateTime);
		const hour = startTime.getHours();
		const minutesFromTop = (startTime.getMinutes() / 60) * 100;
		const height = DateUtils.getEventHeight(startTime, endTime);

		return {
			top: `${minutesFromTop}%`,
			height: `${height}%`,
		};
	},
};
