import { useState } from "react";
import ServiceCard from "./ServiceCard";

const FeaturedServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVehicleType, setSelectedVehicleType] = useState("All");

  const categories = ["All", "WASH & WAX", "DETAILING", "MAINTENANCE"];
  const vehicleTypes = [
    "All",
    "Hatchback",
    "Sedan/Wagon",
    "Luxury Sedan",
    "Crossover SUV",
  ];

  const services = [
    {
      title: "EXPRESS CAR WASH",
      price: "BDT 600",
      duration: "25 Minutes",
      description: "See what's included",
      linkText: "See what's included",
      link: "/services/express-car-wash",
      category: "WASH & WAX",
      vehicleType: "Hatchback",
    },
    {
      title: "EXPRESS CAR WASH & WAX",
      price: "BDT 1400",
      duration: "1 hour 15 mins",
      description: "See what's included",
      linkText: "See what's included",
      link: "/services/express-car-wash-wax",
      category: "WASH & WAX",
      vehicleType: "Sedan/Wagon",
    },
    {
      title: "DELUXE CAR WASH & WAX",
      price: "BDT 1600",
      duration: "1 hour 30 mins",
      description: "See what's included",
      linkText: "See what's included",
      link: "/services/deluxe-car-wash-wax",
      category: "WASH & WAX",
      vehicleType: "Sedan/Wagon",
    },
    {
      title: "PREMIUM CAR WASH & WAX",
      price: "BDT 1800",
      duration: "1 hour 45 mins",
      description: "See what's included",
      linkText: "See what's included",
      link: "/services/premium-car-wash-wax",
      category: "WASH & WAX",
      vehicleType: "SUV",
    },
    {
      title: "ULTIMATE CAR WASH & WAX",
      price: "BDT 2000",
      duration: "2 hours",
      description: "See what's included",
      linkText: "See what's included",
      link: "/services/ultimate-car-wash-wax",
      category: "WASH & WAX",
      vehicleType: "SUV",
    },
    {
      title: "BASIC CAR WASH & WAX",
      price: "BDT 1200",
      duration: "1 hour",
      description: "See what's included",
      linkText: "See what's included",
      link: "/services/basic-car-wash-wax",
      category: "WASH & WAX",
      vehicleType: "Sedan/Wagon",
    },
    // More services...
  ];

  const filteredServices = services.filter(
    (service) =>
      (selectedCategory === "All" || service.category === selectedCategory) &&
      (selectedVehicleType === "All" ||
        service.vehicleType === selectedVehicleType)
  );

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center flex flex-col justify-center items-center py-16"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/Z6z7zH2/man-cleaning-red-sports-car-with-power-washer-rainy-afternoon-garage-area-1090747-488.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative z-10">
        {/* category section */}
        <div className="justify-center mb-8 space-x-4">
          <div className="flex justify-center mb-4 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border-2 ${
                  selectedCategory === category
                    ? "bg-green-500 text-white"
                    : "text-green-500 border-green-500"
                } transition duration-300`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {vehicleTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedVehicleType(type)}
                className={`px-4 py-2 rounded-full border-2 ${
                  selectedVehicleType === type
                    ? "bg-green-500 text-white"
                    : "text-green-500 border-green-500"
                } transition duration-300`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        {/* Service Cards */}
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              price={service.price}
              duration={service.duration}
              description={service.description}
              linkText={service.linkText}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
