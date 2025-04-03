import { cn } from "@/utils/cn.ts";
import _ from "lodash";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const MONTHS = [
	"Gennaio",
	"Febbraio",
	"Marzo",
	"Aprile",
	"Maggio",
	"Giugno",
	"Luglio",
	"Agosto",
	"Settembre",
	"Ottobre",
	"Novembre",
	"Dicembre",
];

const DAYS = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
const DAYS_FULL = [
	"Domenica",
	"Lunedì",
	"Martedì",
	"Mercoledì",
	"Giovedì",
	"Venerdì",
	"Sabato",
];

const mockEvents = [
	{
		id: "1",
		summary: "Presidio",
		description: "Discussion about mortgage options",
		start: { dateTime: "2025-02-23T10:00:00" },
		end: { dateTime: "2025-02-23T15:00:00" },
		color: "#4285f4",
	},
	{
		id: "2",
		summary: "Appuntamento",
		description: "Annual review of loan portfolio",
		start: { dateTime: "2025-02-24T14:00:00" },
		end: { dateTime: "2025-02-24T15:30:00" },
		color: "#34a853",
	},
	{
		id: "3",
		summary: "Appuntamento",
		description: "Annual review of loan portfolio",
		start: { dateTime: "2025-02-24T15:45:00" },
		end: { dateTime: "2025-02-24T16:30:00" },
		color: "#34a853",
	},
	{
		id: "4",
		summary: "Appuntamento",
		description: "Annual review of loan portfolio",
		start: { dateTime: "2025-02-24T17:30:00" },
		end: { dateTime: "2025-02-24T18:00:00" },
		color: "#34a853",
	},
];

const DateUtils = {
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
		return (durationInMinutes / 60) * 100; // Convert to percentage of hour
	},

	calculateEventStyle: (event: Event): { top: string; height: string } => {
		const startTime = new Date(event.start.dateTime);
		const endTime = new Date(event.end.dateTime);
		const minutesFromTop = startTime.getMinutes();
		const height = DateUtils.getEventHeight(startTime, endTime);

		return {
			top: `${minutesFromTop}%`,
			height: `${height}%`,
		};
	},

	formatDate: (date: Date): string => {
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		return `${day}/${month}/${date.getFullYear()}`;
	},
};

interface Event {
	id: string;
	summary: string;
	description: string;
	start: { dateTime: string };
	end: { dateTime: string };
	color: string;
}

interface ViewProps {
	currentDate: Date;
	events: Event[];
}

// Show only business hours (8am-10pm) to reduce space on mobile
const DISPLAY_HOURS = _.range(8, 22);

const WeekView: React.FC<ViewProps> = ({ currentDate, events }) => {
	const weekDays = DateUtils.getWeekDays(currentDate);
	const today = new Date();

	const MobileWeekView = () => (
		<div className="md:hidden relative">
			<div className="grid grid-cols-8 divide-x divide-gray-300 sticky top-0 z-10 bg-white border-b border-gray-300">
				<div className="p-1"></div>
				{weekDays.map((day) => (
					<div key={day.toString()} className="p-1 text-center">
						<p className="text-xs font-semibold">
							{DAYS[day.getDay()].substring(0, 1)}
						</p>
						<p
							className={cn(
								"text-xs",
								DateUtils.isSameDay(day, today) ? "text-blue-600" : "",
							)}
						>
							{day.getDate()}
						</p>
					</div>
				))}
			</div>

			<div className="grid grid-cols-8 divide-y divide-x divide-gray-300">
				{DISPLAY_HOURS.map((hour) => (
					<React.Fragment key={hour}>
						<p className="text-xs pr-1 pt-1 text-right text-gray-500 sticky left-0 bg-white">
							{`${hour}`}
						</p>
						{weekDays.map((day) => {
							const dayEvents = events.filter((event) => {
								const eventDate = new Date(event.start.dateTime);
								return (
									DateUtils.isSameDay(eventDate, day) &&
									eventDate.getHours() === hour
								);
							});

							return (
								<div key={day.toString()} className="min-h-8 relative">
									{dayEvents.map((event) => {
										const style = DateUtils.calculateEventStyle(event);
										return (
											<div
												key={event.id}
												className="absolute w-full overflow-hidden rounded-md min-h-6"
												style={{
													backgroundColor: `${event.color}20`,
													color: event.color,
													top: style.top,
													height: style.height,
												}}
											>
												<p className="truncate font-medium text-xs pl-1">
													{event.summary}
												</p>
											</div>
										);
									})}
								</div>
							);
						})}
					</React.Fragment>
				))}
			</div>
		</div>
	);

	const DesktopWeekView = () => (
		<div className="hidden md:block relative">
			<div className="grid grid-cols-8 divide-x divide-gray-300 sticky top-0 z-10 bg-white border-b border-gray-300">
				<div className="p-2"></div>
				{weekDays.map((day) => (
					<div key={day.toString()} className="p-2 text-center font-semibold">
						<div>{DAYS[day.getDay()]}</div>
						<div
							className={DateUtils.isSameDay(day, today) ? "text-blue-600" : ""}
						>
							{day.getDate()}
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-8 divide-y divide-x divide-gray-300">
				{DISPLAY_HOURS.map((hour) => (
					<React.Fragment key={hour}>
						<div className="p-2 text-right text-sm text-gray-500">
							{`${String(hour).padStart(2, "0")}:00`}
						</div>
						{weekDays.map((day) => {
							const dayEvents = events.filter((event) => {
								const eventDate = new Date(event.start.dateTime);
								return (
									DateUtils.isSameDay(eventDate, day) &&
									eventDate.getHours() === hour
								);
							});

							return (
								<div key={day.toString()} className="min-h-16 relative">
									{dayEvents.map((event) => {
										const style = DateUtils.calculateEventStyle(event);
										return (
											<div
												key={event.id}
												className="absolute w-full p-1 text-xs rounded-md min-h-12"
												style={{
													backgroundColor: `${event.color}20`,
													color: event.color,
													top: style.top,
													height: style.height,
													overflow: "hidden",
												}}
											>
												<p className="font-medium truncate">{event.summary}</p>
												<p className="text-xs truncate">
													{DateUtils.formatTime(new Date(event.start.dateTime))}{" "}
													-{DateUtils.formatTime(new Date(event.end.dateTime))}
												</p>
											</div>
										);
									})}
								</div>
							);
						})}
					</React.Fragment>
				))}
			</div>
		</div>
	);

	return (
		<>
			<MobileWeekView />
			<DesktopWeekView />
		</>
	);
};

const DayView: React.FC<ViewProps> = ({ currentDate, events }) => {
	const dayEvents = _.filter(events, (event) =>
		DateUtils.isSameDay(new Date(event.start.dateTime), currentDate),
	);
	const today = new Date();
	const isToday = DateUtils.isSameDay(currentDate, today);

	return (
		<>
			<div className="text-center py-2 border-b border-gray-300 bg-white sticky top-0 z-10">
				<div className={cn("font-semibold", isToday ? "text-blue-600" : "")}>
					{DAYS_FULL[currentDate.getDay()]} {currentDate.getDate()}{" "}
					{MONTHS[currentDate.getMonth()]}
				</div>
			</div>
			<div className="flex flex-col divide-y divide-gray-300">
				{DISPLAY_HOURS.map((hour) => (
					<div key={hour} className="flex min-h-10 md:min-h-16">
						<div className="w-8 md:w-16 py-2 text-right pr-1 md:pr-4 text-xs md:text-sm text-gray-500">
							{`${hour}`}
						</div>
						<div className="flex-1 border-l border-gray-300 relative">
							{_.chain(dayEvents)
								.filter(
									(event) => new Date(event.start.dateTime).getHours() === hour,
								)
								.map((event) => {
									const style = DateUtils.calculateEventStyle(event);
									return (
										<div
											key={event.id}
											className="absolute w-full p-1 md:p-2 rounded-md"
											style={{
												backgroundColor: `${event.color}20`,
												color: event.color,
												top: style.top,
												height: style.height,
												overflow: "hidden",
											}}
										>
											<h4 className="font-semibold truncate text-xs md:text-sm">
												{event.summary}
											</h4>
											<p className="text-xs truncate">
												{`${DateUtils.formatTime(new Date(event.start.dateTime))}`}
											</p>
										</div>
									);
								})
								.value()}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

const Calendar: React.FC = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [currentView, setCurrentView] = useState("week");

	const navigateDate = (direction: "next" | "prev") => {
		const newDate = new Date(currentDate);
		const offset = direction === "next" ? 1 : -1;

		if (currentView === "week") {
			newDate.setDate(currentDate.getDate() + 7 * offset);
		} else {
			newDate.setDate(currentDate.getDate() + offset);
		}

		setCurrentDate(newDate);
	};

	// Format header consistently for both views
	const headerTitle = () => {
		return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
	};

	return (
		<div className="w-full mx-auto">
			<div className="flex flex-row justify-between items-center mb-4 px-4 md:px-0">
				<div className="flex flex-row items-center justify-between gap-1 w-32 md:w-64">
					<button
						type="button"
						onClick={() => navigateDate("prev")}
						className="cursor-pointer p-1 hover:bg-gray-100 rounded-md w-6 h-6 md:w-8 md:h-8 flex items-center justify-center"
						aria-label={
							currentView === "day"
								? "Giorno precedente"
								: "Settimana precedente"
						}
					>
						<ArrowLeftIcon className="w-4 h-4" />
					</button>
					<h2 className="text-xs md:text-lg font-semibold flex-shrink-0 text-center">
						{headerTitle()}
					</h2>
					<button
						type="button"
						onClick={() => navigateDate("next")}
						className="cursor-pointer p-1 hover:bg-gray-100 rounded-md w-6 h-6 md:w-8 md:h-8 flex items-center justify-center"
						aria-label={
							currentView === "day"
								? "Giorno successivo"
								: "Settimana successiva"
						}
					>
						<ArrowRightIcon className="w-4 h-4" />
					</button>
				</div>
				<div className="flex flex-row items-center gap-1 md:gap-2 ml-2">
					{["week", "day"].map((view) => (
						<button
							type="button"
							key={view}
							onClick={() => setCurrentView(view)}
							className={`cursor-pointer px-2 md:px-4 py-1 md:py-2 text-xs md:text-base rounded-md ${
								currentView === view
									? "bg-black text-white"
									: "hover:bg-gray-100"
							}`}
						>
							{view === "day" ? "Giorno" : "Settimana"}
						</button>
					))}
				</div>
			</div>

			<div className="px-1 md:px-0">
				<ScrollArea className="h-[350px] md:h-[500px] overflow-auto rounded-lg border border-gray-200">
					<div className="bg-white w-full">
						{currentView === "week" ? (
							<WeekView currentDate={currentDate} events={mockEvents} />
						) : (
							<DayView currentDate={currentDate} events={mockEvents} />
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default Calendar;
