const servicesList = [
  {
    id: 1,
    name: "Basic Car Wash",
    description: "Exterior wash, tire cleaning, and a quick vacuum.",
    price: "$15",
    duration: "30 minutes",
  },
  {
    id: 2,
    name: "Deluxe Car Wash",
    description:
      "Includes basic wash, interior cleaning, dashboard polish, and air freshener.",
    price: "$25",
    duration: "45 minutes",
  },
  {
    id: 3,
    name: "Premium Car Wash",
    description: "Deluxe wash plus hand waxing and full interior shampoo.",
    price: "$45",
    duration: "1 hour",
  },
  {
    id: 4,
    name: "Ultimate Detail",
    description:
      "Complete exterior and interior detail, including engine cleaning and paint protection.",
    price: "$75",
    duration: "2 hours",
  },
  {
    id: 5,
    name: "Express Wash",
    description: "Quick exterior wash and dry.",
    price: "$10",
    duration: "15 minutes",
  },
];

const Services = () => {
  return (
    <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 lg:mt-[62px]"
    style={{
      backgroundImage:
        "url('https://i.ibb.co/LpVzFMX/man-washing-car-with-hood-up-763111-289116.jpg')",
    }}
  >
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
      <h2 className="text-3xl font-serif mb-6 text-center">Our Services</h2>
      <div className="space-y-6">
        {servicesList.map((service) => (
          <div key={service.id} className="border-b pb-4 mb-4 lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-serif">{service.name}</h3>
              <p className="text-gray-700">{service.description}</p>
              <p className="text-gray-500">
                <strong>Price:</strong> {service.price} &nbsp;|&nbsp; 
                <strong>Duration:</strong> {service.duration}
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
