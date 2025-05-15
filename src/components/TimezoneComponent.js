import React, { useState, useEffect, useCallback } from 'react';
import { getTimezones, getSelectedTime } from './TimezoneService';

const TimezoneComponent = () => {
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');
  const [localTime, setLocalTime] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Wrap in useCallback so it's stable and can be a dependency
  const updateSelectedTime = useCallback(async () => {
    try {
      const response = await getSelectedTime(selectedTimezone);
      setSelectedTime(response.selectedTime);
    } catch (error) {
      console.error('Error fetching selected time:', error);
    }
  }, [selectedTimezone]);

  const updateLocalTime = () => {
    const now = new Date();
    setLocalTime(now.toLocaleString());
  };

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const zones = await getTimezones();
        setTimezones(zones);
      } catch (error) {
        console.error('Error fetching timezones:', error);
      }
    };

    fetchTimezones();

    const interval = setInterval(() => {
      updateLocalTime();
      updateSelectedTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateSelectedTime]); // ✅ Only include the stable version

  return (
    <div>
      <h2>Real-Time Timezone Converter</h2>
      <div>
        <label htmlFor="timezone">Select Timezone:</label>
        <select
          id="timezone"
          value={selectedTimezone}
          onChange={(e) => setSelectedTimezone(e.target.value)}
        >
          {timezones.map((timezone) => (
            <option key={timezone} value={timezone}>
              {timezone}
            </option>
          ))}
        </select>
      </div>
      <p>
        <strong>Local Time:</strong> {localTime}
      </p>
      <p>
        <strong>Selected Timezone Time:</strong> {selectedTime}
      </p>
    </div>
  );
};

export default TimezoneComponent;
