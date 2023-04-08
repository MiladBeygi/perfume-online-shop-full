import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import Container from "../../layout/Container/Container";
import { shippingInfoSliceActions } from "../../store/slices/shippingInfoSlice";
import { shoppingCartSliceActions } from "../../store/slices/shoppingCartSlice";

function Payment(props) {
    const [isLoading, setIsLoading] = useState(false);
    const shippingInfo = useSelector(state => state.shippingInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const SubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const sendCartResult = await axios.post('http://localhost:3002/orders', shippingInfo);
            const myCart = await sendCartResult.data;
            dispatch(shippingInfoSliceActions.removeShippingInfo());
            dispatch(shoppingCartSliceActions.removeCart());
            navigate('../payment/successful-payment');
        }
        catch (err) {
            console.log(err);
            navigate('../cart')
        }
        finally {
            setIsLoading(false);
        }

    }
    const cancelClickHandler = () => {
        navigate('../payment/failed-payment');
    }
    return <>
        <h1 className="text-right p-5 bg-yellow-400 text-xl font-bold">درگاه پرداخت الکترونیکی سنجاقک</h1>
        <h1 className="text-right p-1 text-md font-bold border-b border-slate-500">اطلاعات کارت  </h1>
        <Container component='form' onSubmit={SubmitHandler}>
            <TextField label='شماره کارت : ' />
            <TextField label='شماره CVV2 :' />
            <TextField label='تاریخ انقضای کارت' />
            <TextField label='رمز دوم' />
            <Button classes=' bg-green-500 w-3/4 hover:bg-green-700' type='submit'>پرداخت</Button>
            <Button onClick={cancelClickHandler} classes=' bg-red-500 w-1/4 hover:bg-red-700'>انصراف</Button>

        </Container>
    </>
}
export default Payment;