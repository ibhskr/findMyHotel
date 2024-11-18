import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
function UploadHotelPicture({ hotelId, setUploadPhoto }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("myfile", data.myfile[0]); // Attach the file

    try {
      setLoading(true);
      const res = await axios.post(`/api/${hotelId}/hotel-picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading hotel picture:", error);
      toast.error("Internal server error");
    } finally {
      setLoading(false);
      setUploadPhoto(false); // Close upload modal or form
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 py-10 w-full sm:w-1/2 bg-white p-4 rounded shadow-md">
      <div className=" w-full flex justify-end">
        <IoMdClose onClick={() => setUploadPhoto(false)} />
      </div>
      <p className="text-lg font-medium text-gray-700 mb-4">
        Upload Image for Hotel ID:{" "}
        <span className="text-indigo-500">{hotelId}</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <label
            htmlFor="hotelPicture"
            className="block text-sm font-medium text-gray-700"
          >
            Select Image
          </label>
          <input
            type="file"
            id="hotelPicture"
            {...register("myfile", { required: "Image is required" })}
            className="block w-full mt-1 p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.myfile && (
            <span className="text-red-500 text-sm">
              {errors.myfile.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white font-semibold rounded ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default UploadHotelPicture;
