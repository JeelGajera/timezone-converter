"use client";

import React, { useEffect } from 'react'
import TimeRangeSlider from './TimeRangeSlider';
import { Star, XCircle } from 'react-feather';
import { DateTime } from "luxon";
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './constant';


type TimeZoneProps = {
  timeZone: string,
  timeStamp: number,
  cityName: string,
  removeCity: (cityName: string) => void,
  index: number,
  moveTimeZone: (dragIndex: number, hoverIndex: number) => void,
  chnageTimeStamp: (timestamp: number) => void,
  saveToLocal: (cityName: string, cityZone: string) => void,}

const TimeZone: React.FC<TimeZoneProps> = ({ timeStamp, timeZone, cityName, removeCity, index, moveTimeZone, chnageTimeStamp, saveToLocal }) => {

  const [, ref] = useDrag({
    type: ItemTypes.TIMEZONE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TIMEZONE,
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveTimeZone(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const dateTimeObj = DateTime.fromMillis(timeStamp);
  const timeZoneDateObj = dateTimeObj.setZone(timeZone);

  const currentMinutes = timeZoneDateObj.hour * 60 + timeZoneDateObj.minute;

  // GMT formated timezone
  const currentTimeZone = timeZoneDateObj.toFormat('ZZZZ');

  const locationZone = timeZoneDateObj.zoneName;

  const currentDate = timeZoneDateObj.toFormat('cccc, dd LLLL yyyy');

  const [selectedMinutes, setSelectedMinutes] = React.useState(currentMinutes);
  const [selectedTime, setSelectedTime] = React.useState('');

  const handleSelectedMinutesChange = (e: { target: { value: string; }; }) => {
    setSelectedMinutes(parseInt(e.target.value));
    // get timestamp from current minutes
    const timeStamp = new Date().setHours(0, parseInt(e.target.value), 0, 0);
    chnageTimeStamp(timeStamp);
    console.log(timeStamp);
  }

  const selectedHours = Math.floor(selectedMinutes / 60);
  const remainingMinutes = selectedMinutes % 60;

  const formatTime = (hours: number, minutes: number) => {
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleInputTimeChange = (e: { target: { value: any; }; }) => {
    const time = e.target.value;
    const [hours, minutes] = time.split(':').map((t: string) => parseInt(t, 10));

    if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      setSelectedMinutes(hours * 60 + minutes);
    }
  };

  useEffect(() => {
    setSelectedTime(formatTime(selectedHours, remainingMinutes));
  }, [selectedMinutes, timeStamp]);

  useEffect(() => {
    setSelectedMinutes(currentMinutes);
  }, [timeStamp]);

  return (
    <>
      <div className='p-4 mt-4 mb-8 border-r border-t border-blue-600 dark:border-teal-500 rounded-md shadow-zinc-400 dark:shadow-slate-600 shadow-md relative bg-transparent'>
        <div className='absolute -right-2 -top-3 text-red-500 bg-inherit cursor-pointer'
          onClick={() => removeCity(cityName)}
        >
          <XCircle />
        </div>
        <div className='absolute -left-2 -top-3 text-yellow-500 bg-inherit cursor-pointer'
          onClick={() => saveToLocal(cityName, timeZoneDateObj.toFormat('ZZZZ'))}
        >
          <Star />
        </div>
        <div
          ref={(node) => ref(drop(node))} style={{ cursor: 'grab' }}
          className='flex justify-between gap-1 items-center p-2'>
          <div className='flex flex-col'>
            <h1 className='text-lg text-black dark:text-white sm:text-2xl'>{cityName}</h1>
            <h4 className='text-sm text-black dark:text-gray-500'>{locationZone}</h4>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="HH:mm"
              value={formatTime(selectedHours, remainingMinutes)}
              onChange={handleInputTimeChange}
              className="w-32 sm:w-auto text-center text-lg text-black dark:text-white mb-2 p-2 border bg-transparent border-black dark:border-gray-300 rounded-lg"
            />
            <div className='flex justify-between items-center'>
              {/* time zone and date */}
              <h1 className='text-sm text-gray-500 pr-4'>{currentDate}</h1>
              <h4 className='text-sm text-gray-500'>{currentTimeZone}</h4>
            </div>
          </div>
        </div>
        <div className='p-2 z-10'>
          <TimeRangeSlider handleMinutesChange={handleSelectedMinutesChange} time={selectedMinutes} chnageTimeStamp={chnageTimeStamp}/>
        </div>
      </div>
    </>
  )
}

export default TimeZone;