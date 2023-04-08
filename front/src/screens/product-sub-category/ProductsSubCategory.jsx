import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Pagination, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import MyCard from '../../components/card/Card.jsx';
import { ScentMap, sortProducts } from "../products/Products";
import useFilterAndSort from "../../hooks/useFilterAndSort";

function ProductsSubCategory(props) {

    //what we need for filtering via query params
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    //what we need to initialize products Array
    const [productArray, setProductArray] = useState([{ name: '', brand: '', description: '', image: [] }]);


    // what we need for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
    const visitedPosts = (currentPage - 1) * postsPerPage;

    // what we need for fetching data of products and sub products for sid bar
    const [subCategoryArray, setsubCategoryArray] = useState([{ category: '' }]);
    const { isLoadingProducts, errorProducts, sendRequest: fetchTasksProducts } = useHttp();

    const { isLoadingSubCategory, errorSubCategory, sendRequest: fetchTasksSubCategory } = useHttp();
    useEffect(() => {
        // axios.get('http://localhost:3002/products').then(res => res.json()).then(data => console.log(data));
        // fetch('http://localhost:3002/products').then(res => res.json()).then((data) => {
        //     setProductArray(data);
        //     console.log(data);
        // }).catch(err => console.error(err));
        fetchTasksProducts({ url: 'http://localhost:3002/products' }, (data) => setProductArray(data))

        fetchTasksSubCategory({ url: 'http://localhost:3002/subcategory' }, data => setsubCategoryArray(data))
    }, []);


    const subsCategoryArray = productArray.filter((el) => (el.category === params.category) && (el.subCategory === params.subCategory));
    //sort products
    // const sortedProducts = sortProducts(subsCategoryArray, queryParams.get('sort'));
    const sortedProducts = useFilterAndSort(subsCategoryArray, queryParams.get("sort"), queryParams.get("filter"));


    //change handler for select HTML tag for filtering products
    const changeHandler = (event) => {
        navigate(`?sort=${event.target.value}&filter=${queryParams.get("filter")}`, { replace: true });
    }

    //change Handler for pagination
    const onPageChange = (number) => {
        console.log(number);
        setCurrentPage(number)
    }
    return <>
        <div className="mb-3 flex items-center" dir="ltr">

            <select id="prod-filter" className="block border-none rounded-xl" onChange={changeHandler}>
                <option value='none'>----</option>
                <option value='most-expensive'>گرانترین</option>
                <option value='cheapest'>ارزانترین</option>
                <option value='newest'>جدیدترین</option>
            </select>
            <label htmlFor="prod-filter" >   : فیلترها</label>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
            <div className="p-2  w-full  h-[350px] col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 border border-gray-500 rounded-xl">
                <h1 className=" text-right font-bold border-b border-gray-500 my-2 py-2">دسته بندی:</h1>
                {params.category === 'men' && <ul className="font-bold mb-5">
                    {isLoadingSubCategory && <Spinner />}
                    {errorSubCategory && <p>{errorSubCategory}</p>}
                    آقایان :
                    {subCategoryArray.map((el, i) => {
                        if (el.category === 'men' && el.subCategory === params.subCategory) {
                            return <li key={i + 1} >
                                {ScentMap(el.subCategory)
                                }
                            </li>
                        }
                    })}
                </ul>}


                {params.category === 'women' && <ul className="font-bold mt-5">
                    {isLoadingSubCategory && <Spinner />}
                    خانم‌ها :
                    {subCategoryArray.map((el, i) => {
                        if (el.category === 'women' && el.subCategory === params.subCategory) {
                            return <li key={i + 1}>
                                {ScentMap(el.subCategory)
                                }
                            </li>
                        }
                    })}
                </ul>}

            </div>
            <div className=" p-2 w-full sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-4 border border-gray-500 rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">

                    {sortedProducts.slice(visitedPosts, currentPage * postsPerPage).map((el, i) => < MyCard key={i + 1} imgSrc={`http://localhost:3002${el.image}`} name={el.name} description={el.description} brand={el.brand} price={Number(el.price)} id={el.id} category={el.category} subCategory={el.subCategory} linkPath={`${el.id}`} />)}
                    {isLoadingProducts && <Spinner size='xl' />}
                    {errorProducts && <p>{errorProducts}</p>}

                </div>
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
export default ProductsSubCategory;