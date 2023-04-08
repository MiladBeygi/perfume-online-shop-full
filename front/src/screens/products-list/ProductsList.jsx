import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AdminProductsCard from "../../components/admin-products-card/AdminProductsCard";
import useHttp from "../../hooks/use-http";
import AdminButtonGroups from "../../layout/button-groups/AdminButtonGroups";
import { productsSliceActions } from "../../store/slices/productsSlice";
import './productsList.css';



function sortProducts(products, sortMethod, filterMethod) {
    if (sortMethod === 'cheapest') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            return searchProducts.sort((a, b) => a.price - b.price)
        }
        return products.sort((a, b) => a.price - b.price);
    } else if (sortMethod === 'most-expensive') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            return searchProducts.sort((a, b) => b.price - a.price)
        }
        return products.sort((a, b) => b.price - a.price)
    } else if (sortMethod === 'newest') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            return searchProducts.sort((a, b) => b.createdAt - a.createdAt)
        }
        return products.sort((a, b) => b.createdAt - a.createdAt)
    } else if (sortMethod === 'men') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            const menProducts = searchProducts.filter((el) => el.category === 'men');
            return menProducts;
        }
        const menProducts = products.filter((el) => el.category === 'men')
        return menProducts;
    } else if (sortMethod === 'women') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            const womenProducts = searchProducts.filter((el) => el.category === 'women');
            return womenProducts;
        }
        const womenProducts = products.filter((el) => el.category === 'women')
        return womenProducts;
    } else if (sortMethod === 'none' || sortMethod === 'null') {
        if (filterMethod !== 'null') {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            return searchProducts;
        }
        return products;
    } else {
        return products;
    }
}
function ProductsList(props) {
    //what we need for navigating between routes
    const navigate = useNavigate();

    const isLogin = useSelector(state => state.users.isLogin);


    //what we need for filtering via query params
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    //what we need to initialize products Array
    const [productArray, setProductArray] = useState([{ name: '', brand: '', description: '', image: [] }]);


    // what we need for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const visitedPosts = (currentPage - 1) * postsPerPage;

    const dispatch = useDispatch();
    const [changeId, setChangeId] = useState(null);
    const { isLoadingProducts, errorProducts, sendRequest: fetchTasksProducts } = useHttp();
    const products = useSelector(state => state.products);

    //change handler for select HTML tag for filtering products
    const changeHandler = (event) => {
        navigate(`?sort=${event.target.value}&filter=${queryParams.get("filter")}`, { replace: true });
        setCurrentPage(1);
    };

    //change Handler for pagination
    const onPageChange = (number) => {
        // console.log(number);
        setCurrentPage(number);
    };

    //sort products
    const sortedProducts = sortProducts(productArray, queryParams.get('sort'), queryParams.get('filter'));

    const changIDHandler = (input) => {
        setChangeId(input);
    }
    useEffect(() => {
        if (!isLogin) {
            navigate("../login")
        }
        fetchTasksProducts({ url: "http://localhost:3002/products" }, (data) => {
            setProductArray(data);
            dispatch(productsSliceActions.setProducts(data));
        });

    }, [changeId, productArray])
    return <>
        <AdminButtonGroups />
        <div className='w-full' >
            <div className="mb-3 flex items-center" dir="ltr">
                <select id="prod-filter" className="block border-none rounded-xl" onChange={changeHandler}>
                    <option value='none'>----</option>
                    <option value='most-expensive'>گرانترین</option>
                    <option value='cheapest'>ارزانترین</option>
                    <option value='newest'>جدیدترین</option>
                    <option value='men'>آقایان</option>
                    <option value='women'>خانم‌ها</option>
                </select>
                <label htmlFor="prod-filter" >   : فیلترها</label>
            </div>
            <div className="w-fit sm:w-full">
                {sortedProducts.slice(visitedPosts, currentPage * postsPerPage).map((el, i) => {
                    return <AdminProductsCard key={i + 1} img={el.image} name={el.name} price={(+el.price)} category={el.category} subCategory={el.subCategory} id={el.id} quantity={el.quantity} changingID={changIDHandler} brand={el.brand} description={el.description} />
                })}
            </div>
        </div >
        {sortedProducts.length > postsPerPage && <div dir="ltr">
            <div className="pagination flex items-center justify-center text-center focus:bg-sky-500">
                <Pagination
                    currentPage={currentPage}
                    layout="pagination"
                    onPageChange={onPageChange}
                    showIcons={true}
                    totalPages={Math.ceil(sortedProducts.length / postsPerPage)}
                    previousLabel="صفحه قبل"
                    nextLabel="صفحه بعد"
                    active={currentPage}
                />
            </div>
        </div>}
    </>
}
export default ProductsList;