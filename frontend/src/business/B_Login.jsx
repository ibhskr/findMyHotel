import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/slice";
//---
function B_Login() {
  const navigate = useNavigate();
  const [singUp, setSingUp] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, [singUp, reset]);
  const onSubmit = async (data) => {
    try {
      let res;
      if (singUp) {
        // signup
        res = await axios.post("http://localhost:8000/business-signup", data);
      } else {
        // signin
        res = await axios.post("http://localhost:8000/business-login", data);
      }
      console.log(res.data);
      const userId = res.data.user?._id;
      dispatch(setUserId(userId));

      if (!userId) {
        setSingUp(!singUp);
      }
      if (res.data.success == true && userId) {
        toast.success(res.data.message);
        // navigate(`dashboard/${userId}`);
        navigate("select-your-hotel");
      }
    } catch (error) {
      // Check if the error has a response (server-side error)
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        // The request was made but no response was received (network error)
        toast.error("No response from server. Please try again later.");
      } else {
        // Something else happened while setting up the request
        toast.error("An unexpected error occurred.");
      }
    }
  };

  // name: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // phone: { type: String, required:true },

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {singUp ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Create New Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization name
                </label>
                <input
                  type="text"
                  {...register("orgname", {
                    required: "Organization name Id is required",
                  })}
                  placeholder="Organization name"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Id
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Hotel Id is required" })}
                  placeholder="Email Id"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone no.
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: "Hotel Id is required" })}
                  placeholder="Phone no."
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="submit"
                  value="Create Account"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full cursor-pointer"
                />
                <p
                  onClick={() => setSingUp(!singUp)}
                  className=" text-sm text-blue-800 hover:cursor-pointer"
                >
                  Already have account ? Login
                </p>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Id
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Hotel Id is required" })}
                  placeholder="Email Id"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="submit"
                  value="Login"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full cursor-pointer"
                />
                <p
                  onClick={() => setSingUp(!singUp)}
                  className=" text-sm text-blue-800 hover:cursor-pointer"
                >
                  create account
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default B_Login;
