import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { Outlet } from "react-router-dom";
import Loader from "./loader/Loader";
import Footer from "./components/Footer";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader ? (
        <div className="w-screen h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
