import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useGetServiceByIdQuery } from "../../redux/features/admin/AdminApi";
import { useGetSlotsByServiceIdQuery } from "../../redux/features/admin/SlotApi";
import { TService } from "../../types/Service";
import { useAddBookingMutation } from "../../redux/features/admin/Bookings";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

enum VehicleType {
  Car = "car",
  Truck = "truck",
  SUV = "suv",
  Van = "van",
  Motorcycle = "motorcycle",
  Bus = "bus",
  ElectricVehicle = "electricVehicle",
  HybridVehicle = "hybridVehicle",
  Bicycle = "bicycle",
  Tractor = "tractor",
}

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedService, setSelectedService] = useState<TService>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.Car);
  const navigate = useNavigate();

  // Fetch the current user's authentication status
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);

  // Fetch service details by ID from the API
  const { data, isLoading } = useGetServiceByIdQuery(id);

  // Fetch available slots by service ID
  const { data: slotData, isLoading: slotLoading } =
    useGetSlotsByServiceIdQuery(id);

  // Use the addBooking mutation hook
  const [addBooking] = useAddBookingMutation();

  useEffect(() => {
    if (!isLoading && data) {
      const fetchedService: any = {
        id: data?.data?.id,
        name: data?.data?.name,
        description: data?.data?.description,
        price: data?.data?.price,
        duration: data?.data?.duration,
      };
      setSelectedService(fetchedService);
      setLoading(false);
    } else if (!isLoading) {
      setLoading(false);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (selectedDate) {
      const fetchBookedSlots = async () => {
        if (slotData && slotData.data) {
          const fetchedBookedSlots = slotData.data
            .filter(
              (slot) =>
                slot.date === selectedDate && slot.isBooked !== "available"
            )
            .map((slot) => slot._id);
          setBookedSlots(fetchedBookedSlots);
        }
      };
      fetchBookedSlots();
    }
  }, [selectedDate, slotData]);

  const handleSlotSelection = (slotId: string) => {
    setSelectedSlotId(slotId);
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (selectedDate && selectedSlotId) {
      const bookingData = {
        serviceId: id,
        slotId: selectedSlotId,
        vehicleType: vehicleType,
        vehicleBrand: "Toyota",
        vehicleModel: "Camry",
        manufacturingYear: 2025,
        registrationPlate: "ABC123",
      };
      console.log(bookingData);
      try {
        await addBooking(bookingData).unwrap();
        Swal.fire({
          title: "Booking Confirmed!",
          text: `Your service has been booked for ${selectedDate}.`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setBookedSlots((prev) => [...prev, selectedSlotId]);
          setSelectedSlotId(null);
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Booking Failed",
          text: "An error occurred while booking the service. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        title: "Incomplete Selection",
        text: "Please select both a date and a time slot before booking.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const availableSlots = slotData?.data
    ? slotData.data
        .filter((slot) => slot?.isBooked === "available")
        .map((slot) => ({
          id: slot._id,
          startTime: slot.startTime,
        }))
    : [];

  if (loading || slotLoading)
    return <p className="mt-[72px]">Loading service details...</p>;
  if (!selectedService) {
    return (
      <p className="mt[62px]">
        Service not found. Please check the service ID.
      </p>
    );
  }

  return (
    <div className="relative mt-[62px] p-4 min-h-screen">
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/XYjFF9n/foamy-car-wash-soap-sparkling-clean-vehicle-concept-car-care-cleaning-products-vehicle-maintenance-c.jpg')] bg-cover bg-center opacity-70"></div>
      <div className="relative max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
          {selectedService?.name}
        </h1>
        <p className="mb-2">{selectedService?.description}</p>
        <p className="mb-2">
          <strong>Price: $ </strong> {selectedService?.price} &nbsp;|&nbsp;
          <strong>Duration:</strong> {selectedService?.duration} mins
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

        {/* Vehicle Type Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Select Vehicle Type:
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as VehicleType)}
            className="border p-2 rounded w-full"
          >
            {Object.values(VehicleType).map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() +
                  type
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()}
              </option>
            ))}
          </select>
        </div>

        {/* Time Slots */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Available Time Slots</h3>
          {availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotSelection(slot.id)}
                  disabled={bookedSlots.includes(slot.id)}
                  className={`p-2 rounded border text-center ${
                    bookedSlots.includes(slot.id)
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  } ${
                    selectedSlotId === slot.id && "border-green-700 border-2"
                  }`}
                >
                  {slot.startTime}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No available Slots Time</p>
          )}
        </div>

        {/* Book Button */}
        {selectedSlotId && (
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
