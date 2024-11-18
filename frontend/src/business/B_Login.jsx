import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBusinessId } from "../redux/slice";

function B_Login() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, [signUp, reset]);

  const onSubmit = async (data) => {
    try {
      const endpoint = signUp ? "/api/business-signup" : "/api/business-login";
      const res = await axios.post(endpoint, data);

      const userId = res.data.user?._id;
      dispatch(setBusinessId(userId));

      if (!userId) {
        setSignUp(!signUp);
      }

      if (res.data.success && userId) {
        toast.success(res.data.message);
        navigate("select-your-hotel");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {signUp ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Create New Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization Name
                </label>
                <input
                  type="text"
                  {...register("orgname", {
                    required: "Organization name is required",
                  })}
                  placeholder="Organization Name"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
                {errors.orgname && (
                  <p className="text-red-600 text-sm">
                    {errors.orgname.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="Email"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  placeholder="Phone Number"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm">{errors.phone.message}</p>
                )}
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
                {errors.password && (
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="submit"
                  value="Create Account"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full cursor-pointer"
                />
                <p
                  onClick={() => setSignUp(false)}
                  className="text-sm text-blue-800 hover:cursor-pointer mt-2"
                >
                  Already have an account? Login
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
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="Email"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
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
                {errors.password && (
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="submit"
                  value="Login"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full cursor-pointer"
                />
                <p
                  onClick={() => setSignUp(true)}
                  className="text-sm text-blue-800 hover:cursor-pointer mt-2"
                >
                  Create an account
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
