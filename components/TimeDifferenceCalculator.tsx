'use client';

import { useState, useEffect } from 'react';

interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
}

export default function TimeDifferenceCalculator() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [timeDifference, setTimeDifference] = useState<TimeDifference>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const calculateTimeDifference = () => {
    if (!selectedDate) return;

    const selectedDateTime = new Date(selectedDate);
    const now = new Date();

    // Calculate total difference in milliseconds
    const diffInMs = now.getTime() - selectedDateTime.getTime();

    // Calculate years
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
    const remainingMs = diffInMs % (1000 * 60 * 60 * 24 * 365.25);

    // Calculate months
    const months = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 30.44));
    const remainingMs2 = remainingMs % (1000 * 60 * 60 * 24 * 30.44);

    // Calculate days
    const days = Math.floor(remainingMs2 / (1000 * 60 * 60 * 24));
    const remainingMs3 = remainingMs2 % (1000 * 60 * 60 * 24);

    // Calculate hours
    const hours = Math.floor(remainingMs3 / (1000 * 60 * 60));
    const remainingMs4 = remainingMs3 % (1000 * 60 * 60);

    // Calculate minutes
    const minutes = Math.floor(remainingMs4 / (1000 * 60));

    setTimeDifference({ years, months, days, hours, minutes });
  };

  useEffect(() => {
    calculateTimeDifference();
    const interval = setInterval(calculateTimeDifference, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [selectedDate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Time Difference Calculator
      </h1>
      
      <div className="mb-6">
        <label htmlFor="date-input" className="block text-sm font-medium text-gray-700 mb-2">
          Select Date and Time
        </label>
        <input
          type="datetime-local"
          id="date-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {selectedDate && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Years</p>
              <p className="text-2xl font-bold text-blue-600">{timeDifference.years}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Months</p>
              <p className="text-2xl font-bold text-blue-600">{timeDifference.months}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Days</p>
              <p className="text-2xl font-bold text-blue-600">{timeDifference.days}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Hours</p>
              <p className="text-2xl font-bold text-blue-600">{timeDifference.hours}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg col-span-2">
              <p className="text-sm text-gray-600">Minutes</p>
              <p className="text-2xl font-bold text-blue-600">{timeDifference.minutes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 