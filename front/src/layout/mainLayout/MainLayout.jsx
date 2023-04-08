import { Fragment, useEffect, useState } from "react";
import NavBar from "../../components/Navbar/Navbar";
import MyFooter from "../../components/Footer/Footer"
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function MainLayout(props) {
    const location = useLocation();
    const checkPaymentPage = location.pathname === '/payment' ? false : true;
    const isLogin = useSelector(state => state.users.isLogin);
    useEffect(() => {

    }, [isLogin])
    return <Fragment>
        <div className="min-h-screen">
            {checkPaymentPage && <NavBar />}
            <main className="min-h-[400px]">
                {props.children}
            </main>
            {checkPaymentPage && < MyFooter />}
        </div>
    </Fragment>
}
export default MainLayout;