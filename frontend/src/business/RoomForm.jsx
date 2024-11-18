import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

//--
//--
function RoomForm() {
  const navigate = useNavigate();
  const { Id: hotelId } = useParams();
  console.log(hotelId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/add-room", data);
      console.log(res.data);
      if (res.data.success == true) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <button
        className=" absolute right-10 top-10 hover:bg-slate-300 p-3 rounded-full "
        onClick={() => navigate(-1)}
      >
        <IoMdClose size={"24px"} />
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Room Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            {/* <label className="block text-sm font-medium text-gray-700">
              Hotel ID
            </label> */}
            <input
              type="text"
              defaultValue={hotelId}
              {...register("hotel", { required: "Hotel ID is required" })}
              readOnly
              className="mt-1 p-2 hidden border border-gray-300 rounded w-full bg-gray-200"
            />
            {errors.hotel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.hotel.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Rooms
            </label>
            <input
              type="number"
              {...register("noOfRoom", {
                required: "Number of rooms is required",
              })}
              placeholder="Number of Rooms"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.noOfRoom && (
              <p className="text-red-500 text-sm mt-1">
                {errors.noOfRoom.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Type
            </label>
            <input
              type="text"
              {...register("type", { required: "Room type is required" })}
              placeholder="Room Type (e.g., Single, Double, Suite)"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              placeholder="Price"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amenities
            </label>
            <input
              type="text"
              {...register("amenities")}
              placeholder="Amenities (comma-separated)"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomForm;
