import React from 'react'
import { DateTime } from "luxon";
import axios from 'axios';

const GetTime = () => {
  return new Date().getTime();
}

export const GetTimeInTimeZone = async (timeZone: string) => {
  try {
    // Make a request to a time zone API (e.g., TimeZoneDB)
    const response = await axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.TIMEZONEDB_API_KEY}&format=json&by=zone&zone=${timeZone}`);

    // Extract the current time from the API response
    const apiTime = response.data.timestamp;

    // Convert the API time to a Luxon DateTime object with the provided time zone
    const luxonTime = DateTime.fromSeconds(apiTime, { zone: timeZone });
    console.log(luxonTime);
    return luxonTime;
  } catch (error) {
    console.error('Error fetching time:', error);
    return null;
  }
};
GetTimeInTimeZone.displayName = 'GetTimeInTimeZone';

export default GetTime;