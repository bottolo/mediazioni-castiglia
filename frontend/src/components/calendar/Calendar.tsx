import React, { useState } from "react";

// Date utilities
const getDaysInMonth = (year: number, month: number) =>
	new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) =>
	new Date(year, month, 1).getDay();
const isSameDay = (date1: Date, date2: Date) =>
	date1.getDate() === date2.getDate() &&
	date1.getMonth() === date2.getMonth() &&
	date1.getFullYear() === date2.getFullYear();

const getWeekDays = (date: Date) => {
	const sunday = new Date(date);
	sunday.setDate(date.getDate() - date.getDay());
	return Array.from({ length: 7 }, (_, i) => {
		const day = new Date(sunday);
		day.setDate(sunday.getDate() + i);
		return day;
	});
};

const mockEvents = [
	{
		id: "1",
		summary: "Client Meeting",
		description: "Discussion about mortgage options",
		start: { dateTime: "2025-02-23T10:00:00" },
		end: { dateTime: "2025-02-23T11:00:00" },
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
];

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

const ViewSelector = ({ currentView, onViewChange }) => (
	<div className="flex gap-2 mb-4">
		{["day", "week", "month"].map((view) => (
			<button
				type={"button"}
				key={view}
				onClick={() => onViewChange(view)}
				className={`px-4 py-2 rounded-lg ${
					currentView === view
						? "bg-blue-600 text-white"
						: "bg-gray-100 hover:bg-gray-200"
				}`}
			>
				{view === "day" ? "Giorno" : view === "week" ? "Settimana" : "Mese"}
			</button>
		))}
	</div>
);

const MonthView = ({ currentDate, events }) => {
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysInMonth = getDaysInMonth(year, month);
	const firstDayOfMonth = getFirstDayOfMonth(year, month);
	const today = new Date();

	const days = Array.from({ length: 42 }, (_, i) => {
		const dayNumber = i - firstDayOfMonth + 1;
		const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
		const date = new Date(year, month, dayNumber);

		return {
			dayNumber,
			isCurrentMonth,
			date,
			events: events.filter((event) =>
				isSameDay(new Date(event.start.dateTime), date),
			),
		};
	});

	return (
		<div className="grid grid-cols-7 gap-1">
			{DAYS.map((day) => (
				<div key={day} className="p-2 text-center font-semibold">
					{day}
				</div>
			))}
			{days.map((day, index) => (
				<div
					key={index}
					className={`min-h-24 p-2 border ${
						!day.isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"
					} ${
						isSameDay(day.date, today) ? "border-blue-600" : "border-gray-200"
					}`}
				>
					<div className="font-semibold mb-1">
						{day.isCurrentMonth ? day.dayNumber : ""}
					</div>
					<div className="space-y-1">
						{day.events.map(
							(event: {
								id: React.Key | null | undefined;
								color: string;
								start: { dateTime: string | number | Date };
								summary: any;
							}) => (
								<div
									key={event.id}
									className="text-xs p-1 rounded truncate"
									style={{
										backgroundColor: `${event.color}20`,
										color: event.color,
									}}
								>
									{`${new Date(event.start.dateTime).getHours()}:${String(new Date(event.start.dateTime).getMinutes()).padStart(2, "0")} ${event.summary}`}
								</div>
							),
						)}
					</div>
				</div>
			))}
		</div>
	);
};

const WeekView = ({ currentDate, events }) => {
	const weekDays = getWeekDays(currentDate);
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const today = new Date();

	return (
		<div className="grid grid-cols-8 gap-1">
			<div className="p-2" />
			{weekDays.map((day) => (
				<div key={day.toString()} className="p-2 text-center font-semibold">
					<div>{DAYS[day.getDay()]}</div>
					<div className={isSameDay(day, today) ? "text-blue-600" : ""}>
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
						const dayEvents = events.filter(
							(event: { start: { dateTime: string | number | Date } }) => {
								const eventDate = new Date(event.start.dateTime);
								return (
									isSameDay(eventDate, day) && eventDate.getHours() === hour
								);
							},
						);

						return (
							<div key={day.toString()} className="border min-h-16 relative">
								{dayEvents.map(
									(event: {
										id: React.Key | null | undefined;
										color: any;
										start: { dateTime: string | number | Date };
										summary:
											| string
											| number
											| boolean
											| React.ReactElement<
													any,
													string | React.JSXElementConstructor<any>
											  >
											| Iterable<React.ReactNode>
											| React.ReactPortal
											| null
											| undefined;
									}) => (
										<div
											key={event.id}
											className="absolute w-full p-1 text-xs rounded"
											style={{
												backgroundColor: `${event.color}20`,
												color: event.color,
												top: `${new Date(event.start.dateTime).getMinutes()}%`,
											}}
										>
											{event.summary}
										</div>
									),
								)}
							</div>
						);
					})}
				</React.Fragment>
			))}
		</div>
	);
};

const DayView = ({ currentDate, events }) => {
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const dayEvents = events.filter(
		(event: { start: { dateTime: string | number | Date } }) =>
			isSameDay(new Date(event.start.dateTime), currentDate),
	);

	return (
		<div className="flex flex-col divide-y">
			{hours.map((hour) => (
				<div key={hour} className="flex min-h-16">
					<div className="w-16 py-2 text-right pr-4 text-sm text-gray-500">
						{`${String(hour).padStart(2, "0")}:00`}
					</div>
					<div className="flex-1 border-l relative">
						{dayEvents
							.filter(
								(event: { start: { dateTime: string | number | Date } }) =>
									new Date(event.start.dateTime).getHours() === hour,
							)
							.map(
								(event: {
									id: React.Key | null | undefined;
									color: string;
									start: { dateTime: string | number | Date };
									summary:
										| string
										| number
										| boolean
										| React.ReactElement<
												any,
												string | React.JSXElementConstructor<any>
										  >
										| Iterable<React.ReactNode>
										| React.ReactPortal
										| null
										| undefined;
									end: { dateTime: string | number | Date };
								}) => (
									<div
										key={event.id}
										className="absolute w-full p-2 rounded-lg"
										style={{
											backgroundColor: `${event.color}20`,
											color: event.color,
											top: `${new Date(event.start.dateTime).getMinutes()}%`,
										}}
									>
										<div className="font-semibold">{event.summary}</div>
										<div className="text-sm">
											{`${new Date(event.start.dateTime).getHours()}:${String(new Date(event.start.dateTime).getMinutes()).padStart(2, "0")} - 
                    ${new Date(event.end.dateTime).getHours()}:${String(new Date(event.end.dateTime).getMinutes()).padStart(2, "0")}`}
										</div>
									</div>
								),
							)}
					</div>
				</div>
			))}
		</div>
	);
};

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [currentView, setCurrentView] = useState("month");

	const navigateDate = (direction: string) => {
		const newDate = new Date(currentDate);
		if (currentView === "month") {
			newDate.setMonth(
				currentDate.getMonth() + (direction === "next" ? 1 : -1),
			);
		} else if (currentView === "week") {
			newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
		} else {
			newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
		}
		setCurrentDate(newDate);
	};

	return (
		<div className="w-full max-w-6xl mx-auto py-2">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center gap-4">
					<button
						onClick={() => navigateDate("prev")}
						className="p-2 hover:bg-gray-100 rounded-full"
					>
						←
					</button>
					<h2 className="text-xl font-semibold">
						{`${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
					</h2>
					<button
						onClick={() => navigateDate("next")}
						className="p-2 hover:bg-gray-100 rounded-full"
					>
						→
					</button>
				</div>
				<ViewSelector currentView={currentView} onViewChange={setCurrentView} />
			</div>

			<div className="bg-white rounded-lg shadow overflow-x-auto">
				{currentView === "month" && (
					<MonthView currentDate={currentDate} events={mockEvents} />
				)}
				{currentView === "week" && (
					<WeekView currentDate={currentDate} events={mockEvents} />
				)}
				{currentView === "day" && (
					<DayView currentDate={currentDate} events={mockEvents} />
				)}
			</div>
		</div>
	);
};

export default Calendar;
