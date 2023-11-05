"use client";

import React, { useEffect, useState } from 'react';

type TimeRangeSliderProps = {
  time: number;
  handleMinutesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minuteChange: (minutes: number) => void;
};

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({ time, handleMinutesChange, minuteChange }) => {
  const [selectedMinutes, setSelectedMinutes] = useState(time);

  const ChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleMinutesChange(e);
    setSelectedMinutes(parseInt(e.target.value));
    minuteChange(parseInt(e.target.value));
  }

  useEffect(() => {
    setSelectedMinutes(time);
  }, [selectedMinutes, time]);

  return (
    <div className="w-full mx-auto relative flex flex-col justify-center items-center">
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