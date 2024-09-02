import { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";
import { useGetAllBookingsQuery } from "../../../redux/features/admin/Bookings";

// Define a type for booking data
type Booking = {
  id: string;
  userName: string;
  service: string;
  date: string;
  timeSlot: string;
};

const AllBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetAllBookingsQuery(undefined);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (isError) {
      setError("Failed to fetch bookings");
      setLoading(false);
    } else if (data && data?.data) {
      const AllBOokindatas: Booking[] = data?.data?.map((booking: any) => ({
        id: booking?._id,
        userName: booking?.customer?.name, 
        service: booking?.service?.name, 
        date: booking?.slot?.date, 
        timeSlot: `${booking?.slot?.startTime} - ${booking?.slot?.endTime}`
      }));
      setBookings(AllBOokindatas);
      setLoading(false);
    }
  }, [data, isLoading, isError]);

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
  ];

  if (loading) return <Spin size="large" className="flex justify-center" />;
  if (error) return <Alert message={error} type="error" />;

  return <Table loading={isLoading} columns={columns} dataSource={bookings} rowKey="id" />;
};

export default AllBookings;