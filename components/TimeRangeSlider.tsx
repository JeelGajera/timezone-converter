"use client";

import React, { useEffect, useState } from 'react';

type TimeRangeSliderProps = {
  time: number;
  handleMinutesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  chnageTimeStamp: (timestamp: number) => void;
};

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({ time, handleMinutesChange, chnageTimeStamp}) => {
  const [selectedMinutes, setSelectedMinutes] = useState(time);

  const ChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleMinutesChange(e);
    setSelectedMinutes(parseInt(e.target.value));
    // get timestamp from current minutes
    const timeStamp = new Date().setHours(0, parseInt(e.target.value), 0, 0);
    chnageTimeStamp(timeStamp);
  }

  useEffect(() => {
    setSelectedMinutes(time);
  }, [selectedMinutes, time]);

  return (
    <div className="w-full m-2 p-2  mx-auto relative flex flex-col justify-center items-center">
      <input
        type="range"
        min={0}
        max={24 * 60}
        step={15}
        value={selectedMinutes}
        onChange={ChangeTime}
        className="w-full"
      />
    </div>
  );
};

export default TimeRangeSlider;