import { useEffect, useState } from "react";
import { Table, Typography, Spin, Alert } from "antd";

const { Title } = Typography;

// Demo data
const demoBookings = [
  {
    id: "1",
    userName: "John Doe",
    service: "Full Car Wash",
    date: "2024-08-15",
    timeSlot: "10:00 AM - 11:00 AM",
    status: "Confirmed",
  },
  {
    id: "2",
    userName: "Jane Smith",
    service: "Interior Cleaning",
    date: "2024-08-16",
    timeSlot: "11:00 AM - 12:00 PM",
    status: "Pending",
  },
  {
    id: "3",
    userName: "Alice Johnson",
    service: "Exterior Wash",
    date: "2024-08-17",
    timeSlot: "12:00 PM - 01:00 PM",
    status: "Cancelled",
  },
  {
    id: "4",
    userName: "Bob Brown",
    service: "Complete Detail",
    date: "2024-08-18",
    timeSlot: "01:00 PM - 02:00 PM",
    status: "Confirmed",
  },
];

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        // Here we're using the demo data
        setBookings(demoBookings);
      } catch (error) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time Slot",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;

  return <Table  columns={columns} dataSource={bookings} />;
};

export default AllBookings;
