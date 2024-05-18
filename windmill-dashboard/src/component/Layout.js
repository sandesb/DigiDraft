import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Form from "./Form1";
const Layout = () => {
    return(
        <div>
        <Header/>
        <div class="body1">
        <Sidebar/>
        
        <Outlet />
        </div>

        </div>

    )
}

export default Layout;