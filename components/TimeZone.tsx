"use client";

import React, { useEffect } from 'react'
import TimeRangeSlider from './TimeRangeSlider';
import { XCircle } from 'react-feather';
import { DateTime } from "luxon";


type Props = {
  timeZone: string, 
  timeStamp: number,
  minuteChange: (minutes: number) => void,
}

// parameters with date object
const TimeZone = (props: Props) => {

  const dateTimeObj = DateTime.fromMillis(props.timeStamp);
  const timeZoneDateObj = dateTimeObj.setZone(props.timeZone);

  const currentMinutes = timeZoneDateObj.hour * 60 + timeZoneDateObj.minute;

  // GMT formated timezone
  const currentTimeZone = timeZoneDateObj.toFormat('ZZZZ');

  const locationZone = timeZoneDateObj.zoneName;

  const currentDate = timeZoneDateObj.toFormat('cccc, dd LLLL yyyy');

  const [selectedMinutes, setSelectedMinutes] = React.useState(currentMinutes);
  const [selectedTime, setSelectedTime] = React.useState('');

  const handleSelectedMinutesChange = (e: { target: { value: string; }; }) => {
    props.minuteChange(parseInt(e.target.value));
    setSelectedMinutes(parseInt(e.target.value));
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
  }, [selectedMinutes]);


  return (
    <div className='w-4/5 p-4 mt-4 border-r border-t border-teal-500 rounded-md shadow-slate-600 shadow-md relative'>
      <div className='absolute -right-2 -top-3 text-red-500 bg-black cursor-pointer'><XCircle /></div>
      <div className='flex justify-between items-center p-2'>
        <div className='flex flex-col'>
          <h1 className='text-lg sm:text-2xl'>Ahmedabad</h1>
          <h4 className='text-sm text-gray-500'>{locationZone}</h4>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="HH:mm"
            value={formatTime(selectedHours, remainingMinutes)}
            onChange={handleInputTimeChange}
            className="w-32 sm:w-auto text-center text-lg mb-2 p-2 border bg-transparent border-gray-300 rounded-lg"
          />
          <div className='flex justify-between items-center'>
            {/* time zone and date */}
            <h1 className='text-sm text-gray-500 pr-4'>{currentDate}</h1>
            <h4 className='text-sm text-gray-500'>{currentTimeZone}</h4>
          </div>
        </div>
      </div>
      <div className='p-2'>
        <TimeRangeSlider handleMinutesChange={handleSelectedMinutesChange} time={selectedMinutes} minuteChange={props.minuteChange}/>
      </div>
    </div>
  )
}

export default TimeZone;