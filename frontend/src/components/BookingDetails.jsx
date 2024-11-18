import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader2 from "../loader/Loader2";

function BookingDetails() {
  const { id } = useParams(); // Destructure id from the params
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/get-booking-details/${id}`);
        setDetails(response.data.data);
      } catch (error) {
        setError("Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]); // Add id to dependency array to refetch if it changes

  // if (loading) return <p className="text-center text-xl ">Loading...</p>;
  if (loading) return <Loader2 />;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;
  if (!details) return <p className="text-center text-xl">No data available</p>;

  return (
    <div className="max-w-4xl  mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border-2 ">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Booking Details
      </h2>

      <div className="mb-4">
        <p>
          <span className="font-bold">Booking ID:</span> {details._id}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p>
            <span className="font-bold">Guest Name:</span> {details.name}
          </p>
          <p>
            <span className="font-bold">Email:</span> {details.email}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {details.phoneNo}
          </p>
        </div>

        <div>
          <p>
            <span className="font-bold">Hotel Name:</span>{" "}
            {details.hotel.hotelname}
          </p>
          <p>
            <span className="font-bold">Location:</span> {details.hotel.city},{" "}
            {details.hotel.state}, {details.hotel.country}
          </p>
          <p>
            <span className="font-bold">Address:</span> {details.hotel.address}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p>
            <span className="font-bold">Check-in Date:</span>{" "}
            {new Date(details.checkInDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-bold">Check-out Date:</span>{" "}
            {new Date(details.checkOutDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-bold">Guests:</span> {details.guests}
          </p>
        </div>

        <div>
          <p>
            <span className="font-bold">Rooms Booked:</span> {details.noOfRooms}
          </p>
          <p>
            <span className="font-bold">Room Type:</span> {details.room.type}
          </p>
          <p>
            <span className="font-bold">Price:</span> ₹{details.price}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="bg-yellow-400 w-fit px-10">
          <span className="font-bold ">Status:</span> {details.status}
        </p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default BookingDetails;
