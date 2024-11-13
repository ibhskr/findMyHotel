import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function HotelForm() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        `http://localhost:8000/add-new-hotel/${userId}`,
        data
      );
      // console.log("res from backed" + res.data);
      toast.success(res.data.message);
      navigate("/business/select-your-hotel");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Hotel</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hotel Name
            </label>
            <input
              type="text"
              {...register("hotelname", { required: "Hotel name is required" })}
              placeholder="Hotel Name"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.hotelname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.hotelname.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Address"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              placeholder="City"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              {...register("state", { required: "State is required" })}
              placeholder="State"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              {...register("country", { required: "Country is required" })}
              placeholder="Country"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PIN Code
            </label>
            <input
              type="number"
              {...register("pin", { required: "PIN code is required" })}
              placeholder="PIN Code"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.pin && (
              <p className="text-red-500 text-sm mt-1">{errors.pin.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CONTACT NUMBER
            </label>
            <input
              type="number"
              {...register("phone", { required: "Contact number is required" })}
              placeholder="Contact number"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
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
              Rating
            </label>
            <input
              type="number"
              {...register("rating", { min: 0, max: 5 })}
              placeholder="Rating (0-5)"
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

export default HotelForm;
