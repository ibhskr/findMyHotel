import React, { useState } from "react";
import { PiUserLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { RiCloseLargeFill } from "react-icons/ri";
import Login from "./Login";
function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between border-2 p-4">
        {/* logo */}
        <div>
          <h1
            onClick={() => navigate("/")}
            className="hover:cursor-pointer font-bold sm:text-xl"
          >
            FindMyHotel
          </h1>
        </div>
        {/* search */}
        <div>
          <form action="" className=" h-8  ">
            <input
              type="text"
              className="border h-full outline-none border-gray-600 px-2"
            />
            <button
              type="submit"
              className=" bg-green-400 h-full border border-gray-600 px-2 text-white "
            >
              Search
            </button>
          </form>
        </div>
        {/* user */}
        <div>
          <button onClick={() => setShowLogin(!showLogin)}>Login</button>
        </div>
      </div>
      {showLogin && <Login />}
    </>
  );
}

export default Header;
