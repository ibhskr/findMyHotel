import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/slice";

function Login({ setShowLogin }) {
  const [otp, setOtp] = useState("");
  const [showOTPpage, setShowOTPpage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For managing submit button state
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Used to set OTP value for react-hook-form
  } = useForm();

  // ----------- SUBMIT MOBILE NUMBER LOGIC ---------------
  const handleMobileSubmit = async (data) => {
    try {
      setIsSubmitting(true); // Start loading state
      const res = await axios.post("/api/user-login-code", {
        mobileNo: data.MobileNumber,
      });

      if (res.data.success) {
        console.log(res.data);
        toast.success("OTP sent successfully");
        setShowOTPpage(true);
      } else {
        toast.error("Failed to send OTP, try again.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error in sending OTP:", error);
    } finally {
      setIsSubmitting(false); // End loading state
    }
  };

  // ----------- SUBMIT VERIFICATION CODE LOGIC ---------------
  const handleOtpSubmit = async (data) => {
    try {
      setIsSubmitting(true); // Start loading state
      const res = await axios.post("/api/user-login", {
        mobileNo: data.MobileNumber,
        code: data.code,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setUserDetails(res.data.user); // Set user details upon successful OTP verification
        dispatch(setUserId(res.data.user._id));
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error in OTP submission:", error);
    } finally {
      setIsSubmitting(false); // End loading state
    }
  };

  const handleOtpChange = (otpCode) => {
    setOtp(otpCode);
    setValue("code", otpCode); // Sync OTP input value with react-hook-form
  };

  // ----------- UI LOGIC ---------------
  return (
    <div className="absolute right-0 border-gray-600 shadow-2xl w-80">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="w-full flex justify-end">
          <IoMdClose onClick={() => setShowLogin(false)} />
        </div>

        {/* If user details are available, display them */}
        {userDetails ? (
          <div className="user-details">
            <h3 className="text-xl font-semibold">User Details</h3>
            <p>
              <strong>Hello, </strong> {userDetails.mobileNo}
            </p>
            <button
              onClick={() => {
                navigate("/user");
                setShowLogin(false);
              }}
              className="border-2 border-dashed border-black p-2 mt-4 hover:border-solid hover:shadow-2xl"
            >
              Booking History
            </button>
          </div>
        ) : !showOTPpage ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Passwordless Login
            </h2>
            <form
              onSubmit={handleSubmit(handleMobileSubmit)}
              className="space-y-4"
            >
              <input
                {...register("MobileNumber", {
                  required: "Mobile number is required",
                  minLength: {
                    value: 10,
                    message: "Mobile number must be 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Mobile number must be 10 digits",
                  },
                })}
                type="tel"
                placeholder="Enter Your 10 Digit Mobile Number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.MobileNumber && (
                <span className="text-red-500 text-sm">
                  {errors.MobileNumber.message}
                </span>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                disabled={isSubmitting} // Disable submit button during submission
              >
                {isSubmitting ? "Sending OTP..." : "Get OTP"}
              </button>
            </form>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Passwordless Login
            </h2>
            <form onSubmit={handleSubmit(handleOtpSubmit)}>
              <div className="flex justify-center items-center">
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  numInputs={4}
                  renderSeparator={<span className="mx-2">-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{ width: "3.5rem", height: "3.5rem" }}
                      className="border border-indigo-600 rounded-md text-center"
                    />
                  )}
                />
              </div>

              <button
                className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                type="submit"
                disabled={isSubmitting} // Disable submit button during submission
              >
                {isSubmitting ? "Verifying OTP..." : "Submit OTP"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
