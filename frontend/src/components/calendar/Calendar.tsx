import { cn } from "@/utils/cn.ts";
import _ from "lodash";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";

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

const mockEvents = [
	{
		id: "1",
		summary: "Client Meeting",
		description: "Discussion about mortgage options",
		start: { dateTime: "2025-02-23T10:00:00" },
		end: { dateTime: "2025-02-23T15:00:00" },
		color: "#4285f4",
	},
	{
		id: "2",
		summary: "Loan Review",
		description: "Annual review of loan portfolio",
		start: { dateTime: "2025-02-24T14:00:00" },
		end: { dateTime: "2025-02-24T15:30:00" },
		color: "#34a853",
	},
	{
		id: "3",
		summary: "Loan Review",
		description: "Annual review of loan portfolio",
		start: { dateTime: "2025-02-24T15:00:00" },
		end: { dateTime: "2025-02-24T16:30:00" },
		color: "#34a853",
	},
	{
		id: "4",
		summary: "Loan Review",
		description: "Annual review of loan portfolio",
		start: { dateTime: "2025-02-24T16:00:00" },
		end: { dateTime: "2025-02-24T17:30:00" },
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

const WeekView: React.FC<ViewProps> = ({ currentDate, events }) => {
	const weekDays = DateUtils.getWeekDays(currentDate);
	const hours = _.range(24);
	const today = new Date();

	const MobileWeekView = () => (
		<div className="md:hidden grid grid-cols-8 divide-y divide-x divide-gray-300">
			<div className="p-1" />
			{weekDays.map((day) => (
				<div key={day.toString()} className="p-1 text-center">
					<p className="lg font-semibold">
						{DAYS[day.getDay()].substring(0, 1)}
					</p>
					<p
						className={cn(
							"sm",
							DateUtils.isSameDay(day, today) ? "text-blue-600" : "",
						)}
					>
						{day.getDate()}
					</p>
				</div>
			))}
			{hours.map((hour) => (
				<React.Fragment key={hour}>
					<p className="sm pr-2 pt-1 text-right  text-gray-500 sticky left-0 bg-white">
						{`${String(hour).padStart(2, "0")}:00`}
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
							<div key={day.toString()} className="min-h-16 relative">
								{dayEvents.map((event) => {
									const style = DateUtils.calculateEventStyle(event);
									return (
										<div
											key={event.id}
											className="absolute w-full px-1 overflow-hidden rounded-md"
											style={{
												backgroundColor: `${event.color}20`,
												color: event.color,
												top: style.top,
												height: style.height,
											}}
										>
											<p className="truncate font-medium">{event.summary}</p>
											<p className="sm truncate">
												{DateUtils.formatTime(new Date(event.start.dateTime))} -
												{DateUtils.formatTime(new Date(event.end.dateTime))}
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
	);

	const DesktopWeekView = () => (
		<div className="hidden md:grid md:grid-cols-8 divide-x divide-y divide-gray-300">
			<div className="p-2" />
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

			{hours.map((hour) => (
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
											className="absolute w-full p-1 text-xs rounded-md"
											style={{
												backgroundColor: `${event.color}20`,
												color: event.color,
												top: style.top,
												height: style.height,
												overflow: "hidden",
											}}
										>
											<p className="font-medium truncate">{event.summary}</p>
											<p className="sm truncate">
												{DateUtils.formatTime(new Date(event.start.dateTime))} -
												{DateUtils.formatTime(new Date(event.end.dateTime))}
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
	);

	return (
		<>
			<MobileWeekView />
			<DesktopWeekView />
		</>
	);
};

const DayView: React.FC<ViewProps> = ({ currentDate, events }) => {
	const hours = _.range(24);
	const dayEvents = _.filter(events, (event) =>
		DateUtils.isSameDay(new Date(event.start.dateTime), currentDate),
	);

	return (
		<div className="flex flex-col divide-y divide-gray-300">
			{hours.map((hour) => (
				<div key={hour} className="flex min-h-14 md:min-h-16">
					<div className="w-12 md:w-16 py-2 text-right pr-2 md:pr-4 text-xs md:text-sm text-gray-500">
						{`${String(hour).padStart(2, "0")}:00`}
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
										<h4 className="font-semibold truncate">{event.summary}</h4>
										<p className="sm truncate">
											{`${DateUtils.formatTime(new Date(event.start.dateTime))} - 
                      ${DateUtils.formatTime(new Date(event.end.dateTime))}`}
										</p>
									</div>
								);
							})
							.value()}
					</div>
				</div>
			))}
		</div>
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

	return (
		<div className="w-full max-w-6xl mx-auto py-2">
			<div className="flex flex-row justify-between items-center mb-4 gap-2">
				<div className="flex flex-row items-center justify-between gap-2 w-48 md:w-64">
					<button
						type="button"
						onClick={() => navigateDate("prev")}
						className="cursor-pointer p-2 hover:bg-[var(--bg-neutral-hover)] rounded-md w-8 h-8 flex items-center justify-center"
					>
						<ArrowLeftIcon />
					</button>
					<h2 className="text-sm md:text-xl font-semibold flex-shrink-0 text-center">
						{`${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
					</h2>
					<button
						type="button"
						onClick={() => navigateDate("next")}
						className="cursor-pointer p-2 hover:bg-[var(--bg-neutral-hover)] rounded-md w-8 h-8 flex items-center justify-center"
					>
						<ArrowRightIcon />
					</button>
				</div>
				<div className="flex flex-row items-center gap-1 md:gap-2 ">
					{["week", "day"].map((view) => (
						<button
							type="button"
							key={view}
							onClick={() => setCurrentView(view)}
							className={`cursor-pointer px-2 md:px-4 py-2 md:text-base rounded-md ${
								currentView === view
									? "bg-black text-white"
									: "hover:bg-[var(--bg-neutral-hover)]"
							}`}
						>
							{view === "day" ? "Giorno" : "Settimana"}
						</button>
					))}
				</div>{" "}
			</div>

			<div className="bg-white rounded-lg overflow-x-auto">
				{currentView === "week" ? (
					<WeekView currentDate={currentDate} events={mockEvents} />
				) : (
					<DayView currentDate={currentDate} events={mockEvents} />
				)}
			</div>
		</div>
	);
};

export default Calendar;
