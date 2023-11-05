"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, XCircle } from 'react-feather';
import { getTimezoneByCoordinates } from "@/services/GetTimzoneByLatLng";

type Suggestion = {
  name: string;
  timezone: string;
  countryCode: string,
  state: string,
  lat: number,
  lng: number,
};

type SearchBoxProps = {
  onSuggestionSelect: (cityName: string, timezone: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ onSuggestionSelect }) => {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSuggestionListVisible, setIsSuggestionListVisible] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
  };

  const toggleSuggestionList = () => {
    setIsSuggestionListVisible(!isSuggestionListVisible);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (userInput.trim() === '') {
          setSuggestions([]); // Clear suggestions if input is empty
          return;
        }
        const username = process.env.NEXT_PUBLIC_GEONAMES_USERNAME;
        // Fetch suggestions for both timezones and cities using Axios
        const response = await axios.get(`http://api.geonames.org/searchJSON?q=${userInput}&maxRows=5&username=${username}`);

        const data = response.data;
        // Extract timezone and city suggestions from the API response
        const suggestionList = data.geonames.map((item: any) => ({
          name: item.name,
          timezone: item.timezoneId,
          countryCode: item.countryCode,
          state: item.adminName1,
          lat: item.lat,
          lng: item.lng,
        }));
        setSuggestions(suggestionList);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [userInput]);

  return (
    <div className='relative w-full bg-inherit dark:bg-black'>
      <input
        type='text'
        placeholder='Search for a city or timezone'
        className='w-full bg-transparent border-gray-400 p-2'
        onChange={handleSearch}
        value={userInput}
      />
      <div>
        {
          userInput.length > 0 ?
            <XCircle className='absolute right-4 top-2 text-gray-400 cursor-pointer' onClick={() => setUserInput('')} /> :
            <List className='absolute right-4 top-2 text-gray-400 cursor-pointer' onClick={toggleSuggestionList} />
        }

      </div>
      {suggestions.length > 0 && (
        <div className='suggestion-dropdown z-10 absolute top-10 left-0 right-0 bg-gray-400 dark:bg-black border'>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={async () => {
                const timezone = await getTimezoneByCoordinates(suggestion.lat, suggestion.lng);
                onSuggestionSelect(suggestion.name, timezone);
                setUserInput(suggestion.name); // Clear the input field after selection
                setSuggestions([]); // Close the suggestion dropdown
              }}
              className='p-2 hover:bg-black hover:text-white dark:hover:bg-gray-700 cursor-pointer'
            >
              {suggestion.name} ,{suggestion.state} - ({suggestion.countryCode})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;