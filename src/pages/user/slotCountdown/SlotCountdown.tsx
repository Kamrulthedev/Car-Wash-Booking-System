
import React, { useState, useEffect } from "react";
import moment from "moment";

const demoBookings = [
  {
    id: "1",
    serviceName: "Car Wash",
    date: "2024-09-05",
    startTime: "09:00",
    endTime: "10:00",
  },
  {
    id: "2",
    serviceName: "Oil Change",
    date: "2024-09-06",
    startTime: "11:00",
    endTime: "12:00",
  },
  {
    id: "3",
    serviceName: "Tire Rotation",
    date: "2024-09-07",
    startTime: "14:00",
    endTime: "15:00",
  },
];

const SlotCountdown = () => {
  const [nextBooking, setNextBooking] = useState(null);
  const [countdowns, setCountdowns] = useState({});

  // Helper function to calculate time remaining for a booking
  const calculateTimeRemaining = (date, startTime) => {
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

  // Update countdown timers for all upcoming bookings
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCountdowns = {};
      let nearestBooking = null;

      demoBookings.forEach((booking) => {
        const timeRemaining = calculateTimeRemaining(booking.date, booking.startTime);
        newCountdowns[booking.id] = timeRemaining;

        if (
          (!nearestBooking || moment(`${booking.date} ${booking.startTime}`).isBefore(`${nearestBooking.date} ${nearestBooking.startTime}`)) &&
          moment(`${booking.date} ${booking.startTime}`).isAfter(moment())
        ) {
          nearestBooking = booking;
        }
      });

      setCountdowns(newCountdowns);
      setNextBooking(nearestBooking);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Slot Countdown</h1>

      {nextBooking && (
        <div className="mb-6 p-4 border rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Next Booking: {nextBooking.serviceName}</h2>
          <p className="text-gray-600">
            {nextBooking.date} | {nextBooking.startTime} - {nextBooking.endTime}
          </p>
          <p className="text-red-500 font-semibold">
            Countdown: {countdowns[nextBooking.id]?.days}d {countdowns[nextBooking.id]?.hours}h{" "}
            {countdowns[nextBooking.id]?.minutes}m {countdowns[nextBooking.id]?.seconds}s
          </p>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">All Upcoming Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoBookings.map((booking) => (
          <div key={booking.id} className="p-4 border rounded shadow-md">
            <h3 className="text-lg font-semibold">{booking.serviceName}</h3>
            <p className="text-gray-600">
              {booking.date} | {booking.startTime} - {booking.endTime}
            </p>
            <p className="text-red-500 font-semibold">
              Countdown: {countdowns[booking.id]?.days}d {countdowns[booking.id]?.hours}h{" "}
              {countdowns[booking.id]?.minutes}m {countdowns[booking.id]?.seconds}s
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotCountdown;
