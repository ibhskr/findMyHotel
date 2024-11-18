import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserId } from "../redux/slice";
import toast from "react-hot-toast";
import Loader2 from "../loader/Loader2";

//
// ---------- U S E R  F U N C T I O N --------------
//

function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //
  // ------------ LOGOUT FUNCTION ----------------
  //
  async function Logout() {
    try {
      // Call your backend logout API to clear the token on the server side
      const res = await axios.get("/api/user-logout");
      // console.log(res.data);
      if (res.data.success) {
        setIsAuthenticated(false);
        dispatch(clearUserId());
        toast.success(res.data.message);
        // console.log("trigger");
      }
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // ------------- useEffect for getting User details------
  // ------------- like- mobile number ,booking details, -------
  //
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/get-user");
        setUser(response.data.data);
      } catch (error) {
        setError("Failed to fetch user data");
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated]);

  if (loading) return <Loader2 />;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* User Info */}
      <div className="bg-blue-200 p-6 rounded-lg mb-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-blue-700">
            Hello, {user.mobileNo}
          </h1>
          <p className="text-sm text-gray-600">
            Joined At: {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <button
            onClick={Logout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Bookings Info */}
      <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

      <div className="space-y-6">
        {user.booking.map((booking) => (
          <div
            key={booking._id}
            onClick={() => navigate(`/booking-details/${booking._id}`)}
            className="bg-blue-100 p-4 rounded-md shadow-md border border-gray-200"
          >
            {/* Booking Details */}
            <h3 className="text-lg font-semibold mb-2 text-blue-600">
              Booking for {booking.name}
            </h3>
            <p>
              <span className="font-semibold">Booking Id: </span>
              {booking._id}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {booking.status}
            </p>
            <p>
              <span className="font-semibold">Hotel Name:</span>{" "}
              {booking.hotel.hotelname}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
