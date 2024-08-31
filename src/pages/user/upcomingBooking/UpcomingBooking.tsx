import React, { useState, useEffect } from "react";
import { Card, List } from "antd";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"; // Import duration plugin for dayjs

dayjs.extend(duration); // Extend dayjs with the duration plugin

// Define the type for booking data
type Booking = {
  key: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  price: string;
};

// Sample data for upcoming bookings
const demoData: Booking[] = [
  {
    key: "1",
    serviceName: "Car Wash",
    date: "2024-09-05",
    startTime: "10:00",
    endTime: "11:00",
    price: "$50",
  },
  {
    key: "2",
    serviceName: "Oil Change",
    date: "2024-09-10",
    startTime: "11:30",
    endTime: "12:30",
    price: "$75",
  },
];

// Function to calculate time remaining
const calculateTimeRemaining = (date: string, time: string): string => {
  const now = dayjs();
  const targetTime = dayjs(`${date} ${time}`);
  const diff = targetTime.diff(now);

  // Use duration to format the difference
  const durationObj = dayjs.duration(diff);

  return `${durationObj.days()}d ${durationObj.hours()}h ${durationObj.minutes()}m ${durationObj.seconds()}s`;
};

const UpcomingBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]); // Use type annotation for bookings
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({}); // Record type for timeRemaining

  useEffect(() => {
    setBookings(demoData); // Set the bookings with demo data

    // Update countdown timers every second
    const intervalId = setInterval(() => {
      const updatedTimes: Record<string, string> = {}; // Initialize as Record

      demoData.forEach((booking) => {
        updatedTimes[booking.key] = calculateTimeRemaining(
          booking.date,
          booking.startTime
        );
      });

      setTimeRemaining(updatedTimes);
    }, 1000);

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Bookings</h1>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={bookings}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.serviceName} className="rounded-lg shadow-md">
              <p>
                <strong>Date:</strong> {item.date}
              </p>
              <p>
                <strong>Time:</strong> {item.startTime} - {item.endTime}
              </p>
              <p>
                <strong>Price:</strong> {item.price}
              </p>
              <p>
                <strong>Time Remaining:</strong> {timeRemaining[item.key]}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UpcomingBooking;
