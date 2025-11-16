import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  // Calculate min date (80 years ago) and max date (yesterday)
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const minYear = today.getFullYear() - 80;
  const maxYear = yesterday.getFullYear();

  // Parse the selectedDate to get initial values
  const [year, setYear] = useState<number>(() => {
    const date = new Date(selectedDate);
    return date.getFullYear();
  });
  const [month, setMonth] = useState<number>(() => {
    const date = new Date(selectedDate);
    return date.getMonth();
  });
  const [day, setDay] = useState<number>(() => {
    const date = new Date(selectedDate);
    return date.getDate();
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate years array from minYear to maxYear
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);

  // Get number of days in the selected month/year
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Update parent when any value changes
  useEffect(() => {
    // Ensure day is valid for the selected month
    const maxDays = getDaysInMonth(year, month);
    const validDay = day > maxDays ? maxDays : day;

    const date = new Date(year, month, validDay);
    const formattedDate = date.toISOString().split('T')[0];
    onDateChange(formattedDate);
  }, [year, month, day, onDateChange]);

  // Adjust day if it exceeds the days in the selected month
  useEffect(() => {
    const maxDays = getDaysInMonth(year, month);
    if (day > maxDays) {
      setDay(maxDays);
    }
  }, [year, month, day]);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow only numeric input
    if (inputValue === '' || /^\d+$/.test(inputValue)) {
      const value = parseInt(inputValue);
      if (!isNaN(value)) {
        // Clamp the value between 1 and daysInMonth
        const clampedValue = Math.max(1, Math.min(daysInMonth, value));
        setDay(clampedValue);
      } else if (inputValue === '') {
        setDay(1);
      }
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow only numeric input
    if (inputValue === '' || /^\d+$/.test(inputValue)) {
      const value = parseInt(inputValue);
      if (!isNaN(value)) {
        // Clamp the value between minYear and maxYear
        const clampedValue = Math.max(minYear, Math.min(maxYear, value));
        setYear(clampedValue);
      } else if (inputValue === '') {
        setYear(maxYear);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-[2fr,1fr,1.5fr] gap-3">
        {/* Month Selector */}
        <div className="relative">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full px-3 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-800 bg-white cursor-pointer appearance-none"
          >
            {months.map((monthName, index) => (
              <option key={index} value={index}>
                {monthName}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Day Input */}
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={day}
            onChange={handleDayChange}
            className="w-full px-3 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-800 bg-white"
            placeholder="Day"
          />
        </div>

        {/* Year Input */}
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={year}
            onChange={handleYearChange}
            className="w-full px-3 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-800 bg-white"
            placeholder="Year"
          />
        </div>
      </div>

      {/* Selected date display */}
      <div className="mt-3 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 text-sm text-blue-800">
          <FontAwesomeIcon icon={faCalendar} className="text-blue-500" />
          <span className="font-medium">
            {new Date(year, month, day).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
