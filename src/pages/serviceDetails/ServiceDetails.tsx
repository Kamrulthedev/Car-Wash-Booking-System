import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
    { id: 10, name: "Undercarriage Wash", description: "Clean the underside of the vehicle to remove dirt and grime.", price: "20", duration: "30" }
  ];


  const availableSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

type Tservice = {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
} | undefined;

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const [selectedService, setSelectedService] = useState<Tservice>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    const service = servicesList.find((service) => service.id === numericId);
    setSelectedService(service);
    setLoading(false);
  }, [numericId]);

  useEffect(() => {
    if (selectedDate) {
      // Simulate an API call to fetch booked slots for the selected date
      const fetchBookedSlots = async () => {
        // Simulate a fetch based on the selected date
        const fetchedBookedSlots : any = []; // Initially, no slots are booked
        setBookedSlots(fetchedBookedSlots);
      };

      fetchBookedSlots();
    }
  }, [selectedDate]);

  if (loading) return <p>Loading service details...</p>;

  if (!selectedService) {
    return <p>Service not found. Please check the service ID.</p>;
  }

  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (selectedDate && selectedSlot) {
      console.log(`Booking service on ${selectedDate} at ${selectedSlot}`);

      Swal.fire({
        title: 'Booking Confirmed!',
        text: `Your service has been booked for ${selectedDate} at ${selectedSlot}.`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // After confirmation, add the booked slot to the list of booked slots
        setBookedSlots((prev) => [...prev, selectedSlot]);
        setSelectedSlot(null); // Clear the selected slot after booking
      });
    } else {
      Swal.fire({
        title: 'Incomplete Selection',
        text: 'Please select both a date and a time slot before booking.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="relative mt-[62px] p-4 min-h-screen">
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/XYjFF9n/foamy-car-wash-soap-sparkling-clean-vehicle-concept-car-care-cleaning-products-vehicle-maintenance-c.jpg')] bg-cover bg-center opacity-70"></div>
      <div className="relative max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
          {selectedService.name}
        </h1>
        <p className="mb-2">{selectedService.description}</p>
        <p className="mb-2">
          <strong>Price: $ </strong> {selectedService.price} &nbsp;|&nbsp;
          <strong>Duration:</strong> {selectedService.duration} mins
        </p>

        {/* Date Selector */}
        <div className="mt-4 mb-6">
          <label className="block text-gray-700 mb-2">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Time Slots */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Available Time Slots</h3>
          <div className="grid grid-cols-2 gap-4">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleSlotSelection(slot)}
                disabled={bookedSlots.includes(slot)}
                className={`p-2 rounded border text-center ${
                  bookedSlots.includes(slot)
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                } ${selectedSlot === slot && "border-green-700 border-2"}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Book Button */}
        {selectedSlot && (
          <button
            onClick={handleBooking}
            className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 w-full"
          >
            Book This Service
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;