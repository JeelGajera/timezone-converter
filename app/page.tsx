"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TimeZone from '@/components/TimeZone';

type City = {
  cityName: string;
  timezone: string;
}

export default function Home() {

  const [date, setDate] = useState(new Date());
  const [dateTime, setDateTime] = useState(new Date().getTime());
  const [minute, setMinute] = useState(new Date().getHours() * 60 + new Date().getMinutes());
  const [city, setCity] = useState<City[]>([]);

  const handleDate = (date: Date) => {
    setDateTime(new Date(date).getTime());
  }

  const handleMinuteChange = (minute: number) => {
    setMinute(minute);
  }

  const handleSearchInput = (cityName: string, timezone: string) => {
    setCity([...city, { cityName, timezone }]);
  };

  useEffect(() => {
    handleMinuteChange(minute);
  }, [dateTime, minute]);

  // when new city is added, should update the ui with the new city
  useEffect(() => {
    console.log(city);
  }, [city]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header date={date} handleDate={handleDate} handleSearchInput={handleSearchInput} />
      {
        city.map((item, index) => (
          <TimeZone key={index} cityName={item.cityName} timeZone={item.timezone} timeStamp={dateTime} minuteChange={handleMinuteChange} />
        ))
      }
    </div>
  );
}