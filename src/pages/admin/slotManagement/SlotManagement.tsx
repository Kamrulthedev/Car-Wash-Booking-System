import { useState } from "react";
import { Table, Button, Modal, Form, DatePicker, TimePicker, Popconfirm, Typography, Select } from "antd";
import { SelectValue } from "antd/es/select";

const { Title } = Typography;
const { Option } = Select;

// Define TypeScript interfaces
interface Service {
  id: string;
  name: string;
}

interface Slot {
  key: string;
  service: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "AVAILABLE" | "CANCELLED";
  isBooked: boolean;
}

// Mock data for services
const serviceList: Service[] = [
  { id: "6680fa6501b460a41f03274f", name: "Car Wash" },
  { id: "6680fa6501b460a41f032750", name: "Oil Change" },
  { id: "6680fa6501b460a41f032751", name: "Tire Replacement" },
];

// Demo data for slots
const demoSlots: Slot[] = [
  {
    key: "1",
    service: "6680fa6501b460a41f03274f",
    serviceName: "Car Wash",
    date: "2024-06-15",
    startTime: "09:00",
    endTime: "14:00",
    status: "AVAILABLE",
    isBooked: false,
  },
  {
    key: "2",
    service: "6680fa6501b460a41f03274f",
    serviceName: "Car Wash",
    date: "2024-06-16",
    startTime: "10:00",
    endTime: "15:00",
    status: "AVAILABLE",
    isBooked: true,
  },
];

const SlotManagement = () => {
  const [slots, setSlots] = useState<Slot[]>(demoSlots);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const selectedService = serviceList.find((service) => service.id === values.service);
      if (selectedService) {
        const newSlot: Slot = {
          key: (slots.length + 1).toString(),
          service: selectedService.id,
          serviceName: selectedService.name,
          status: "AVAILABLE",
          isBooked: false,
          date: values.date.format("YYYY-MM-DD"),
          startTime: values.startTime.format("HH:mm"),
          endTime: values.endTime.format("HH:mm"),
        };
        setSlots([...slots, newSlot]);
        setIsModalVisible(false);
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleStatus = (key: string) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.key === key && !slot.isBooked
          ? { ...slot, status: slot.status === "AVAILABLE" ? "CANCELLED" : "AVAILABLE" }
          : slot
      )
    );
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
      dataIndex: "status",
      key: "status",
      render: (status: "AVAILABLE" | "CANCELLED", record: Slot) => (
        <Select
          value={status}
          onChange={(value: SelectValue) => {
            const newStatus = value as "AVAILABLE" | "CANCELLED";
            if (newStatus !== status) {
              toggleStatus(record.key);
            }
          }}
          disabled={record.isBooked}
          style={{ width: 120 }}
        >
          <Option value="AVAILABLE">AVAILABLE</Option>
          <Option value="CANCELLED">CANCELLED</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Slot) => (
        <span>
          {!record.isBooked && (
            <Popconfirm
              title="Are you sure to change the status of this slot?"
              onConfirm={() => toggleStatus(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">Toggle Status</Button>
            </Popconfirm>
          )}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Title level={2}>Slot Management</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Slot
      </Button>
      <Table dataSource={slots} columns={columns} rowKey="key" />

      <Modal title="Add Slot" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: "Please select a service!" }]}
          >
            <Select placeholder="Select a Service">
              {serviceList.map((service) => (
                <Option key={service.id} value={service.id}>
                  {service.name}
                </Option>
              ))}
            </Select>
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
            rules={[{ required: true, message: "Please select the start time!" }]}
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
