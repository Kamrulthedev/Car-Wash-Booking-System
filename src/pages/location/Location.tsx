

const Location = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat mt-16" style={{ backgroundImage: "url('https://i.ibb.co.com/TMWsr7f/car-is-being-washed-automatic-car-wash-36682-368241.jpg')" }}>
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find a Car Wash Near You</h1>
                
                <div className="h-64 mb-6">
                    <img 
                        src="https://i.ibb.co.com/7bz9Z2B/Screenshot-2024-09-09-213457.png" 
                        alt="Map" 
                        className="h-full w-full object-cover rounded-lg shadow-md"
                    />
                </div>
                
                <div className="p-4">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Locations</h2>
                    <ul className="space-y-4">
                    <li className="border-b pb-4">
                            <h3 className="text-lg font-medium text-gray-800">Downtown Car Wash</h3>
                            <p className="text-gray-600">Main road, Cox`s Bazar</p>
                            <p className="text-gray-600">Phone: (123) 456-7890</p>
                            <a 
                                href="https://www.google.com/maps/dir/?api=1&destination=Cox`s Bazar" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Get Directions
                            </a>
                        </li>
                        <li className="border-b pb-4">
                            <h3 className="text-lg font-medium text-gray-800">Eastside Car Wash</h3>
                            <p className="text-gray-600">456 Elm St, Cityville</p>
                            <p className="text-gray-600">Phone: (987) 654-3210</p>
                            <a 
                                href="https://www.google.com/maps/dir/?api=1&destination=456+Elm+St,+Cityville" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Get Directions
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Location;
