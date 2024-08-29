import { FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Address = () => {
    return (
        <div className="flex justify-around items-start p-10 bg-white shadow-md">
            {/* Call Us Section */}
            <div className="flex items-center space-x-4">
                <FaPhone className="text-blue-500 text-3xl" />
                <div>
                    <h3 className="text-lg font-semibold">CALL US AT</h3>
                    <p className="text-gray-600">(+505) 122 225 225</p>
                    <p className="text-gray-600">(+505) 122 225 224</p>
                </div>
            </div>
            
            {/* Our Address Section */}
            <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-blue-500 text-3xl" />
                <div>
                    <h3 className="text-lg font-semibold">OUR ADDRESS</h3>
                    <p className="text-gray-600">464 Rhode Island Av.</p>
                    <p className="text-gray-600">Portland, OR 97219</p>
                </div>
            </div>

            {/* Working Hours Section */}
            <div className="flex items-center space-x-4">
                <FaClock className="text-blue-500 text-3xl" />
                <div>
                    <h3 className="text-lg font-semibold">WORKING HOURS</h3>
                    <p className="text-gray-600">Monday – Friday: 8 am – 6 pm</p>
                    <p className="text-gray-600">Saturday: 8 am – 3 pm</p>
                </div>
            </div>
        </div>
    );
};

export default Address;
