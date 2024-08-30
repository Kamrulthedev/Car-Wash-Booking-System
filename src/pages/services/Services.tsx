import React, { useState } from "react";

const Services = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  // Example list of services
  const servicesList = [
    { id: 1, name: "Exterior Wash", description: "Complete exterior wash.", price: "15", duration: "30" },
    { id: 2, name: "Interior Cleaning", description: "Thorough interior cleaning.", price: "25", duration: "45" },
    { id: 3, name: "Full Service", description: "Exterior wash and interior cleaning.", price: "35", duration: "60" },
    { id: 4, name: "Waxing", description: "High-quality wax applied for extra shine and protection.", price: "20", duration: "40" },
    { id: 5, name: "Engine Cleaning", description: "Detailed cleaning of the engine bay.", price: "30", duration: "50" },
    { id: 6, name: "Tire Shine", description: "Tires cleaned and treated for a glossy finish.", price: "10", duration: "15" },
    { id: 7, name: "Headlight Restoration", description: "Polishing of headlights for improved clarity and brightness.", price: "25", duration: "35" },
    { id: 8, name: "Clay Bar Treatment", description: "Removes contaminants and smooths the paint surface.", price: "50", duration: "75" },
    { id: 9, name: "Seat Shampoo", description: "Deep cleaning of cloth or leather seats.", price: "40", duration: "60" },
    { id: 10, name: "Undercarriage Wash", description: "Clean the underside of the vehicle to remove dirt and grime.", price: "20", duration: "30" },
    { id: 11, name: "Ceramic Coating", description: "Apply a ceramic coat for long-lasting protection and shine.", price: "100", duration: "120" },
    { id: 12, name: "Glass Treatment", description: "Water-repellent treatment for windows and mirrors.", price: "15", duration: "20" },
    { id: 13, name: "Odor Removal", description: "Eliminates odors from the interior using ozone or chemical treatments.", price: "35", duration: "45" },
  ];
  // Filter the services based on search query, filter criteria, and sort order
  const filteredServices = servicesList
    .filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(service => {
      switch (filterCriteria) {
        case "lowPrice":
          return Number(service.price) <= 20; 
        case "highPrice":
          return Number(service.price) > 20; 
        case "shortDuration":
          return Number(service.duration) <= 30;
        case "longDuration":
          return Number(service.duration) > 30;
        default:
          return true;
      }
    })
    // Sort the services
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 mt-[52px] lg:mt-[62px]"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/LpVzFMX/man-washing-car-with-hood-up-763111-289116.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-serif mb-6 text-center">Our Services</h2>
        
        {/* Search and Filter Controls */}
        <div className="mb-4 flex flex-col lg:flex-row justify-between lg:gap-5 items-center">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 lg:mb-0"
          />

          {/* Filter dropdown */}
          <select
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
            className="w-full lg:w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 lg:mb-0"
          >
            <option value="all">All Services</option>
            <option value="lowPrice">Price: Low</option>
            <option value="highPrice">Price: High</option>
            <option value="shortDuration">Duration: Short</option>
            <option value="longDuration">Duration: Long</option>
          </select>

          {/* Sort dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full lg:w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="asc">Sort: A-Z</option>
            <option value="desc">Sort: Z-A</option>
          </select>
        </div>

        {/* Services List */}
        <div className="space-y-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="border-b pb-4 mb-4 lg:flex lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-serif">{service.name}</h3>
                <p className="text-gray-700">{service.description}</p>
                <p className="text-gray-500">
                  <strong>Price:</strong> ${service.price} &nbsp;|&nbsp;
                  <strong>Duration:</strong> {service.duration} mins
                </p>
              </div>
              <button className="mt-2 lg:mt-0 border-2 border-green-500 p-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
