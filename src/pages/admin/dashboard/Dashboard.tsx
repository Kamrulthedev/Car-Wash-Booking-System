import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { BsFillCalendarFill } from "react-icons/bs";
import { GrUnorderedList } from "react-icons/gr";
import { MdCreateNewFolder, MdManageAccounts } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          zIndex: 1,
          backgroundColor: "rgb(15 23 42)",
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={() => {}}
        onCollapse={() => {}}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="uppercase">Admin Dashboard</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "rgb(15 23 42)" }}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<GrUnorderedList />}>
            <Link to="/admin/bookings">Recent Bookings</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<MdCreateNewFolder />}>
            <Link to="/admin/servicesManagement">Service Management</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BsFillCalendarFill />}>
            <Link to="/admin/slotsManagement">Slot Management</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<MdManageAccounts />}>
            <Link to="/admin/usersManagement">User Management</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}> {/* Adjust marginLeft to account for fixed Sider */}
        <Content style={{ margin: "24px 16px 0", padding: 12 }}>
          <Outlet />
          {/* Content should now appear directly under the header */}
        </Content>
      </Layout>
    </Layout>
  </div>
  );
};

export default Dashboard;
