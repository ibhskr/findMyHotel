import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import Rooms from "./Rooms"
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full hidden sm:block">
        <ul className="flex flex-row w-100% justify-between px-4">
          <li onClick={() => navigate("/mumbai")}>Mumbai</li>
          <li>Delhi</li>
          <li>Bengaluru</li>
          <li>Hyderabad</li>
          <li>Ahmedabad</li>
          <li>Chennai</li>
          <li>Kolkata</li>
          <li>Pune</li>
          <li>Jaipur</li>
          <li>Surat</li>
        </ul>
      </div>
      

      <div>
        <Rooms/>
      </div>
    </div>
  );
}

export default Home;
