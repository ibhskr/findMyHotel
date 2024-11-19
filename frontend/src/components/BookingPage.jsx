import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import altRoomImg from "../assets/room.avif";
import Loader2 from "../loader/Loader2";
function BookingPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/get-one-room/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const onSubmit = async (data) => {
    const finalData = { ...data, room };
    try {
      console.log(finalData);
      await axios.post("/api/booking-my-hotel", finalData);
      alert("Booking successful!");
      navigate("successful", { replace: true }); // Use relative path
    } catch (error) {
      console.error("Error booking room:", error);
      alert("Booking failed. Please try again.");
    }
  };
  if (loading) return <Loader2 />;
  if (!room) return <p>Room is not found.</p>;

  const { hotel } = room;
  const address = `${hotel?.address}, ${hotel?.city}, ${hotel?.state}, ${hotel?.pin}`;
  // console.log(room);
  return (
    <div className="w-auto">
      <h1 className="text-center text-2xl font-bold">Book a Room</h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
        <div className="border shadow-xl p-4 m-6 rounded max-w-96 sm:min-w-60 ">
          <img
            src={hotel?.hotelImage || altRoomImg}
            alt=""
            className="rounded-xl object-cover "
          />

          <div className="space-y-1 p-2">
            <p className="font-bold">Hotel Name: {hotel?.hotelname}</p>
            <p>Room Type: {room?.type}</p>
            <p>Price: {room?.price} Rupee/Room</p>
            <p>Address: {address}</p>
            <p className="text-sm">{hotel?.description}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border shadow-xl p-6 m-6 rounded w-full sm:max-w-fit max-w-96  "
        >
          <div className="flex flex-col sm:flex-row">
            {/* Name */}
            <div className="flex flex-col m-2">
              <label htmlFor="name" className="text-gray-600 text-sm">
                Full Name:
              </label>
              <input
                id="name"
                type="text"
                className="border outline outline-1 outline-gray-400 p-1 text-sm rounded "
                {...register("name", { required: "This field is required." })}
              />
              {errors.name && (
                <p className="text-xs text-red-600">*{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col m-2">
              <label htmlFor="email" className="text-gray-600 text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border outline outline-1 outline-gray-400 p-1 text-sm rounded"
                {...register("email", { required: "This field is required." })}
              />
              {errors.email && (
                <p className="text-xs text-red-600">*{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className=" flex flex-col sm:flex-row">
            {/* Phone No */}
            <div className="flex flex-col m-2">
              <label htmlFor="phoneNo" className="text-gray-600 text-sm">
                Contact No.
              </label>
              <input
                id="phoneNo"
                type="tel"
                className="border outline outline-1 outline-gray-400 p-1 text-sm rounded"
                {...register("phoneNo", {
                  required: "This field is required.",
                  minLength: { value: 10, message: "min 10 digit required" },
                  maxLength: { value: 10, message: "max 10 digit required" },
                })}
              />
              {errors.phoneNo && (
                <p className="text-xs text-red-600">
                  *{errors.phoneNo.message}
                </p>
              )}
            </div>

            {/* No of Guests */}
            <div className="flex flex-col m-2">
              <label htmlFor="guests" className="text-gray-600 text-sm">
                No of Guests
              </label>
              <input
                id="guests"
                type="number"
                className="border outline outline-1 outline-gray-400 p-1 text-sm rounded"
                {...register("guests", {
                  required: "This field is required.",
                  min: {
                    value: 1,
                    message: "minimum 1 people required ",
                  },
                })}
              />
              {errors.guests && (
                <p className="text-xs text-red-600">*{errors.guests.message}</p>
              )}
            </div>
          </div>
          <div className=" flex flex-col sm:flex-row">
            {/* WhatsApp No */}
            <div className="flex flex-col m-2">
              <label htmlFor="whatsappNo" className="text-gray-600 text-sm">
                WhatsApp No.
              </label>
              <input
                id="whatsappNo"
                type="tel"
                className="border outline outline-1 outline-gray-400 p-1 text-sm rounded"
                {...register("whatsappNo", { minLength: 10, maxLength: 10 })}
              />
              {errors.whatsappNo && (
                <p className="text-xs text-red-600">
                  *{errors.whatsappNo.message}
                </p>
              )}
            </div>

            {/* No of Rooms */}
            <div className="flex flex-col m-2">
              <label htmlFor="noRooms" className="text-gray-600 text-sm">
                No of Rooms
              </label>
              <input
                id="noRooms"
                type="number"
                className="border outline outline-1 outline-gray-400 p-1 text-sm rounded"
                {...register("noRooms", {
                  required: "This field is required.",
                  min: 1,
                  max: {
                    value: 5,
                    message: "maximum limit 5",
                  },
                })}
              />
              {errors.noRooms && (
                <p className="text-xs text-red-600">
                  *{errors.noRooms.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full">
            {/* Check-In */}
            <div className="flex flex-col m-2 sm:w-1/2 ">
              <label htmlFor="checkIn" className="text-gray-600 text-sm">
                Check-In Date
              </label>
              <input
                id="checkIn"
                type="date"
                className="border outline outline-1 outline-gray-400 p-1 text-sm rounded"
                {...register("checkIn", {
                  required: "This field is required.",
                })}
              />
              {errors.checkIn && (
                <p className="text-xs text-red-600">
                  *{errors.checkIn.message}
                </p>
              )}
            </div>

            {/* Check-Out */}
            <div className="flex flex-col m-2 sm:w-1/2">
              <label htmlFor="checkOut" className="text-gray-600 text-sm">
                Check-Out Date
              </label>
              <input
                id="checkOut"
                type="date"
                className="border outline outline-1 outline-gray-400 p-1 text-sm rounded"
                {...register("checkOut", {
                  required: "This field is required.",
                })}
              />
              {errors.checkOut && (
                <p className="text-xs text-red-600">
                  *{errors.checkOut.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col m-2">
            <button
              type="submit"
              className="border outline outline-1 outline-gray-400 p-1 text-sm rounded hover:bg-gray-600 hover:text-white"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
