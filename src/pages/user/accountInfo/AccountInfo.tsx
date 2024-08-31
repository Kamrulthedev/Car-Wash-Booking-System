
import { useState } from "react";
import { Button, Input, Form, Avatar } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

const AccountInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  
  // Sample user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, Springfield",
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (values : any) => {
    console.log("Updated values:", values);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-md shadow-md">
      <div className="flex items-center mb-6">
        <Avatar size={64} icon={<UserOutlined />} />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="mt-2"
            onClick={handleEditClick}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Form
          form={form}
          layout="vertical"
          initialValues={userData}
          onFinish={handleFormSubmit}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item name="address" label="Address">
            <Input placeholder="Enter your address" />
          </Form.Item>

          <div className="flex justify-end space-x-4">
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      ) : (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Email</h2>
            <p>{userData.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Phone</h2>
            <p>{userData.phone}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Address</h2>
            <p>{userData.address}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
