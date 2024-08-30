import { Divider, List, Skeleton } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import InfiniteScroll from "react-infinite-scroll-component";

const servicesList = [
  {
    id: 1,
    name: "Exterior Wash",
    description: "Complete exterior wash.",
    price: "15",
    duration: "30",
  },
  {
    id: 2,
    name: "Interior Cleaning",
    description: "Thorough interior cleaning.",
    price: "25",
    duration: "45",
  },
  {
    id: 3,
    name: "Full Service",
    description: "Exterior wash and interior cleaning.",
    price: "35",
    duration: "60",
  },
];
const availableSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
];

const Booking = () => {
  const [selectedService, setSelectedService] = useState(servicesList[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(availableSlots[0]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [data, setData] = useState(servicesList);

  const loadMoreData = () => {
    if (data.length >= servicesList.length) {
      return;
    }
    setTimeout(() => {
      setData([...data, ...servicesList.slice(data.length, data.length + 1)]);
    }, 1000);
  };

  const handlePayment = () => {
    if (!userName || !userEmail || !selectedDate || !selectedSlot) {
      Swal.fire({
        title: "Incomplete Information",
        text: "Please fill in all the fields before proceeding to payment.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    // Payment processing logic with AAMARPAY
    const paymentUrl = `https://aamarpay.com/pay?amount=${selectedService.price}&customer_name=${userName}&customer_email=${userEmail}&service_id=${selectedService.id}`;
    window.location.href = paymentUrl;

    // Redirect to success page after payment
    window.location.replace("/success");
  };

  return (
  <div className="relative mt-[62px] p-4 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Left Side: Selected Service and Slot Information */}
  <div className="h-full flex flex-col">
    <h1 className="text-lg lg:text-2xl font-serif p-4 text-center">Book Services</h1>
    <div
      id="scrollableDiv"
      className="flex-1 overflow-auto p-4 border border-gray-300"
      style={{
        maxHeight: "400px", // Set max height for scrollable area
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < servicesList.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={
          <Divider className="font-serif" plain>
            It is all, nothing more 🤐
          </Divider>
        }
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id} onClick={() => setSelectedService(item)}>
              <div className="flex flex-col font-serif">
                <span>{item.name}</span>
                <span>{item.description}</span>
                <span>Price: ${item.price}</span>
                <span>Duration: {item.duration} mins</span>
              </div>
              <div className="mt-2 font-serif">
                <span className="text-gray-600">Default Slot: </span>
                <span className="font-medium">
                  {selectedSlot || "9:00 AM"}
                </span>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  </div>
  {/* Right Side: User Information Form */}
  <div className="h-full flex flex-col justify-center">
    <h2 className="text-lg lg:text-2xl mb-4 text-center p-4 font-serif">User Information</h2>
    <div className="relative bg-white rounded-lg shadow-lg font-serif flex-1 overflow-auto">
      <form className="p-3">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Time Slot:</label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Pay Now Button */}
        <button
          type="button"
          onClick={handlePayment}
          className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 w-full"
        >
          Pay Now
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default Booking;
