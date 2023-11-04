"use client";

import React, { useState} from 'react'
import { Datepicker } from 'flowbite-react';
import { Calendar, Repeat, Link, Moon } from 'react-feather';
import { GetTimeInTimeZone } from "@/services/GetTime";


type Props = {
    handleDate: (date: Date) => void;
    date: Date;
}

const Header = (props: Props) => {

    const IconsComp = ({ children }: { children: React.ReactNode }) => {
        return (
            <div className='w-10 h-10 bg-teal-500 rounded-full p-2 bg-opacity-50 backdrop-blur-md cursor-pointer'>
                {children}
            </div>
        );
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }

    const [selectedDate, setSelectedDate] = useState(props.date);

    return (
        <div className='w-4/5 m-4 flex flex-col sm:flex-row justify-between items-center gap-5'>
            {/* search box */}
            <div className='w-4/5'>
                <input type="text" placeholder='Search' className='w-full bg-transparent border-gray-400' onChange={handleSearch} />
            </div>
            {/* date & icon */}
            <div className='w-full flex justify-between items-center gap-2'>
                <div><Datepicker autoHide={true} onSelectedDateChanged={props.handleDate} defaultDate={props.date}/></div>
                <div className='flex gap-2'>
                    <IconsComp><Calendar /></IconsComp>
                    <IconsComp><Repeat className='rotate-90' /></IconsComp>
                    <IconsComp><Link /></IconsComp>
                    <IconsComp><Moon /></IconsComp>
                </div>
            </div>
        </div>
    )
}

export default Header;