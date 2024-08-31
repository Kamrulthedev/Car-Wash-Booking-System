import React, { useState, useEffect } from "react";
import { Table } from "antd";

// Sample data for past bookings
const demoData = [
  {
    key: "1",
    serviceName: "Car Wash",
    date: "2024-06-15",
    time: "09:00 - 10:00",
    price: "$50",
    status: "Completed",
  },
  {
    key: "2",
    serviceName: "Oil Change",
    date: "2024-06-12",
    time: "11:00 - 12:00",
    price: "$75",
    status: "Completed",
  },
  {
    key: "3",
    serviceName: "Tire Rotation",
    date: "2024-06-10",
    time: "10:00 - 11:00",
    price: "$30",
    status: "Cancelled",
  },
];

const PastBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch past bookings data from the backend or use demo data
    // For now, using demo data
    setBookings(demoData);
  }, []);

  const columns = [
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Past Bookings</h1>
      <Table
        dataSource={bookings}
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default PastBooking;
