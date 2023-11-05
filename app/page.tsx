"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TimeZone from '@/components/TimeZone';
import { toast } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRouter } from 'next/navigation';

type City = {
  cityName: string;
  timezone: string;
}

export default function Home() {
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [timeStamp, setTimeStamp] = useState(new Date().getTime());
  const [city, setCity] = useState<City[]>([]);

  const handleTimeStamp = (timestamp: number) => {
    setTimeStamp(timestamp);
  }

  const handleDate = (date: Date) => {
    setTimeStamp(new Date(date).getTime());
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
  }, [city, timeStamp]);

  useEffect(() => {

    // get cityArray param from url using URL
    const url = new URL(window.location.href);
    const cityArray = url.searchParams.get('cityArray');

    if (cityArray) {
      const decodedCityArray = JSON.parse(decodeURIComponent(cityArray as string));
      setCity(decodedCityArray);
    }
    // clean url
    router.push('/');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Header
        date={date}
        city={city}
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
                timeStamp={timeStamp}
                removeCity={handleRemoveCity}
                index={index}
                moveTimeZone={moveTimeZone}
                chnageTimeStamp={handleTimeStamp}
              />
            ))
          }
        </div>
      </DndProvider>
    </div>
  );
}