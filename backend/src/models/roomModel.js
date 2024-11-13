import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    // Hotel reference
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    // Number of rooms available
    noOfRoom: { type: Number, required: true, default: 0 },
    // Room type, e.g., Single, Double, Suite
    type: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    amenities: [String],
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
