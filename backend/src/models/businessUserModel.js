import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    orgname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },

    listedHotel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],
    listedRoom: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

const businessUser = mongoose.model("businessUser", userSchema);

export default businessUser;
