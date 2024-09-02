import { useState, useEffect } from "react";
import moment from "moment";
import { useGetSlotAvailabilityQuery } from "../../../redux/features/admin/SlotApi";


type Booking = {
  id: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
};

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const SlotCountdown = () => {
  const [nextBooking, setNextBooking] = useState<Booking | null>(null);
  const [countdowns, setCountdowns] = useState<Record<string, TimeRemaining>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { data, isLoading } = useGetSlotAvailabilityQuery(undefined);

  const calculateTimeRemaining = (date: string, startTime: string): TimeRemaining => {
    const bookingTime = moment(`${date} ${startTime}`, "YYYY-MM-DD HH:mm");
    const now = moment();
    const duration = moment.duration(bookingTime.diff(now));

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };


  useEffect(() => {
    if (data && data?.data && data?.data?.length > 0) {
      const NewBookingdata: Booking[] = data?.data?.map((item: any) => ({
        id: item?._id,
        serviceName: item?.service?.name || "No Service", 
        date: item?.date,
        startTime: item?.startTime,
        endTime: item?.endTime,
      }));

      setBookings(NewBookingdata);
    }
  }, [data]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCountdowns: Record<string, TimeRemaining> = {};
      let nearestBooking: Booking | null = null;

      bookings.forEach((booking) => {
        const timeRemaining = calculateTimeRemaining(booking?.date, booking?.startTime);
        newCountdowns[booking?.id] = timeRemaining;

        if (
          (!nearestBooking || moment(`${booking?.date} ${booking?.startTime}`).isBefore(`${nearestBooking?.date} ${nearestBooking?.startTime}`)) &&
          moment(`${booking?.date} ${booking?.startTime}`).isAfter(moment())
        ) {
          nearestBooking = booking;
        }
      });

      setCountdowns(newCountdowns);
      setNextBooking(nearestBooking);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [bookings]);

  if(!data){
    <p>Loading Slot Data.......{isLoading}</p>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Slot Countdown</h1>

      {nextBooking && (
        <div className="mb-6 p-4 border rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Next Booking: {nextBooking?.serviceName}</h2>
          <p className="text-gray-600">
            {nextBooking.date} | {nextBooking?.startTime} - {nextBooking?.endTime}
          </p>
          <p className="text-red-500 font-semibold">
            Countdown: {countdowns[nextBooking?.id]?.days}d {countdowns[nextBooking.id]?.hours}h{" "}
            {countdowns[nextBooking.id]?.minutes}m {countdowns[nextBooking?.id]?.seconds}s
          </p>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">All Upcoming Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div key={booking?.id} className="p-4 border rounded shadow-md">
            <h3 className="text-lg font-semibold">{booking?.serviceName}</h3>
            <p className="text-gray-600">
              {booking?.date} | {booking?.startTime} - {booking?.endTime}
            </p>
            <p className="text-red-500 font-semibold">
              Countdown: {countdowns[booking?.id]?.days}d {countdowns[booking?.id]?.hours}h{" "}
              {countdowns[booking?.id]?.minutes}m {countdowns[booking?.id]?.seconds}s
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotCountdown;
