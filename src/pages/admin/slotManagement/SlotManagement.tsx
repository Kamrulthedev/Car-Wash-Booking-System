import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  DatePicker,
  TimePicker,
  Popconfirm,
  Typography,
  Select,
  message,
} from "antd";
import {
  useAddSlotMutation,
  useGetSlotsQuery,
  useUpdateSlotMutation,
} from "../../../redux/features/admin/SlotApi";
import {
  useGetServicesQuery,
} from "../../../redux/features/admin/AdminApi";
import { TService } from "../../../types/Service";
import { PlusOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Option } = Select;

interface Slot {
  key: string;
  _id: string;
  service: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const SlotManagement = () => {
  const { data: slotsData, refetch } = useGetSlotsQuery(undefined);
  const { data: servicesData } = useGetServicesQuery(undefined);
  const [addSlot] = useAddSlotMutation();
  const [updateSlotStatus] = useUpdateSlotMutation();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const serviceList: TService[] = servicesData?.data ?? [];

  useEffect(() => {
    if (slotsData && slotsData?.data && serviceList?.length > 0) {
      console.log(slotsData.data)
      const fetchedSlots = slotsData.data.map((slot: any, index: number) => ({
        key: index.toString(),
        _id: slot?._id,
        service: slot?.service ? slot?.service?._id : "",
        serviceName: slot?.service ? slot?.service?.name : "No Service",
        date: slot?.date,
        startTime: slot?.startTime,
        endTime: slot?.endTime,
        isBooked: slot?.isBooked === "booked", 
      }));
      setSlots(fetchedSlots);
    }
  }, [slotsData, serviceList]);

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const ServiceOptions = serviceList.map((item: any) => ({
    value: item?._id,
    label: `${item?.name}`,
  }));

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const selectedService = serviceList.find(
        (service: any) => service?._id === values.service
      );
      if (selectedService) {
        const newSlotData = {
          service: selectedService._id,
          date: values?.date.format("YYYY-MM-DD"),
          startTime: values?.startTime.format("HH:mm"),
          endTime: values?.endTime.format("HH:mm"),
        };
        await addSlot(newSlotData).unwrap();
        message.success("Slot added successfully!");
        refetch();
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error("Failed to add the slot. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleStatus = async (key: string) => {
    const slotToUpdate = slots.find((slot) => slot?.key === key);
    if (!slotToUpdate) return;
    const newStatus = slotToUpdate.isBooked ? "available" : "booked"; 
    try {
      const updateData = {
        id: slotToUpdate._id,
        isBooked: newStatus,
      };
      await updateSlotStatus(updateData).unwrap();
      message.success("Slot status updated successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to update the slot status. Please try again.");
    }
  };
  

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
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      key: "isBooked",
      render: (isBooked: boolean, record: Slot) => (
        <Select
          value={isBooked ? "booked" : "available"}
          onChange={() => toggleStatus(record.key)}
          style={{ width: 120 }}
        >
          <Option value="available">AVAILABLE</Option>
          <Option value="booked">BOOKED</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Slot) => (
        <Popconfirm
          title="Are you sure to change the status of this slot?"
          onConfirm={() => toggleStatus(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">Toggle Status</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Title level={2}>Slot Management</Title>
      <Button type="primary"       icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
        Add Slot
      </Button>
      <Table dataSource={slots} columns={columns} rowKey="_id" />

      <Modal
        title="Add Slot"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: "Please select a service!" }]}
          >
            <Select placeholder="Select a Service" options={ServiceOptions} />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[
              { required: true, message: "Please select the start time!" },
            ]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: "Please select the end time!" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SlotManagement;
