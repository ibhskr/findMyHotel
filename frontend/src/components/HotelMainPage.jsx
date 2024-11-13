import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Outlet } from "react-router-dom";
import altHotelImg from "../assets/altHotelImg.avif";
import RoomCard from "./RoomCard";

const HotelDetails = () => {
  const hotelId = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hotel = hotelDetails;
  // console.log(hotel);
  // const rooms = hotelDetails.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/gethotel/${hotelId.id}`
        );
        setHotelDetails(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching hotel details: {error.message}</div>;
  }
  // console.log(hotelDetails);
  return (
    <div className="m-4">
      
      <div className="flex flex-col sm:flex-row sm:justify-center">
        {/* display image */}
        <div className="">
          <img
            className="w-full h-44 sm:h-60 object-cover"
            // src=
            src={hotel?.image || altHotelImg}
            alt={hotel?.hotelname}
          />
        </div>
        {/* display hotel details */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl  sm:text-4xl mb-2">
            {hotel?.hotelname}
          </div>
          <p className="text-gray-700 text-base">{hotel?.description}</p>
          <p className="text-gray-600 text-sm mt-2">
            Room Type: {hotel.roomType}
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Address: {hotel.address}, {hotel.city}, {hotel.state}, {hotel.zip}
          </p>
        </div>
      </div>
      <h1 className=" ml-10 mt-10  text-gray-600 text-3xl font-bold">Rooms we offer</h1>


      {/* <RoomCard /> */}
      <div className="flex flex-wrap p-4">
        {hotel ? (
          hotel?.rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
