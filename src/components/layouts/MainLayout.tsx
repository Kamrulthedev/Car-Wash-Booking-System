import { Outlet } from "react-router-dom";
import Navber from "../../pages/home/shared/navber/Navber";
import Footer from "../../pages/home/shared/footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navber/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;