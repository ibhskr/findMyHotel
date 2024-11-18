import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hotels from "./components/Hotels.jsx";
import Rooms from "./components/Rooms.jsx";
import HotelMainPage from "./components/HotelMainPage.jsx";
import User from "./components/User.jsx";
import B_Home from "./business/B_Home.jsx";
import B_Login from "./business/B_Login.jsx";
import HotelForm from "./business/HotelForm.jsx";
import RoomForm from "./business/RoomForm.jsx";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import B_Dashboard from "./business/B_Dashboard.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import BookingPage from "./components/BookingPage.jsx";
import BookingSuccessful from "./components/BookingSuccessful.jsx";
import BookingDetails from "./components/BookingDetails.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/hotels", element: <Hotels /> },
      { path: "/hotel/:id", element: <HotelMainPage /> },
      { path: "/rooms", element: <Rooms /> },
      { path: "/booking/room/:id", element: <BookingPage /> },
      { path: "/booking/room/:id/successful", element: <BookingSuccessful /> },
      { path: "/user", element: <User /> },
      { path: "/booking-details/:id", element: <BookingDetails /> },
    ],
  },
  {
    path: "/business",
    // element: <B_Home />,
    children: [
      { path: "/business", element: <B_Login /> },
      { path: "add-hotel", element: <HotelForm /> },
      { path: "add-room/:Id", element: <RoomForm /> },
      { path: "select-your-hotel", element: <B_Home /> },
      { path: `dashboard/:Id`, element: <B_Dashboard /> },
    ],
  },
]);
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
