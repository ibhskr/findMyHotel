import React, { useState } from "react";
import { PiUserLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { RiCloseLargeFill } from "react-icons/ri";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import HotelCard from "./HotelCard";
import Loader2 from "../loader/Loader2";
function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAuthenticated = user.isAuthenticated;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle search form submission
  const onSubmit = async (data) => {
    navigate(`/search/${data.city}`);
  };

  // Handle login button click
  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between border-2 p-4">
        {/* Logo */}
        <div>
          <h1
            onClick={() => navigate("/")}
            className="hover:cursor-pointer font-bold sm:text-xl"
          >
            FindMyHotel
          </h1>
        </div>

        {/* Search Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="h-8">
            <input
              type="text"
              {...register("city", { required: true })}
              className="border h-full outline-none border-gray-600 px-2"
              placeholder="Enter city"
            />
            <button
              type="submit"
              className="bg-green-400 h-full border border-gray-600 px-2 text-white"
            >
              Search
            </button>
          </form>
          {errors.city && (
            <span className="text-red-500">City is required</span>
          )}{" "}
          {/* Display error if city is missing */}
        </div>

        {/* User Section */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <button
              onClick={() => navigate("/user")}
              className="flex items-center border-2 border-gray-600 px-4 py-2 rounded hover:cursor-pointer"
            >
              <PiUserLight size={24} />
              <span className="ml-2">Welcome, User!</span>
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="border-2 border-gray-600 px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {/* Show Login Form if showLogin is true */}
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </>
  );
}

export default Header;
