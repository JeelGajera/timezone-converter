import axios from "axios";

export const getTimezoneByCoordinates = async (
  latitude: number,
  longitude: number
) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TIMEZONEDB_API_KEY;
    const response = await axios.get(
      "http://api.timezonedb.com/v2.1/get-time-zone",
      {
        params: {
          key: apiKey,
          by: "position",
          lat: latitude,
          lng: longitude,
          format: "json", 
          fields: "zoneName", 
        },
      }
    );

    if (response.data && response.data.zoneName) {
      return response.data.zoneName;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting timezone:", error);
    return null;
  }
};
