import React from "react";
import altHotelImg from "../assets/altHotelImg.avif";
import { useNavigate, useParams } from "react-router-dom";

//
//
//
function HotelCard({ hotel }) {
  
  const navigate = useNavigate();
  const hotelId = hotel._id;
  return (
    <div className="max-w-sm m-4 rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        // src=
        src={hotel?.image || altHotelImg}
        alt={hotel?.hotelname}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{hotel?.hotelname}</div>
        <p className="text-gray-700 text-base">{hotel?.description}</p>
        <p className="text-gray-600 text-sm mt-2">
          Room Type: {hotel.roomType}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Address: {hotel.address}, {hotel.city}, {hotel.state}, {hotel.zip}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {hotel.amenities.map((amenity, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{amenity}
          </span>
        ))}
      </div>
      <div className="px-6 py-4  flex items-center justify-between">
        <span className="text-gray-700 font-semibold text-lg">
          ${hotel.price} / night
        </span>
        <button
          onClick={() => navigate(`/hotel/${hotelId}`)}
          className=" bg-red-400 text-white px-4 py-2 rounded-lg border  hover:bg-transparent hover:text-red-500 hover:border hover:border-red-600 "
        >
          check availability
        </button>
      </div>
    </div>
  );
}

export default HotelCard;
