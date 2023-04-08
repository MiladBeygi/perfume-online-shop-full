import axios from "axios";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AdminOrderCard from "../../components/admin-order-card/AdminOrderCard";
import useHttp from "../../hooks/use-http";
import AdminButtonGroups from "../../layout/button-groups/AdminButtonGroups";

function sortOrders(orders, method) {
    if (method === 'delivered') {
        const deliveredOrders = orders.filter((el) => el.delivered);
        return deliveredOrders
    } else if (method === 'pending') {
        const pendingOrders = orders.filter((el) => !el.delivered);
        return pendingOrders
    } else if (method === 'newest') {
        return orders.sort((a, b) => b.createdAt - a.createdAt)
    } else {
        return orders;
    }
}
function OrdersList(props) {
    //what we need for navigating between routes
    const navigate = useNavigate();

    const isLogin = useSelector(state => state.users.isLogin);

    //what we need for filtering via query params
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [orderArray, setOrderArray] = useState([]);
    const [myObj, setMyobj] = useState({});
    const [blur, setBlur] = useState(true);
    const { isLoadingProducts, errorProducts, sendRequest: fetchTasksProducts } = useHttp();
    const changeHandler = (event) => {
        navigate(`?sort=${event.target.value}`, { replace: true });
        setCurrentPage(1);
    }

    // what we need for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const visitedPosts = (currentPage - 1) * postsPerPage;
    //change Handler for pagination
    const onPageChange = (number) => {
        // console.log(number);
        setCurrentPage(number);
    };

    const sortedOrders = sortOrders(orderArray, queryParams.get("sort"));
    const editedObj = (value) => {
        // console.log(value);
        setMyobj(value)
    };

    useEffect(() => {
        if (!isLogin) {
            navigate("../login")
        }
        fetchTasksProducts({ url: "http://localhost:3002/orders" }, (data) => {
            setOrderArray(data);
        });
    }, [myObj])

    return <>
        <AdminButtonGroups />
        <div className="mb-3 flex items-center" dir="ltr">
            <select id="prod-filter" className="block border-none rounded-xl" onChange={changeHandler}>
                <option value='none'>----</option>
                <option value='delivered'>تحویل شده‌ها</option>
                <option value='pending'>در حال انتظار</option>
                <option value='newest'>جدیدترین</option>
            </select>
            <label htmlFor="prod-filter" >   : فیلترها</label>
        </div>
        {sortedOrders.slice(visitedPosts, currentPage * postsPerPage).map((el, i) => {
            return <div className='' key={i + 1}>
                <AdminOrderCard id={el.id} firstName={el.firstName} lastName={el.lastName} totalPrice={el.totalPrice} address={el.address} phone={el.phone} expectAt={el.expectAt} createdAt={el.createdAt} products={el.products} delivered={el.delivered} passedObj={editedObj} />
            </div>
        })}
        {sortedOrders.length > postsPerPage && <div dir="ltr">
            <div className="pagination flex items-center justify-center text-center focus:bg-sky-500">
                <Pagination
                    currentPage={currentPage}
                    layout="pagination"
                    onPageChange={onPageChange}
                    showIcons={true}
                    totalPages={Math.ceil(sortedOrders.length / postsPerPage)}
                    previousLabel="صفحه قبل"
                    nextLabel="صفحه بعد"
                    active={currentPage}
                />
            </div>
        </div>}

    </>
}
export default OrdersList;