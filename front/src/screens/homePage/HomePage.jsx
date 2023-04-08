
import axios from "axios";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Card from "../../components/card/Card";
import MyCarousel from "../../components/Carousel/Carousel";
import HomeCards from "../../components/homeCards/HomeCards";
import useHttp from "../../hooks/use-http";
import useFilterAndSort from '../../hooks/useFilterAndSort';

function HomePage(props) {
    const [productArray, setProductArray] = useState([{ name: '', brand: '', description: '', image: [] }]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();
    //what we need for filtering  data
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    useEffect(() => {

        fetchTasks({ url: 'http://localhost:3002/products' }, (data) => setProductArray(data))
    }, []);
    const sortedArray = useFilterAndSort(productArray, queryParams.get("sort"), queryParams.get("filter"))
    return <>
        <MyCarousel />

        <div className="text-right my-5 text-blue-500 text-lg font-bold px-2 underline"><Link to='/products/men'>عطرهای آقایان </Link></div>
        <div className="flex flex-col sm:flex-row   my-5 p-5 overflow-x-auto border rounded-xl">
            {sortedArray.map((el, i) => {
                if (el.category === "men") {
                    return <div key={i + 1} className=""><HomeCards imgSrc={`http://localhost:3002${el.image}`} name={el.name} description={el.description} brand={el.brand} price={Number(el.price)} id={el.id} category={el.category} subCategory={el.subCategory} /></div>
                }
            })}

        </div>
        <div className="text-right my-5 text-blue-500 text-lg font-bold px-2 underline"><Link to='/products/women'>عطرهای بانوان </Link></div>
        <div className="flex flex-col  sm:flex-row  my-5 p-5 overflow-x-auto border rounded-xl">
            {sortedArray.map((el, i) => {
                if (el.category === "women") {
                    return <div key={i + 1} className=""><HomeCards imgSrc={`http://localhost:3002${el.image}`} name={el.name} description={el.description} brand={el.brand} price={Number(el.price)} id={el.id} category={el.category} subCategory={el.subCategory} /></div>
                }
            })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* {productArray.map((el, i) => <Card imgSrc={`http://localhost:3002${el.image}`} name={el.name} description={el.description} brand={el.brand} />)} */}
            {isLoading && <Spinner size='xl' />}
            {error && <p>{error}</p>}

        </div>
    </>
}
export default HomePage;