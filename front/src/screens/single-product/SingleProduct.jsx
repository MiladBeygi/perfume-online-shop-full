import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import useHttp from "../../hooks/use-http";
import { ScentMap } from "../products/Products";
import { shoppingCartSliceActions } from "../../store/slices/shoppingCartSlice";
import AddToCartButtons from "../../components/addToCartButtons/AddToCartButtons";
function GenderMap(value) {
    switch (value) {
        case 'men':
            return 'آقایان';
        case 'women':
            return 'خانم‌ها';
    }
}
function SingleProduct(props) {
    const shoppingCart = useSelector(state => state.shoppingCart);
    const [isInCart, setIsInCart] = useState(false);
    const [indexOfShoppingCart, setIndexOfShoppingCart] = useState(null);
    const dispatch = useDispatch();
    const [product, setProduct] = useState({ image: '', name: '', description: '', brand: '', price: '', id: '', category: '', subCategory: '' })
    const [productForCart, setProductForCart] = useState({ image: '', id: '', name: '', price: '', quantity: 0 })
    const { isLoadingProduct, errorProduct, sendRequest: fetchTasksProduct } = useHttp();
    const params = useParams();
    useEffect(() => {
        fetchTasksProduct({ url: `http://localhost:3002/products/${params.productId}` }, (data) => {
            setProductForCart({ image: data.image, id: data.id, name: data.name, price: data.price, quantity: 1, storageQuantity: data.quantity, category: data.category, subCategory: data.subCategory, brand: data.brand });
            setProduct(data);
        });

        if (shoppingCart?.find((el) => el.id === +params.productId)) {
            setIsInCart(true);
        } else {
            setIsInCart(false)
        }
        const myIndex = shoppingCart.findIndex((el) => el.id === +params.productId);
        setIndexOfShoppingCart(myIndex);
    }, [shoppingCart, isInCart])

    const addToCartHandler = (event) => {
        dispatch(shoppingCartSliceActions.newOrder(productForCart));
    }
    const increaseHandler = (event) => {
        dispatch(shoppingCartSliceActions.increaseOrder(productForCart))

    }
    const decreaseHandler = (event) => {
        dispatch(shoppingCartSliceActions.decreaseOrder(productForCart));
    }
    return <>
        <div className="my-5 text-right border-t border-slate-300 " >
            <Link className="font-bold text-blue-500" to={`../../../../products/${params.category}`} >{GenderMap(params.category)}</Link> / <Link className="font-bold text-blue-500" to={`../../../../products/${params.category}/${params.subCategory}`} >{ScentMap(params.subCategory)}</Link>
        </div>

        <div className="my-5 grid grid-cols-1 md:grid-cols-3">
            <div className="mx-1">
                <img className="w-full rounded-3xl" src={`http://localhost:3002${product.image}`} />
            </div>
            <div className="mx-5 md:col-span-2">
                <h1 className="my-2 py-5 font-bold text-4xl border-b border-slate-300 ">{product.name}</h1>
                <div className="my-2 font-bold text-xl text-right">برند : {product.brand}</div>
                <div className="my-2 font-bold text-xl text-right">تعداد موجود در انبار : <span className="underline">{product.quantity}</span> عدد</div>
                <div className="mx-1 flex flex-col justify-end">

                    <div className="my-5 py-3 bg-slate-300 rounded-2xl">
                        <div className="font-bold text-lg"> قیمت : {(+product.price).toLocaleString('fa-IR')} تومان</div>
                        {!isInCart && <Button onClick={addToCartHandler} classes='w-2/4'>افزودن به سبد خرید</Button>}
                        {isInCart && <AddToCartButtons icreaseClickHandler={increaseHandler} decreaseClickHandler={decreaseHandler}>{

                            shoppingCart[indexOfShoppingCart]?.quantity

                        }</AddToCartButtons>}

                    </div>
                </div>

            </div>
        </div>
        <div className="text-right text-xl p-5 border-t border-slate-300">
            شرح محصول :
            {product.description}
        </div>
    </>
}
export default SingleProduct;