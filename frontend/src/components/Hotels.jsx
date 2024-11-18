import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import axios from "axios";
import LinearIndeterminate from "./ProgressBar";
function Hotels() {
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("/api/hotel");
        setHotel(res.data);
        // console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotels();
  }, []);

  //   console.log(rooms);

  return (
    <>
      {loading && (
        <div>
          <LinearIndeterminate />
        </div>
      )}
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold m-6">Hotels</h1>
        <div className="flex flex-wrap">
          {hotel.length > 0
            ? hotel.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
              ))
            : !loading && <p>no hotel available</p>}
        </div>
      </div>
    </>
  );
}

export default Hotels;
