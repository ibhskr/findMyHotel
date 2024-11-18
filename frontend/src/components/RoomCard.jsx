import { useNavigate } from "react-router-dom";
import altRoomImg from "../assets/room.avif";
import { MdCurrencyRupee } from "react-icons/md";
function RoomCard({ room }) {
  const navigate = useNavigate();
  const hotelDetails = room?.hotel;
  const hotelId = hotelDetails?._id;

  function gotoHotelPage() {
    navigate(`/hotel/${hotelId}`);
  }
  function goToBookingPage(id) {
    navigate(`/booking/room/${id}`);
  }
  // console.log(room);
  return (
    <div
      className="w-52 bg-gray-200 rounded-xl p-2 m-2 hover:cursor-pointer"
      onClick={() => goToBookingPage(room._id)}
    >
      <div>
        <img
          src={room?.hotel?.hotelImage || altRoomImg}
          alt=""
          className="rounded-xl"
        />
      </div>
      <p className="font-bold hover:text-blue-600 ">{room?.hotel?.hotelname}</p>
      <p className="text-gray-500 font-bold ">{room?.type} Room</p>
      <p className="text-sm">{room?.hotel?.address}</p>
      <p className="flex py-2">
        <span className="text-blue-600 font-bold flex items-center ">
          <MdCurrencyRupee size={"18px"} />
          <span>{room?.price}</span>
        </span>
        /Night
      </p>
    </div>
  );
}

export default RoomCard;
