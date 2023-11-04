"use client";

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import TimeZone from '@/components/TimeZone'

export default function Home() {

  const [date, setDate] = useState(new Date());
  const [dateTime, setDateTime] = useState(new Date().getTime());
  const [minute, setMinute] = useState(new Date().getHours() * 60 + new Date().getMinutes());

  const handleDate = (date: Date) => {
    setDateTime(new Date(date).getTime());
  }

  const handleMinuteChange = (minute: number) => {
    setMinute(minute);
  }

  useEffect(() => {
    handleMinuteChange;
  }, [dateTime, minute]);

  return (
    < div className="min-h-screen flex flex-col items-center justify-center" >
      <Header date={date} handleDate={handleDate} />
      <TimeZone timeZone={"Asia/Kolkata"} timeStamp={dateTime} minuteChange={handleMinuteChange} />
      <TimeZone timeZone={"America/New_York"} timeStamp={dateTime} minuteChange={handleMinuteChange} />
    </div >
  )
}
