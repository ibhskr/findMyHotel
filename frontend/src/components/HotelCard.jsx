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
    <div
      className="w-52  bg-gray-200 rounded-xl p-2 m-2 hover:cursor-pointer hover:border-blue-600 border hover:bg-blue-100 shadow-lg "
      onClick={() => navigate(`/hotel/${hotelId}`)}
    >
      <div>
        <img
          src={hotel?.hotelImage || altHotelImg}
          alt=""
          className="rounded-xl"
        />
      </div>
      <div className="h-40 overflow-y-scroll">
        <p className="font-bold hover:text-blue-600 ">{hotel?.hotelname}</p>
        <p className="text-gray-700 text-sm">{hotel?.description}</p>
        <p className="text-sm">{hotel?.address}</p>
        <div className="">
          {hotel.amenities.map((amenity, index) => (
            <span
              key={index}
              className="inline-block  rounded-full  py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
