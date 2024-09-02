import { useState, useEffect } from "react";
import { Table } from "antd";
import { useGetMyBookingsQuery } from "../../../redux/features/admin/Bookings";

type Booking = {
  _id: string;
  service: {
    name: string;
  };
  date: string;
  time: string;
  price: string;
  status: string;
};

const PastBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { data , isLoading} = useGetMyBookingsQuery(undefined);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return `${date.toLocaleDateString()}`;
  };

  useEffect(() => {
    if (data && data.data) {
      const bookingData: any = data.data.map((booking: any) => ({
        key: booking._id,
        serviceName: booking.service.name,
        date: formatDate(booking.createdAt),
        time: `${booking.slot.startTime} - ${booking.slot.endTime}`,
        price: booking.service.price,
        status: booking.status,
      }));

      setBookings(bookingData);
    }
  }, [data]);

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
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default PastBooking;
