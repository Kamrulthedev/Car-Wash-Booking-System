
import { useState } from 'react';
import { FaTwitter, FaDribbble, FaBehance, FaYoutube } from 'react-icons/fa';

const Footer = () => {

    const [currentDateTime] = useState(new Date());
    const year = currentDateTime.getFullYear();

    return (
        <footer className="bg-black text-gray-300 py-10 px-5">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* About Section */}
                <div>
                    <h5 className="text-white font-semibold mb-4">ABOUT</h5>
                    <p className="text-sm">
                        Autospa Hand Wash is an eco-friendly hand car wash and detailing service based in Portland.
                    </p>
                    <img
                        src="https://i.ibb.co/BZcWcgV/npad-logo-white.png"
                        alt="AutoSpa Logo"
                        className="h-10 mt-4"
                    />
                </div>

                {/* Services Section */}
                <div>
                    <h5 className="text-white font-semibold mb-4">SERVICES</h5>
                    <ul className="space-y-2">
                        <li>Exterior Hand Wash</li>
                        <li>Tower Hand Dry</li>
                        <li>Tire Dressing</li>
                        <li>Wheel Shine</li>
                        <li>Interior Vacuum</li>
                        <li>Sealer Hand Wax</li>
                    </ul>
                </div>

                {/* Company Section */}
                <div>
                    <h5 className="text-white font-semibold mb-4">COMPANY</h5>
                    <ul className="space-y-2">
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>Gallery</li>
                        <li>Our Services</li>
                        <li>Book Your Wash</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div>
                    <h5 className="text-white font-semibold mb-4">NEWSLETTER</h5>
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email address:"
                            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button className="px-4 py-2 w-full bg-gray-700 text-white rounded hover:bg-green-500 transition duration-300">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-6 text-center py-4 space-y-8">
                {/* Social Media Icons */}
                <div className="flex space-x-6 text-gray-400 justify-center text-xl">
                    <FaTwitter className="hover:text-white cursor-pointer" />
                    <FaDribbble className="hover:text-white cursor-pointer" />
                    <FaBehance className="hover:text-white cursor-pointer" />
                    <FaYoutube className="hover:text-white cursor-pointer" />
                </div>

                <p className="text-sm text-gray-500 mt-4 md:mt-0">
                    By QuanticaLabs © {year} Auto Spa - Car Wash And Booking Center
                </p>
            </div>
        </footer>
    );
};

export default Footer;
