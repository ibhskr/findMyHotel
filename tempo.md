import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function BookingPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/get-one-room/${id}`
        );
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };

    fetchRoom();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // await axios.post("http://localhost:8000/bookroom", data);
      alert("Booking successful!");
    } catch (error) {
      console.error("Error booking room:", error);
      alert("Booking failed. Please try again.");
    }
  };

  if (!room) return <p>Loading...</p>;

  const { hotel } = room;
  const address = `${hotel?.address}, ${hotel?.city}, ${hotel?.state}, ${hotel?.pin}`;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Book a Room
      </h1>
      
      <div className="mb-4 border  max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">Hotel Name: {hotel?.hotelname}</p>
        <p className="text-md text-gray-600">Room Type: {room?.type}</p>
        <p className="text-md text-gray-600">Price: {room?.price}</p>
        <p className="text-md text-gray-600">Address: {address}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Name */}
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "This field is required." })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "This field is required." })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        {/* Phone no */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNo"
          >
            Contact No.
          </label>
          <input
            id="phoneNo"
            type="tel"
            {...register("phoneNo", { required: "This field is required." })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-xs italic">
              {errors.phoneNo.message}
            </p>
          )}
        </div>
        {/* no of Guests */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="guests"
          >
            No of Guests
          </label>
          <input
            id="guests"
            type="number"
            {...register("guests", { required: "This field is required." })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.guests && (
            <p className="text-red-500 text-xs italic">
              {errors.guests.message}
            </p>
          )}
        </div>
        {/* Check in */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="checkIn"
          >
            Check-In Date
          </label>
          <input
            id="checkIn"
            type="date"
            {...register("checkIn", { required: "This field is required." })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.checkIn && (
            <p className="text-red-500 text-xs italic">
              {errors.checkIn.message}
            </p>
          )}
        </div>
        {/* Check out */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="checkOut"
          >
            Check-Out Date
          </label>
          <input
            id="checkOut"
            type="date"
            {...register("checkOut", { required: "This field is required." })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.checkOut && (
            <p className="text-red-500 text-xs italic">
              {errors.checkOut.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingPage;
