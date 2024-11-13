import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";

function Login() {
  const [otp, setOtp] = useState("");
  const [showOTPpage, setShowOTPpage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setShowOTPpage(true);
  };

  return (
    <div className="absolute right-0 border-gray-600  shadow-2xl">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Passwordless Login
        </h2>

        {showOTPpage === false ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("MobileNumber", {
                required: true,
                minLength: 10,
                maxLength: 10,
              })}
              type="tel"
              placeholder="Enter Your 10 Digit Mobile Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.MobileNumber && (
              <span className="text-red-500 text-sm">
                Please enter a valid 10-digit mobile number.
              </span>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Get OTP
            </button>
          </form>
        ) : (
          <div className="">
            <div className="flex justify-center items-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span className="mx-2">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{ width: "3.5rem", height: "3.5rem" }} // Enforced width and height (Tailwind's `w-14 h-14`)
                    className="border border-indigo-600 rounded-md text-center"
                  />
                )}
              />
            </div>

            <button
              className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              onClick={() => alert("OTP Submitted!")}
            >
              Submit OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
