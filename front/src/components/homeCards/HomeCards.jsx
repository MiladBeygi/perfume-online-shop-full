import { Link } from "react-router-dom";

function HomeCards(props) {
    const { name, imgSrc, brand, category, subCategory, price, id } = props;
    return <>
        <div className={`mx-2 sm:w-[200px] sm:h-[500px] flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  justify-between items-center`}>
            <Link className="flex justify-center w-full " to={`${category}/${subCategory}/${id}`}>
                <img className="rounded-t-lg w-full" src={imgSrc} alt="photo" />
            </Link>
            <div className="p-5 flex flex-col justify-around">
                <Link to={`${category}/${subCategory}/${id}`}>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400  overflow-y-hidden ">{brand}</p>
                <p className="text-right my-2 font-bold">{price.toLocaleString('fa-IR')} تومان </p>
                <Link to={`${category}/${subCategory}/${id}`} className="w-full block items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    مشاهده محصول
                </Link>
            </div>
        </div>
    </>
}
export default HomeCards;