import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddToCartButtons from "../../components/addToCartButtons/AddToCartButtons";
import Button from "../../components/Button/Button";
import { shoppingCartSliceActions } from "../../store/slices/shoppingCartSlice";

function Cart(props) {
    const shoppingCart = useSelector(state => state.shoppingCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const buyProcess = (event) => {
        navigate('buy-process')
    }
    const emptyCart = () => {
        return (<div className="my-[125px] text-2xl font-bold">
            سبد خرید شما خالی است
        </div>);
    }
    const cart = () => {
        return <>
            <div className="md:mx-[100px] md:max-h-[500px] md:overflow-y-auto ">
                <h1 className="text-right text-xl font-bold my-2">سبد خرید شما:</h1>
                {shoppingCart.map((el, index) => {
                    return <div key={index + 1} className="flex flex-col md:flex-row items-center justify-between  md:h-[100px] bg-slate-200 rounded-3xl my-2 px-2" >
                        <div className="py-1 md:h-full">
                            <Link to={`../products/${el.category}/${el.subCategory}/${el.id}`}>
                                <img className="md:h-full rounded-3xl" src={`http://localhost:3002${el.image}`} />
                            </Link>

                        </div>
                        <div className="mx-2 text-xl font-bold">
                            <Link to={`../products/${el.category}/${el.subCategory}/${el.id}`}>
                                <div>
                                    {el.brand}
                                </div>
                            </Link>
                            <div>
                                قیمت : {(+el.price).toLocaleString('fa-IR')} تومان
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center">

                            <Button classes='bg-slate-200 text-slate-900 hover:bg-slate-300 mx-2' onClick={() => dispatch(shoppingCartSliceActions.removeOrder({ id: el.id }))}><i className="fa fa-trash text-red-600"></i> </Button>
                            <AddToCartButtons icreaseClickHandler={() => dispatch(shoppingCartSliceActions.increaseOrder({ id: el.id, storageQuantity: el.storageQuantity }))} decreaseClickHandler={() => dispatch(shoppingCartSliceActions.decreaseOrder({ id: el.id }))}>
                                {shoppingCart[index]?.quantity}
                            </AddToCartButtons>
                            <div className="text-xl font-bold mx-1">
                                مجموع :
                                <span className="px-2">{(el.quantity * el.price).toLocaleString('fa-IR')}</span>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
            <div className="md:mx-[100px] flex flex-col justify-between items-center md:flex-row">
                <div className="w-full">
                    <Button onClick={buyProcess} classes='w-full md:w-2/4'>ادامه فرایند خرید</Button>
                </div>
                <div className="text-xl font-bold mx-1 ">
                    مجموع قیمت‌ها : {shoppingCart.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0).toLocaleString('fa-IR')}
                </div>
            </div>
        </>
    }
    return <>
        {shoppingCart.length === 0 ? emptyCart() : cart()}
    </>
}
export default Cart;