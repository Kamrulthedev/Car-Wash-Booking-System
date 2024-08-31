import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { BsFillCalendarFill, BsClockHistory } from "react-icons/bs";
import { MdPersonOutline } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="mt-[62px]">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
            zIndex: 1,
            backgroundColor: "rgb(0, 0, 0)",
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
            <h1 className="uppercase">User Dashboard</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{ backgroundColor: "rgb(0, 0, 0)" }}
          >
            <Menu.Item key="1" icon={<FaHistory />}>
              <Link to="/user/past-bookings">Past Bookings</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<BsClockHistory />}>
              <Link to="/user/upcoming-bookings">Upcoming Bookings</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<MdPersonOutline />}>
              <Link to="/user/account-info">Account Information</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<BsFillCalendarFill />}>
              <Link to="/user/service-slot-countdown">Service Slot Countdown</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0", padding: 12 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default UserDashboard;
