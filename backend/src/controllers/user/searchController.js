import Hotel from "../../models/hotelModel.js";

export const search = async (req, res) => {
  try {
    // Extract the 'city' query parameter from the URL
    const { city } = req.query;

    // Check if 'city' is provided in the query
    if (!city) {
      return res.status(400).json({ message: "City is required for search" });
    }

    // Query the database for hotels that match the city
    const hotels = await Hotel.find({ city }).populate("rooms");

    // If no hotels match, send a 404 response
    if (hotels.length === 0) {
      return res
        .status(204)
        .json({ message: "No hotels found in the specified city" });
    }

    // Send the matching hotels as a JSON response
    return res.status(200).json(hotels);
  } catch (error) {
    console.error("Error during hotel search:", error);
    return res
      .status(500)
      .json({ message: "Unable to fetch data", error: error.message });
  }
};
