import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetServicesQuery } from "../../redux/features/admin/AdminApi";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const { data } = useGetServicesQuery(undefined);


  // State for storing services fetched from the API
  const [servicesList, setServicesList] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      const transformedServices = data?.data?.map((service: any) => ({
        id: service?._id,
        name: service?.name,
        description: service?.description,
        price: service?.price,
        duration: service?.duration,
      }));

      setServicesList(transformedServices);
    }
  }, [data]);

  // Filter the services based on search query, filter criteria, and sort order
  const filteredServices = servicesList
    .filter((service) =>
      service?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((service) => {
      switch (filterCriteria) {
        case "lowPrice":
          return Number(service?.price) <= 20;
        case "highPrice":
          return Number(service?.price) > 20;
        case "shortDuration":
          return Number(service?.duration) <= 30;
        case "longDuration":
          return Number(service?.duration) > 30;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a?.name.localeCompare(b?.name);
      } else {
        return b?.name.localeCompare(a?.name);
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
          {filteredServices?.map((service) => (
            <div key={service?.id} className="border-b pb-4 mb-4 lg:flex lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-serif">{service?.name}</h3>
                <p className="text-gray-700">{service?.description}</p>
                <p className="text-gray-500">
                  <strong>Price:</strong> ${service?.price} &nbsp;|&nbsp;
                  <strong>Duration:</strong> {service?.duration} mins
                </p>
              </div>
              <button className="mt-2 lg:mt-0 border-2 border-green-500 p-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300">
                <Link to={`/services/${service?.id}`}>View Details</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;