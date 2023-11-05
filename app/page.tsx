"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TimeZone from '@/components/TimeZone';
import { toast } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ItemTypes } from '@/components/constant';

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
    toast.success(`${cityName} is added`);
  };

  const handleRemoveCity = (cityName: string) => {
    setCity(city.filter((city) => city.cityName !== cityName));
    toast.error(`${cityName} is removed`);
  };

  const moveTimeZone = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= city.length) {
      return;
    }

    const updatedCity = [...city];
    const [movedItem] = updatedCity.splice(fromIndex, 1);
    updatedCity.splice(toIndex, 0, movedItem);

    setCity(updatedCity);
  };

  const reverseCityList = () => {
    const reversedCity = [...city].reverse();
    setCity(reversedCity);
  };

  useEffect(() => {
    handleMinuteChange(minute);
  }, [dateTime, minute]);

  useEffect(() => {
    console.log(city);
  }, [city]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Header
        date={date}
        handleDate={handleDate}
        handleSearchInput={handleSearchInput}
        reverseOrder={reverseCityList}
      />
      <DndProvider backend={HTML5Backend}>
        <div className='w-4/5 jutify-center'>
          {
            city.map((item, index) => (
              <TimeZone
                key={index}
                cityName={item.cityName}
                timeZone={item.timezone}
                timeStamp={dateTime}
                minuteChange={handleMinuteChange}
                removeCity={handleRemoveCity}
                index={index}
                moveTimeZone={moveTimeZone}
              />
            ))
          }
        </div>
      </DndProvider>
    </div>
  );
}