import React from "react";
import { useNavigate } from "react-router-dom";
function BookingSuccessful() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Booking successfully placed! 🎉
        </h1>
        <p className="text-gray-700 mb-6">
          "Your booking has been successfully placed. Shortly, you will receive
          a status update about your booking. We look forward to seeing you
          soon!"
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")} // Redirect to home or any page
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => navigate("/user")} // Redirect to booking history
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            View Booking History
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessful;
