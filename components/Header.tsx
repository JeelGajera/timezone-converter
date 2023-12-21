"use client";

import React, { useState, useEffect } from 'react'
import { Datepicker } from 'flowbite-react';
import { Calendar, Repeat, Link, Moon, Sun } from 'react-feather';
import SearchBox from './SearchBox';
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


type City = {
    cityName: string;
    timezone: string;
}

type Props = {
    handleDate: (date: Date) => void;
    date: Date;
    handleSearchInput: (cityName: string, timezone: string) => void;
    reverseOrder: () => void;
    city: City[]
}


const Header = (props: Props) => {
    const router = useRouter();
    

    const generateShareableLink = () => {
        const domain = window.location.origin;
        const cityArrayParam = encodeURIComponent(JSON.stringify(props.city));
        const link = `${domain}?cityArray=${cityArrayParam}`;
        navigator.clipboard.writeText(link);
        toast.success('Link copied to clipboard', {
            position: "bottom-right",
          });
    }

    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const IconsComp = ({ children }: { children: React.ReactNode }) => {
        return (
            <div className='w-10 h-10 bg-teal-500 rounded-full p-2 bg-opacity-50 backdrop-blur-md cursor-pointer'>
                {children}
            </div>
        );
    }

    return (
        <div className='w-4/5 m-4 flex flex-col sm:flex-row justify-between items-center gap-5'>
            {/* search box */}
            <div className='w-4/5'>
                <SearchBox onSuggestionSelect={props.handleSearchInput} />
            </div>
            {/* date & icon */}
            <div className='w-full flex justify-between items-center gap-2'>
                <div><Datepicker autoHide={true} onSelectedDateChanged={props.handleDate} defaultDate={props.date} /></div>
                <div className='flex gap-2'>
                    <IconsComp><Calendar /></IconsComp>
                    <div onClick={props.reverseOrder} >
                        <IconsComp><Repeat className='rotate-90' /></IconsComp>
                    </div>
                    <div onClick={generateShareableLink}>
                        <IconsComp><Link /></IconsComp>
                    </div>
                    <div
                        className='w-10 h-10 bg-teal-500 rounded-full p-2 bg-opacity-50 backdrop-blur-md cursor-pointer'
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    >
                        {theme === 'light' ? <Sun className='text-yellow-500' /> : <Moon />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;