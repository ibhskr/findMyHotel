import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import altHotelImg from "../assets/altHotelImg.avif";
import RoomCard from "./RoomCard";
import Loader2 from "../loader/Loader2";

const HotelDetails = () => {
  const { id: hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/gethotel/${hotelId}`);
        setHotelDetails(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [hotelId]);

  if (loading) {
    return <Loader2 />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl font-semibold">
          Error fetching hotel details: {error.message}
        </p>
      </div>
    );
  }

  const hotel = hotelDetails;

  return (
    <div className="m-4">
      {/* Hotel Header */}
      <div className="flex flex-col sm:flex-row sm:justify-center bg-white rounded-md overflow-hidden">
        {/* Display Hotel Image */}
        <div className="w-full sm:w-2/3 md:w-1/3 ">
          <img
            className="w-full h-44 sm:h-60 object-cover border"
            src={hotel?.hotelImage || altHotelImg}
            alt={hotel?.hotelname || "Hotel Image"}
          />
        </div>
        {/* Display Hotel Details */}
        <div className="px-6 py-4 w-full sm:w-1/2">
          <h1 className="font-bold text-2xl sm:text-4xl mb-2 text-indigo-600">
            {hotel?.hotelname || "Hotel Name"}
          </h1>
          <p className="text-gray-700 text-base">
            {hotel?.description || "No description available."}
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>Room Type:</strong> {hotel?.roomType || "N/A"}
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>Address:</strong>{" "}
            {`${hotel?.address || ""}, ${hotel?.city || ""}, ${
              hotel?.state || ""
            }, ${hotel?.zip || ""}`}
          </p>
        </div>
      </div>

      {/* Rooms Section */}
      <h2 className="mt-10 text-gray-800 text-2xl font-bold">Rooms We Offer</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {hotel?.rooms?.length > 0 ? (
          hotel.rooms.map((room, index) => <RoomCard key={index} room={room} />)
        ) : (
          <p className="text-gray-600 text-lg">
            No rooms available at this hotel.
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
