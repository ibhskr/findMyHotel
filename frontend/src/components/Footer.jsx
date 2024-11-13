import React from "react";
import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p>
              Welcome to our hotel booking web app. We provide the best deals on
              hotels and ensure a comfortable stay for our guests.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li
                onClick={() => navigate("/")}
                className="hover:underline hover:cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/hotels")}
                className="hover:underline hover:cursor-pointer"
              >
                Hotels
              </li>
              <li className="hover:underline hover:cursor-pointer">About</li>
              <li className="hover:underline hover:cursor-pointer">
                Coustomar Support
              </li>
              <li className="hover:underline hover:cursor-pointer">FAQ</li>
            </ul>
          </div>
          {/* business section */}
          <div>
            <h2 className="text-xl font-bold mb-4">For Business</h2>
            <ul>
              <li
                onClick={() => navigate("/business")}
                className="hover:underline hover:cursor-pointer"
              >
                Business
              </li>
              <li className="hover:underline hover:cursor-pointer">
                About Business
              </li>
              <li className="hover:underline hover:cursor-pointer">
                Contact us
              </li>
              <li className="hover:underline hover:cursor-pointer">FAQ</li>
              <li className="hover:underline hover:cursor-pointer"></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p>
              123 Main Street
              <br />
              Cooch Behar, West Bengal
              <br />
              India
              <br />
              Phone: +91 1234567890
              <br />
              Email: info@hotelbooking.com
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 text-center">
          <a href="#" className="text-white mx-2 hover:text-gray-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white mx-2 hover:text-gray-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white mx-2 hover:text-gray-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-white mx-2 hover:text-gray-400">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} findMyHotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
