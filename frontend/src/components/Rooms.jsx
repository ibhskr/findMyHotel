import React, { useEffect, useState } from "react";
import LinearIndeterminate from "./ProgressBar";
import axios from "axios";
import RoomCard from "./RoomCard";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("/api/rooms");
        setRooms(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);
  // console.log(rooms);
  return (
    <>
      {loading && (
        <div>
          <LinearIndeterminate />
        </div>
      )}

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold m-6">Rooms</h1>
        <div className="flex flex-wrap justify-evenly">
          {rooms?.length > 0
            ? rooms?.map((room, index) => <RoomCard key={index} room={room} />)
            : !loading && <p>No rooms available</p>}
        </div>
      </div>
    </>
  );
}

export default Rooms;
