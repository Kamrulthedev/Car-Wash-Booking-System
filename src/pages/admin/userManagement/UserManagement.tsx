import { useState } from "react";
import { Table, Button, Select, Typography, Popconfirm } from "antd";

const { Title } = Typography;
const { Option } = Select;

// Mock data for users
const mockUsers = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", role: "User" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", phone: "234-567-8901", role: "Admin" },
  { id: "3", name: "Alice Johnson", email: "alice.johnson@example.com", phone: "345-678-9012", role: "User" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleRoleChange = (userId, newRole) => {
    // Update user role in the state
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
  };

  const toggleUserRole = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, role: user.role === "User" ? "Admin" : "User" }
          : user
      )
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <Select
          defaultValue={record.role}
          style={{ width: 120 }}
          onChange={(value) => handleRoleChange(record.id, value)}
        >
          <Option value="User">User</Option>
          <Option value="Admin">Admin</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title={`Are you sure you want to change the role of ${record.name} to ${record.role === "User" ? "Admin" : "User"}?`}
          onConfirm={() => toggleUserRole(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">Toggle Role</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Title level={2}>User Management</Title>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </div>
  );
};

export default UserManagement;
