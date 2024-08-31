import React, { useState } from "react";
import { Table, Button, Select, Typography, Popconfirm } from "antd";

const { Title } = Typography;
const { Option } = Select;

// Define TypeScript interface for user
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "User" | "Admin";
}

// Mock data for users
const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", role: "User" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", phone: "234-567-8901", role: "Admin" },
  { id: "3", name: "Alice Johnson", email: "alice.johnson@example.com", phone: "345-678-9012", role: "User" },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleRoleChange = (userId: string, newRole: "User" | "Admin") => {
    // Update user role in the state
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
  };

  const toggleUserRole = (userId: string) => {
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
      render: (role: "User" | "Admin", record: User) => (
        <Select
          value={role}
          style={{ width: 120 }}
          onChange={(value: "User" | "Admin") => handleRoleChange(record.id, value)}
        >
          <Option value="User">User</Option>
          <Option value="Admin">Admin</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
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
