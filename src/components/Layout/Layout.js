import { Outlet } from "react-router-dom";
import Alert from "../Alert/Alert";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import {useGlobalContext}  from '../../context/context'

const Layout = () => {
    const {alert} = useGlobalContext();
    
    return (
        <>
            <Navbar />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
            {alert.show && <Alert />}
        </>
    )
}

export default Layout;
