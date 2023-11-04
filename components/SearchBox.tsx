import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Suggestion = {
  name: string;
  timezone: string;
};

type SearchBoxProps = {
//   onSuggestionSelect: (suggestion: Suggestion) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ }) => {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (userInput.trim() === '') {
          setSuggestions([]); // Clear suggestions if input is empty
          return;
        }

        // Fetch suggestions for both timezones and cities using Axios
        const response = await axios.get(`http://api.geonames.org/searchJSON?q=${userInput}&maxRows=10&username=${process.env.GEONAMES_USERNAME}`);

        const data = response.data;
        // Extract timezone and city suggestions from the API response
        const suggestionList = data.geonames.map((item: any) => ({
          name: item.name,
          timezone: item.timezoneId,
        }));
        setSuggestions(suggestionList);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [userInput]);

  return (
    <div className='relative w-full'>
      <input
        type='text'
        placeholder='Search for a city or timezone'
        className='w-full bg-transparent border-gray-400 p-2'
        onChange={handleSearch}
        value={userInput}
      />
      {suggestions.length > 0 && (
        <div className='suggestion-dropdown absolute top-10 left-0 right-0 bg-white border border-gray-300'>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => {
                // onSuggestionSelect(suggestion);
                setUserInput(''); // Clear the input field after selection
                setSuggestions([]); // Close the suggestion dropdown
              }}
              className='p-2 hover-bg-gray-100 cursor-pointer'
            >
              {suggestion.name} ({suggestion.timezone})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
