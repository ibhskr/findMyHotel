import React from "react";

function BookingDetails({ booking }) {
  return (
    <div className="p-6 bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg w-80">
      <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
      <p><strong>Name:</strong> {booking.name}</p>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Guests:</strong> {booking.guests}</p>
      <p><strong>Number of Rooms:</strong> {booking.noOfRooms}</p>
      <p><strong>Phone Number:</strong> {booking.phoneNo}</p>
      <p><strong>WhatsApp Number:</strong> {booking.whatsappNo || 'N/A'}</p>
      <p><strong>Check-In Date:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
      <p><strong>Check-Out Date:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
      <p><strong>Price:</strong> ${booking.price}</p>
      <p><strong>Status:</strong> {booking.status}</p>
    </div>
  );
}

export default BookingDetails;
