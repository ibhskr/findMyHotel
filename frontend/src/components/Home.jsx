import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
// import Rooms from "./Rooms"
import { lazy } from "react";
import Loader2 from "../loader/Loader2";
function Home() {
  const Rooms = React.lazy(() => import("./Rooms"));

  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full hidden sm:block">
        <ul className="flex flex-row w-100% justify-between px-4">
          <li onClick={() => navigate("/search/Mumbai")}>Mumbai</li>
          <li onClick={() => navigate("/search/Kolkata")}>Kolkata</li>
          <li onClick={() => navigate("/search/Jaipur")}>Jaipur</li>
          <li onClick={() => navigate("/search/Bhubaneswar")}>Bhubaneswar</li>
          <li onClick={() => navigate("/search/Bangalore")}>Bangalore</li>
          <li onClick={() => navigate("/search/Delhi")}>Delhi</li>
          <li onClick={() => navigate("/search/Gurugram")}>Gurugram</li>
          <li onClick={() => navigate("/search/Noida")}>Noida</li>
          <li onClick={() => navigate("/search/Haydrabad")}>Haydrabad</li>
          <li onClick={() => navigate("/search/Guwahati")}>Guwahati</li>
        </ul>
      </div>

      <Suspense fallback={<Loader2 />}>
        <Rooms />
      </Suspense>
    </div>
  );
}

export default Home;
