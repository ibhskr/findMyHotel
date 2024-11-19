import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Don't forget to import axios
import Loader2 from "../loader/Loader2";
import HotelCard from "./HotelCard"; // Assuming HotelCard is the component used to display each hotel

function SearchResults() {
  const { search } = useParams(); // Extract city from URL params
  console.log(search);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // For error handling

  useEffect(() => {
    // console.log("first");
    const fetchHotels = async () => {
      setLoading(true); // Set loading to true when API call starts
      setError(""); // Reset error message

      try {
        // Make API request to search hotels by city
        const response = await axios.get("/api/search", {
          params: { city: search }, // Send the city as a query parameter
        });

        // Update state with the response data (hotels)
        setHotels(response.data);
      } catch (error) {
        setError("Error fetching hotels. Please try again.");
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false); // Set loading to false after response is received or an error occurs
      }
    };

    if (search) {
      fetchHotels(); // Fetch hotels only if city is defined
    }
  }, [search]); // Re-run the effect when city changes
  // console.log(hotels);
  return (
    <div>
      {/* Display Hotels List or Error */}
      {loading && <Loader2 />} {/* Show loading spinner while fetching data */}
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Show error message if any */}
      {/* Display search results */}
      {hotels.length > 0 ? (
        <div className="mt-4">
          <h2 className="font-bold">Hotels in {search}</h2>
          <div className="flex flex-wrap">
            {hotels.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        </div>
      ) : (
        <p>No hotels available in {search}</p>
      )}
    </div>
  );
}

export default SearchResults;
