import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const phoneNumber  = useParams();
  console.log(phoneNumber.phoneNumber);
  return <div>{phoneNumber.phoneNumber}</div>;
}

export default User;
