import { useState, useEffect, useRef } from "react";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { TbPhoneCall } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { logout } from "../../../../redux/features/auth/AuthSlice";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role;
  const isLoggedIn = !!user;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "LOCATION", path: "/location" },
    { name: "BOOKING", path: "/booking" },
    //  dainamicely update dashbrd
    ...(isLoggedIn
      ? userRole === "admin"
        ? [{ name: "ADMIN DASHBOARD", path: "/admin" }]
        : [{ name: "DASHBOARD", path: "/user" }]
      : []),
  ];

  return (
    <nav className="bg-black w-full py-4 px-6 flex items-center justify-between top-0 left-0 z-40 fixed font-serif">
      {/* Logo Section */}
      <Link to="/">
        <div className="flex items-center space-x-4">
          <img
            src="https://i.ibb.co/BZcWcgV/npad-logo-white.png"
            alt="Logo"
            className="lg:h-10 h-5"
          />
        </div>
      </Link>

      {/* Navigation Links for Larger Screens */}
      <ul className={`hidden lg:flex space-x-8 text-white`}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link to={link.path} className="hover:text-gray-400 block py-2">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Contact Section */}
      <div className="flex items-center space-x-4 lg:mr-0 mr-5">
        <Link
          to={"/"}
          className="flex items-center space-x-2 hover:border hover:border-green-500 p-1 rounded-lg"
        >
          <TbPhoneCall className="text-green-500 text-lg" />
          <span className="text-white">Call</span>
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hidden lg:flex items-center space-x-2 text-white hover:border hover:border-green-500 p-1 rounded-lg"
          >
            <IoMdLogOut className="text-2xl text-green-500 hover:transition-transform hover:scale-x-110" />
            <span>Logout</span>
          </button>
        ) : (
          <Link
            to={"/login"}
            className="hidden lg:flex items-center space-x-2 text-white hover:border hover:border-green-500 p-1 rounded-lg"
          >
            <IoMdLogIn className="text-2xl text-green-500 hover:transition-transform hover:scale-x-110" />
            <span>Login</span>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden relative">
        {/* Menu Button */}
        <button
          className="text-2xl text-white focus:outline-none"
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Dropdown Menu */}
        <div
          ref={dropdownRef}
          className={`absolute top-full right-0 mt-2 w-56 bg-green-500 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
            isOpen ? "block opacity-100" : "hidden opacity-0"
          }`}
          style={{ zIndex: 1000 }}
        >
          <ul className="flex flex-col items-start space-y-2 text-white py-4 px-6">
            {navLinks.map((link) => (
              <li key={link.name} className="w-full">
                <Link
                  to={link.path}
                  className="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={() => setIsOpen(false)} // Close the menu on link click
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {isLoggedIn ? (
              <li className="w-full">
                <button
                  onClick={handleLogout}
                  className="block py-2 px-4 rounded-lg text-white hover:bg-green-600 transition duration-300 w-full text-left"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="w-full">
                <Link
                  to={"/login"}
                  className="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 w-full text-left"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
