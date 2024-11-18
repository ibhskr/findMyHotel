import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    hotelname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pin: { type: Number, required: true },
    phone: { type: Number, required: true },
    description: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    amenities: [String],
    hotelImage: {
      type: String,
    },

    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
