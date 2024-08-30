import { useState, useEffect, useRef } from "react";
import { IoMdLogIn } from "react-icons/io";
import { TbPhoneCall } from "react-icons/tb";
import { Link } from "react-router-dom";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <nav className="bg-black w-full py-4 px-6 flex items-center justify-between top-0 left-0 z-40 fixed font-serif">
      {/* Logo Section */}
      <a href="/">
        <div className="flex items-center space-x-4">
          <img
            src="https://i.ibb.co/BZcWcgV/npad-logo-white.png"
            alt="Logo"
            className="h-10"
          />
        </div>
      </a>

      {/* Navigation Links for Larger Screens */}
      <ul className={`hidden lg:flex space-x-8 text-white`}>
        <li>
          <a href="#" className="hover:text-gray-400 block py-2">
            HOME
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 block py-2">
            SERVICES
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 block py-2">
            LOCATION
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 block py-2">
            BOOKING
          </a>
        </li>
      </ul>

      {/* Contact Section */}
      <div className="flex items-center space-x-4 lg:mr-0 mr-5">
        <Link to={"/"} className="flex items-center space-x-2 hover:border hover:border-green-500 p-1 rounded-lg">
          <TbPhoneCall className="text-green-500 text-lg" />
          <span className="text-white">Call</span>
        </Link>
        <Link to={"/login"} className="flex items-center space-x-2 text-white hover:border hover:border-green-500 p-1 rounded-lg">
          <IoMdLogIn className="text-2xl text-green-500 hover:transition-transform hover:scale-x-110" />
          <span>Login</span>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <button className="text-2xl text-white" onClick={toggleMenu}>
          &#9776;
        </button>
        <div
          ref={dropdownRef}
          className={`absolute mt-10 w-40 top-16 right-0 bg-green-500 transition-transform duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col items-center space-y-2 text-white py-4">
            <li>
              <a href="#" className="hover:text-gray-400 block py-2">
                HOME
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 block py-2">
                SERVICES
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 block py-2">
                LOCATION
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 block py-2">
              BOOKING
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
