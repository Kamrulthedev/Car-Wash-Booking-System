import { useState, useEffect } from "react";
import { Card, List } from "antd";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useGetMyPendingBookingsQuery } from "../../../redux/features/admin/Bookings";

dayjs.extend(duration);

// Define the type for booking data
type Booking = {
  key: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  price: string;
};

const calculateTimeRemaining = (date: string, time: string): string => {
  const now = dayjs();
  const targetTime = dayjs(`${date} ${time}`);
  const diff = targetTime.diff(now);

  const durationObj = dayjs.duration(diff);
  return `${durationObj.days()}d ${durationObj.hours()}h ${durationObj.minutes()}m ${durationObj.seconds()}s`;
};

const UpcomingBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({});

  const { data, isLoading } = useGetMyPendingBookingsQuery(undefined);

  useEffect(() => {
    if (data && data?.data) {
      const transformedData = data?.data?.map((booking: any) => ({
        key: booking?._id,
        serviceName: booking?.service?.name || "No Service",
        date: booking?.slot?.date, 
        startTime: booking?.slot?.startTime, 
        endTime: booking?.slot?.endTime,
        price: `$${booking?.service?.price}`, 
      }));

      setBookings(transformedData);

      // Initialize time remaining calculation for each booking
      const updatedTimes: Record<string, string> = {};
      transformedData.forEach((booking) => {
        updatedTimes[booking?.key] = calculateTimeRemaining(
          booking?.date,
          booking?.startTime
        );
      });

      setTimeRemaining(updatedTimes);
    }
  }, [data]);

  useEffect(() => {
    // Update countdown timers every second
    const intervalId = setInterval(() => {
      const updatedTimes: Record<string, string> = {};

      bookings.forEach((booking) => {
        updatedTimes[booking?.key] = calculateTimeRemaining(
          booking?.date,
          booking?.startTime
        );
      });

      setTimeRemaining(updatedTimes);
    }, 1000);

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [bookings]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Bookings</h1>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={bookings}
        loading={isLoading}
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