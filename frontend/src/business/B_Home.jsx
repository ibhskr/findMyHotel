import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader2 from "../loader/Loader2";

function B_Home() {
  const navigate = useNavigate();
  const businessId = useSelector((state) => state.business.business);
  const [listedHotel, setListedHotel] = useState([]);
  const [organization, setOrganization] = useState();
  const [loading, setLoading] = useState(false);
  // console.log(businessId);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/getmyhotels/${businessId}`);

        setOrganization(response.data);
        setListedHotel(response.data.listedHotel);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [businessId]);
  if (loading) return <Loader2 />;
  // console.log(listedHotel);
  // console.log(organization);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-600">
          Select Your Hotel :{" "}
          <span className="text-emerald-600">{organization?.orgname}</span>
        </h1>
        <p>Phone Number: {organization?.phone}</p>
        <p>Email Id: {organization?.email}</p>
        <p>No of Listed Hotels : {organization?.listedHotel?.length || 0}</p>
        <p>No of Listed Rooms : {organization?.listedRoom?.length || 0}</p>
        <p>CreatedAt: {organization?.createdAt}</p>
        <p>Last UpdatedAt: {organization?.updatedAt}</p>
      </div>

      <div className="flex justify-center space-x-4 ">
        {listedHotel.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white w-full sm:w-60 shadow-sm shadow-slate-950 rounded-lg p-4 transition-transform  transform hover:scale-105 "
            onClick={() => navigate(`/business/dashboard/${hotel._id}`)}
          >
            <div className="w-full flex justify-center">
              <img
                src={hotel.hotelImage}
                alt=""
                className="h-32 bg-cover border-2 "
              />
            </div>

            <h2 className="text-xl font-semibold text-indigo-700">
              {hotel.hotelname}
            </h2>
            <p className="text-gray-600">{hotel.description}</p>
          </div>
        ))}
        <div
          onClick={() => navigate(`/business/add-hotel`)}
          className="flex justify-center items-center w-full shadow-sm shadow-slate-950 sm:w-60 bg-gray-400 text-white text-lg font-semibold rounded-lg cursor-pointer transition-transform transform hover:scale-105 "
        >
          <div className="text-center">
            <p className="text-4xl">+</p>
            <p className="mt-2">Add Hotel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default B_Home;
