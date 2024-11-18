import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: Number,
      required: true,
    },
    verifyCode: {
      type: Number,
      length: 4,
    },
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
