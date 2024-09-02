import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Typography,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "../../../redux/features/admin/AdminApi";
import { message } from "antd";

const { Title } = Typography;

interface Service {
  _id: string;
  key?: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
}

const ServiceManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  const { data, refetch } = useGetServicesQuery(undefined);
  const [addService] = useAddServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setServices(data?.data as Service[]);
    }
  }, [data]);

  const showModal = (
    editMode: boolean = false,
    service: Service | null = null
  ) => {
    setIsEditMode(editMode);
    setCurrentService(service);
    if (editMode && service) {
      form.setFieldsValue(service);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEditMode && currentService) {
        // Update existing service
        await updateService({ id: currentService._id, ...values }).unwrap();
        message.success("Service updated successfully!");
      } else {
        // Add new service
        await addService(values).unwrap();
        message.success("Service added successfully!");
      }
      refetch();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save the service. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      message.error("ID Is Undefined");
      return;
    }
    message.error(`Deleting service with ID: ${id}`);
    try {
      await deleteService(id).unwrap();
      refetch();
    } catch (error) {
      message.error(`Delete failed ${error}`);
    }
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Duration (min)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Service) => (
        <span>
          {!record.isDeleted && (
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showModal(true, record)}
              />
              <Popconfirm
                title="Are you sure to delete this service?"
                onConfirm={() => handleDelete(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" icon={<DeleteOutlined />} />
              </Popconfirm>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Title level={2}>Service Management</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Service
      </Button>
      <Table
        dataSource={services.filter((service) => !service.isDeleted)}
        columns={columns}
        rowKey="key"
      />

      <Modal
        title={isEditMode ? "Edit Service" : "Add Service"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Service Name"
            rules={[
              { required: true, message: "Please input the service name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration (min)"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManagement;
