import { cn } from "@/utils/cn.ts";
import _ from "lodash";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React, { memo, useCallback, useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/Button.tsx";
import type { CalendarEvent } from "@backend/routes/types/calendar.ts";
import { DateUtils } from "@/lib/date-utils";

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

const stripedPatternStyle = {
	backgroundImage:
		"repeating-linear-gradient(135deg, transparent 0px, transparent 2px, #CBCBCB 2px, #CBCBCB 4px)",
	backgroundColor: "rgba(240, 240, 240, 0.8)",
};

interface EnhancedEvent extends Partial<CalendarEvent> {
	id: string;
	summary: string;
	start: { dateTime: string; timeZone?: string };
	end: { dateTime: string; timeZone?: string };
	color: string;
	backgroundColor: string;
	isFirstOfDay: boolean;
}

const enhanceEvents = (events: CalendarEvent[]): EnhancedEvent[] => {
	const eventsByDay = _.groupBy(events, (event) => {
		const date = new Date(event.start.dateTime);
		return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
	});

	const enhancedEvents: EnhancedEvent[] = [];

	_.map(eventsByDay, (dayEvents) => {
		const sortedEvents = _.sortBy(dayEvents, (event) =>
			new Date(event.start.dateTime).getTime(),
		);

		sortedEvents.map((event, index) => {
			enhancedEvents.push({
				...event,
				summary: event.summary || "",
				color: "var(--text-calendar-occupied-event)",
				backgroundColor: "var(--bg-calendar-occupied-event)",
				isFirstOfDay: index === 0,
			});
		});
	});

	return enhancedEvents;
};

interface ViewSelectorProps {
	currentView: string;
	onViewChange: (view: string) => void;
}

const ViewSelector = memo(
	({ currentView, onViewChange }: ViewSelectorProps) => {
		return (
			<div className="flex flex-row items-center gap-1 md:gap-2 ml-2">
				{["week", "day"].map((view) => (
					<Button
						type="button"
						key={view}
						onClick={() => onViewChange(view)}
						inactive={currentView !== view}
					>
						{view === "day" ? "Giorno" : "Settimana"}
					</Button>
				))}
			</div>
		);
	},
);

interface ViewProps {
	currentDate: Date;
	events: EnhancedEvent[];
}

const DISPLAY_HOURS = _.range(8, 22);

const WeekView: React.FC<ViewProps> = ({ currentDate, events }) => {
	const weekDays = DateUtils.getWeekDays(currentDate);
	const today = new Date();

	return (
		<div className="relative">
			<div className="grid grid-cols-8 border-b border-gray-300 sticky top-0 z-10 bg-white">
				<div className="p-1 md:p-2 border-r border-gray-300" />

				{weekDays.map((day, dayIndex) => (
					<div
						key={day.toString()}
						className={cn(
							"p-1 md:p-2 text-center ",
							DateUtils.isSameDay(day, today) && "bg-[#F4F9FF]",
							dayIndex < weekDays.length - 1 ? "border-r border-gray-300" : "",
						)}
					>
						<p className="text-xs md:text-sm font-extralight md:font-light mb-1 md:mb-2">
							<span className="md:hidden">
								{DAYS[day.getDay()].substring(0, 1)}
							</span>
							<span className="hidden md:inline">{DAYS[day.getDay()]}</span>
						</p>

						<div className="h-7 flex items-center justify-center ">
							<p
								className={cn(
									"text-md md:text-[22px] font-light flex items-center justify-center",
									DateUtils.isSameDay(day, today) &&
										"rounded-full h-7 w-7 md:h-[40px] md:w-[40px] bg-[var(--bg-calendar-current-day)] text-white font-[500] md:ml-0.5",
								)}
							>
								{day.getDate()}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-8">
				{DISPLAY_HOURS.map((hour, hourIndex) => (
					<React.Fragment key={hour}>
						<div
							className={cn(
								"text-right text-gray-500 bg-white border-r border-gray-300",
								"text-xs md:text-sm pr-1 pt-1 md:py-1 md:px-2",
								hourIndex < DISPLAY_HOURS.length - 1
									? "border-b border-gray-300"
									: "",
							)}
						>
							{hour < 10 && "0"}
							{`${hour}:00`}
						</div>

						{weekDays.map((day, dayIndex) => {
							const dayEvents = events.filter((event) => {
								const eventDate = new Date(event.start.dateTime);
								return (
									DateUtils.isSameDay(eventDate, day) &&
									eventDate.getHours() === hour
								);
							});

							return (
								<div
									key={day.toString()}
									className={cn(
										"relative",
										"min-h-9 md:min-h-13",
										DateUtils.isSameDay(day, today) && "bg-[#F4F9FF]",
										dayIndex < weekDays.length - 1
											? "border-r border-gray-300"
											: "",
										hourIndex < DISPLAY_HOURS.length - 1
											? "border-b border-gray-300"
											: "",
									)}
								>
									{dayEvents.map((event) => {
										const style = DateUtils.calculateEventStyle(event);
										return (
											<div
												key={event.id}
												className="absolute w-full overflow-hidden min-h-6 md:min-h-12 z-[50]"
												style={{
													...stripedPatternStyle,
													color: event.color,
													top: style.top,
													height: style.height,
													backdropFilter: "blur(0)",
												}}
											>
												<div className="p-1 md:p-2">
													<p className="text-xs truncate">
														{DateUtils.formatTime(
															new Date(event.start.dateTime),
														)}{" "}
														-{" "}
														{DateUtils.formatTime(new Date(event.end.dateTime))}
													</p>
												</div>
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
};

const DayView: React.FC<ViewProps> = ({ currentDate, events }) => {
	const dayEvents = _.filter(events, (event) =>
		DateUtils.isSameDay(new Date(event.start.dateTime), currentDate),
	);
	const today = new Date();
	const isToday = DateUtils.isSameDay(currentDate, today);

	return (
		<>
			<div className="text-center py-3 bg-white border-b border-gray-300 sticky top-0 z-10">
				<div
					className={cn(
						"font-light md:text-[20px]",
						isToday ? "text-[var(--bg-calendar-current-day)]" : "",
					)}
				>
					{DAYS_FULL[currentDate.getDay()]} {currentDate.getDate()}{" "}
					{MONTHS[currentDate.getMonth()]}
				</div>
			</div>
			<div className="flex flex-col">
				{DISPLAY_HOURS.map((hour, hourIndex) => (
					<div
						key={hour}
						className={cn(
							"flex min-h-9 md:min-h-13",
							hourIndex < DISPLAY_HOURS.length - 1
								? "border-b border-gray-300"
								: "",
						)}
					>
						<div className="w-14 md:w-32 py-1 text-right pr-1 md:pr-2 text-xs md:text-sm text-gray-500 border-r border-gray-300">
							<span>
								{hour < 10 && "0"}
								{`${hour}:00`}
							</span>
						</div>
						<div className="flex-1 relative">
							{_.chain(dayEvents)
								.filter(
									(event) => new Date(event.start.dateTime).getHours() === hour,
								)
								.map((event) => {
									const style = DateUtils.calculateEventStyle(event);
									return (
										<div
											key={event.id}
											className="absolute w-full p-1 md:p-2 z-[50]"
											style={{
												...stripedPatternStyle,
												color: event.color,
												top: style.top,
												height: style.height,
												overflow: "hidden",
												backdropFilter: "blur(0)",
											}}
										>
											<p className="text-xs truncate">
												{`${DateUtils.formatTime(new Date(event.start.dateTime))}`}{" "}
												- {DateUtils.formatTime(new Date(event.end.dateTime))}
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

interface CalendarProps {
	events?: CalendarEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ events = [] }) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [currentView, setCurrentView] = useState("week");

	const enhancedEvents = enhanceEvents(events);
	const today = new Date();

	const canNavigatePrev = useMemo(() => {
		if (currentView === "day") {
			return !DateUtils.isSameDay(currentDate, today) && currentDate > today;
		}
		const weekDays = DateUtils.getWeekDays(currentDate);
		const firstDayOfWeek = weekDays[0];

		return firstDayOfWeek > today;
	}, [currentDate, currentView]);

	const navigateDate = (direction: "next" | "prev") => {
		if (direction === "prev" && !canNavigatePrev) {
			return;
		}

		const newDate = new Date(currentDate);
		const offset = direction === "next" ? 1 : -1;

		if (currentView === "week") {
			newDate.setDate(currentDate.getDate() + 7 * offset);
		} else {
			newDate.setDate(currentDate.getDate() + offset);
		}

		setCurrentDate(newDate);
	};

	const headerTitle = () => {
		return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
	};

	const handleViewChange = useCallback(
		(view: string) => {
			setCurrentView(view);

			if (
				view === "day" &&
				currentDate < today &&
				!DateUtils.isSameDay(currentDate, today)
			) {
				setCurrentDate(new Date());
			}
		},
		[currentDate],
	);

	return (
		<div className="w-full mx-auto">
			<div className="flex flex-row justify-between items-center mb-4 px-4 md:px-0">
				<div className="flex flex-row items-center justify-between gap-1 w-32 md:w-64">
					<button
						type="button"
						onClick={() => navigateDate("prev")}
						disabled={!canNavigatePrev}
						className={cn(
							"p-1 rounded-md w-6 h-6 md:w-8 md:h-8 flex items-center justify-center",
							canNavigatePrev
								? "cursor-pointer hover:bg-gray-100"
								: "cursor-not-allowed opacity-40",
						)}
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

				<ViewSelector
					currentView={currentView}
					onViewChange={handleViewChange}
				/>
			</div>

			<div className="px-4 md:px-0">
				<ScrollArea className="h-full overflow-auto rounded-lg border border-gray-300">
					<div className="bg-white w-full">
						{currentView === "week" ? (
							<WeekView currentDate={currentDate} events={enhancedEvents} />
						) : (
							<DayView currentDate={currentDate} events={enhancedEvents} />
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default Calendar;
