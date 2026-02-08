'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface AvailabilityCalendarProps {
  bookedDates: Date[];
}

export default function AvailabilityCalendar({ bookedDates }: AvailabilityCalendarProps) {
  const [value, setValue] = useState(new Date());

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isBooked = bookedDates.some(bookedDate =>
        date.toDateString() === bookedDate.toDateString()
      );
      return isBooked ? 'booked' : null;
    }
    return null;
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-2">Disponibilité</h2>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={tileClassName}
        minDate={new Date()}
        view="month"
        showNavigation={true}
        showNeighboringMonth={false}
      />
      <style jsx>{`
        .react-calendar {
          width: 100%;
          max-width: 400px;
          background: white;
          border: 1px solid #a0a096;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.125em;
        }
        .react-calendar--doubleView {
          width: 700px;
        }
        .react-calendar--doubleView .react-calendar__viewContainer {
          display: flex;
          margin: -0.5em;
        }
        .react-calendar--doubleView .react-calendar__viewContainer > * {
          width: 50%;
          margin: 0.5em;
        }
        .react-calendar,
        .react-calendar *,
        .react-calendar *:before,
        .react-calendar *:after {
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .react-calendar button {
          margin: 0;
          border: 0;
          outline: none;
        }
        .react-calendar button:enabled:hover {
          cursor: pointer;
        }
        .react-calendar__navigation {
          display: flex;
          height: 44px;
          margin-bottom: 1em;
        }
        .react-calendar__navigation button {
          min-width: 44px;
          background: none;
          font-size: 16px;
          margin-top: 8px;
        }
        .react-calendar__navigation button:disabled {
          background-color: #f0f0f0;
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: #e6e6e6;
        }
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.75em;
        }
        .react-calendar__month-view__weekdays__weekday {
          padding: 0.5em;
        }
        .react-calendar__month-view__weekNumbers .react-calendar__tile {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75em;
          font-weight: bold;
        }
        .react-calendar__month-view__days__day--weekend {
          color: #d10000;
        }
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #757575;
        }
        .react-calendar__tile {
          max-width: 100%;
          padding: 0.75em 0.5em;
          background: none;
          text-align: center;
          line-height: 16px;
          font-size: 0.833em;
        }
        .react-calendar__tile:disabled {
          background-color: #f0f0f0;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #e6e6e6;
        }
        .react-calendar__tile--now {
          background: #ffff76;
        }
        .react-calendar__tile--now:enabled:hover,
        .react-calendar__tile--now:enabled:focus {
          background: #ffffa9;
        }
        .react-calendar__tile--hasActive {
          background: #76baff;
        }
        .react-calendar__tile--hasActive:enabled:hover,
        .react-calendar__tile--hasActive:enabled:focus {
          background: #a9d4ff;
        }
        .react-calendar__tile--active {
          background: #006edc;
          color: white;
        }
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: #1087ff;
        }
        .react-calendar__tile--booked {
          background: #ff6b6b;
          color: white;
        }
        .react-calendar__tile--booked:enabled:hover,
        .react-calendar__tile--booked:enabled:focus {
          background: #ff5252;
        }
        .booked {
          background-color: #ff6b6b !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}