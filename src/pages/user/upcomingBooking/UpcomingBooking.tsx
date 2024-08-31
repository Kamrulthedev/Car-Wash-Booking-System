import React, { useState, useEffect } from "react";
import { Card, List } from "antd";
import dayjs from "dayjs";

// Sample data for upcoming bookings
const demoData = [
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

const calculateTimeRemaining = (date, time) => {
  const now = dayjs();
  const targetTime = dayjs(`${date} ${time}`);
  const diff = targetTime.diff(now);

  const duration = dayjs.duration(diff);
  return `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
};

const UpcomingBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    setBookings(demoData); // Use demo data for upcoming bookings

    // Update countdown timers every second
    const intervalId = setInterval(() => {
      const updatedTimes = {};
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
