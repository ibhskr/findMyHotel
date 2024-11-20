import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TfiReload } from "react-icons/tfi";
import BookingDetails from "./BookingDetails";
import UploadHotelPicture from "./UploadHotelPicture";
import toast from "react-hot-toast";

function B_Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const [hotel, setHotel] = useState({});
  const rooms = hotel.rooms || [];
  const [seeRooms, setSeeRooms] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [pendingBooking, setPendingBooking] = useState(0);
  const [confBooking, setConfBooking] = useState(0);
  const [viewBooking, setviewBooking] = useState(false);
  const [viewBookingDetails, setviewBookingDetails] = useState([]);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const { Id: hotelId } = useParams();
  const navigate = useNavigate();

  // for refresh icon
  const clickReload = () => {
    setRefresh(!refresh);
  };

  // get room details under this hotel
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`/api/getHotel/${hotelId}`);
        setHotel(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [refresh]);

  // get booking details
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`/api/get-booking-list/${hotelId}`);
        // console.log(res);
        setBookingDetails(res.data.bookings);
        setConfBooking(res.data.countStatus.confirm);
        setPendingBooking(res.data.countStatus.pending);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [refresh]);

  // change status accept or reject
  const changeStatus = async (status, bookingId) => {
    // console.log(status, bookingId);
    try {
      const res = await axios.put(
        `/api/change-status?status=${status}&id=${bookingId}`
      );
      // console.log("Response:", res.data);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteRoomHandle = async (id) => {
    // console.log("room id is:", id);
    try {
      const res = await axios.delete("/api/delete-room", {
        data: { id },
      });

      toast.success(res.data.message);
      // console.log("Room deleted successfully");
    } catch (error) {
      toast.error("internal server error");
      console.error("Error deleting room:", error);
    }
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="md:hidden">
        <p>please use desktop</p>
      </div>
      <div className="hidden md:block">
        <div className="bg-slate-400 h-screen flex flex-row fixed w-screen  ">
          {/* left side bar */}
          <div className="bg-gray-600 w-40 h-full text-white">
            <nav>
              <ul className="hover:cursor-pointer">
                <li
                  onClick={() => navigate(-1)}
                  className="mt-8 py-4 border border-gray-500 text-center"
                >
                  Home
                </li>
                <li
                  onClick={() => setSeeRooms(true)}
                  className="py-4 border border-gray-500 text-center"
                >
                  Room List
                </li>
                <li className="py-4 border border-gray-500 text-center">
                  Current Booking
                </li>
                <li
                  onClick={() => navigate(`/business/add-room/${hotelId}`)}
                  className="py-4 border border-gray-500 text-center"
                >
                  Add Rooms
                </li>
                <li className="py-4 border border-gray-500 text-center">
                  Contact No.
                </li>
                <li
                  className="py-4 border border-gray-500 text-center"
                  onClick={() => setUploadPhoto(true)}
                >
                  Add Hotel Img.
                </li>

                <li className="py-4 border border-gray-500 text-center">
                  Report
                </li>
              </ul>
            </nav>
          </div>

          {/* main div */}
          <div className="w-full overflow-scroll">
            {/* Header */}
            <div className="bg-blue-500 flex flex-row w-full justify-between p-6">
              <div className="flex flex-row items-center">
                <p className="mr-4">Dashboard</p>
                <TfiReload
                  size={"15px"}
                  className={`hover:cursor-pointer transition-transform duration-300 ${
                    refresh ? "rotate-180" : ""
                  }`}
                  onClick={clickReload}
                />
              </div>
              <p>{hotel?.hotelname}</p>
            </div>

            <div className="w-full flex justify-evenly flex-wrap">
              {/* room type */}
              <div
                onClick={() => setSeeRooms(!seeRooms)}
                className="w-44 h-28 m-4 border bg-indigo-400 rounded-md shadow-lg flex justify-center items-center cursor-pointer"
              >
                <ol className="text-center">
                  <li className="text-3xl">{rooms.length}</li>
                  <li>Room Type</li>
                </ol>
              </div>
              {/* confirmation pending */}
              <div className="w-44 h-28 m-4 border bg-amber-400 rounded-md shadow-lg flex justify-center items-center">
                <ol className="text-center">
                  <li className="text-3xl">{pendingBooking}</li>
                  <li>Pending Conf.</li>
                </ol>
              </div>
              <div className="w-44 h-28 m-4 border bg-green-400 rounded-md shadow-lg flex justify-center items-center">
                <ol className="text-center">
                  <li className="text-3xl">{confBooking}</li>
                  <li>Confirm Booking</li>
                </ol>
              </div>
              <div className="w-44 h-28 m-4 border bg-orange-500 rounded-md shadow-lg flex justify-center items-center">
                <ol className="text-center">
                  <li className="text-3xl">3</li>
                  <li>Rooms Available</li>
                </ol>
              </div>
            </div>

            <div className="p-4">
              <div className="overflow-x-auto">
                {/* display room list */}
                {seeRooms ? (
                  <div className=" w-full">
                    <div className="min-w-full overflow-auto bg-white shadow-md  rounded-lg">
                      <h1 className="text-2xl w-full  font-bold mb-4 text-center">
                        Room List
                      </h1>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              No. of Rooms
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amenities
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {rooms.map((room) => (
                            <tr key={room._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {room.noOfRoom}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {room.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {room.price}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {room.description.length > 50
                                  ? `${room.description.slice(0, 50)}...`
                                  : room.description}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {room.amenities.join(", ").length > 50
                                  ? `${room.amenities
                                      .join(", ")
                                      .slice(0, 50)}...`
                                  : room.amenities.join(", ")}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(room.createdAt).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() => deleteRoomHandle(room._id)}
                                  className="bg-red-500 p-2 text-white rounded-md hover:bg-red-600 transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="grid grid-cols-8 gap-4 bg-gray-100 p-2 font-bold ">
                      <div className="">Sl No</div>
                      <div>Name</div>
                      <div>Ph No.</div>
                      <div>Booking Time</div>
                      <div>Check In</div>
                      <div>Check Out</div>
                      <div>Status</div>
                      <div>Action</div>
                    </div>
                    <div className="overflow-scroll h-96">
                      {/* Add booking rows here */}
                      {bookingDetails.map((booking, index) => (
                        <div
                          onClick={() => {
                            setviewBooking(!viewBooking);
                            setviewBookingDetails(booking);
                          }}
                          key={booking._id}
                          className="grid grid-cols-8 gap-4 p-3 mt-2 text-sm text-gray-800 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
                        >
                          <div className="flex  items-center">{index + 1}</div>
                          <div className="flex items-center">
                            {booking.name}
                          </div>
                          <div className="flex items-center">
                            {booking.phoneNo}
                          </div>
                          <div className="flex items-center">
                            {new Date(booking.createdAt).toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            {new Date(booking.checkInDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            {new Date(
                              booking.checkOutDate
                            ).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === "placed"
                                  ? " bg-yellow-400 "
                                  : booking.status === "accept"
                                  ? "bg-green-400 "
                                  : "bg-red-400 "
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex flex-col w-fit">
                            <button
                              onClick={() => setviewBooking(!viewBooking)}
                            >
                              view
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg transform transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Booking Details
            </h2>

            <BookingDetails booking={viewBookingDetails} />

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setviewBooking(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Back
              </button>

              {viewBookingDetails.status === "accept" ? (
                <button
                  onClick={() => {
                    changeStatus("reject", viewBookingDetails._id);
                    setviewBooking(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Reject
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      changeStatus("accept", viewBookingDetails._id);
                      setviewBooking(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      changeStatus("reject", viewBookingDetails._id);
                      setviewBooking(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {uploadPhoto && (
        <div className="fixed w-full flex justify-center top-0">
          <UploadHotelPicture
            hotelId={hotel._id}
            setUploadPhoto={setUploadPhoto}
          />
        </div>
      )}
    </>
  );
}

export default B_Dashboard;
