import React, { useState } from "react";
import { Table, Button, Select, Typography, Popconfirm, message } from "antd";
import { useGetUsersQuery, useUpdateUSerMutation } from "../../../redux/features/admin/UserManagementApi";
import { TUser } from "../../../types/User";

const { Title } = Typography;
const { Option } = Select;

const UserManagement: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery(undefined); 
  const [updateUser] = useUpdateUSerMutation(); 
  const [users, setUsers] = useState<TUser[]>([]);

  React.useEffect(() => {
    if (data) {
      setUsers(data?.data || []);
    }
  }, [data]);
  

  const handleRoleChange = async (userId: string, newRole: "user" | "admin") => {
    try {
      await updateUser({ id: userId, role: newRole }).unwrap(); 
      message.success("User role updated successfully!");
      refetch();
    } catch (err) {
      message.error("Failed to update user role. Please try again.");
    }
  };

  const toggleUserRole = async (userId: string) => {
    const user = users?.find((u) => u?._id === userId); 
    if (!user) return;
    const newRole = user.role === "user" ? "admin" : "user";
    try {
      await handleRoleChange(userId, newRole);
    } catch (err) {
      message.error("Failed to toggle user role. Please try again.");
    }
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
      render: (role: "user" | "admin", record: TUser) => (
        <Select
          value={role}
          style={{ width: 120 }}
          onChange={(value: "user" | "admin") => handleRoleChange(record._id, value)}
        >
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: TUser) => (
        <Popconfirm
          title={`Are you sure you want to change the role of ${record.name} to ${record.role === "user" ? "admin" : "user"}?`}
          onConfirm={() => toggleUserRole(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">Toggle Role</Button>
        </Popconfirm>
      ),
    },
  ];
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users.</div>;

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Title level={2}>User Management</Title>
      <Table loading={isLoading} dataSource={users} columns={columns} rowKey="id" />
    </div>
  );
};

export default UserManagement;
