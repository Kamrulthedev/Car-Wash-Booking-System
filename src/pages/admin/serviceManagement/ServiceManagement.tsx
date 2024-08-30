import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, Typography } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

// Demo data
const demoServices = [
  {
    key: "1",
    name: "Full Car Wash",
    description: "Complete car cleaning including interior and exterior.",
    price: 50,
    duration: 60,
    isDeleted: false,
  },
  {
    key: "2",
    name: "Interior Cleaning",
    description: "Thorough cleaning of car interiors.",
    price: 30,
    duration: 45,
    isDeleted: false,
  },
];

const ServiceManagement = () => {
  const [services, setServices] = useState(demoServices);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [form] = Form.useForm();

  const showModal = (editMode = false, service = null) => {
    setIsEditMode(editMode);
    setCurrentService(service);
    if (editMode && service) {
      form.setFieldsValue(service);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (isEditMode) {
        // Update service
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.key === currentService.key ? { ...service, ...values } : service
          )
        );
      } else {
        // Add new service
        const newService = {
          key: (services.length + 1).toString(),
          isDeleted: false,
          ...values,
        };
        setServices([...services, newService]);
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (key) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.key === key ? { ...service, isDeleted: true } : service
      )
    );
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
      render: (_, record) => (
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
                onConfirm={() => handleDelete(record.key)}
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
            rules={[{ required: true, message: "Please input the service name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the description!" }]}
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
