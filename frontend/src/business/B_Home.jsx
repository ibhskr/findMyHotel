import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function B_Home() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const [listedHotel, setListedHotel] = useState([]);

  useEffect(() => {
    const getMyHotel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getmyhotels/${userId}`
        );
        setListedHotel(response.data.listedHotel);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    if (userId) {
      getMyHotel();
    }
  }, [userId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Select Your Hotel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listedHotel.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
            onClick={() => navigate(`/business/dashboard/${hotel._id}`)}
          >
            <h2 className="text-xl font-semibold text-indigo-700">{hotel.hotelname}</h2>
            <p className="text-gray-600">{hotel.description}</p>
          </div>
        ))}
        <div
          onClick={() => navigate(`/business/add-hotel`)}
          className="flex justify-center items-center bg-indigo-400 text-white text-lg font-semibold rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:bg-indigo-500"
        >
          <div className="text-center">
            <p className="text-4xl">+</p>
            <p className="mt-2">Add Hotel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default B_Home;
