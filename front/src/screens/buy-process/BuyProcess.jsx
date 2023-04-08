import axios from "axios";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import useInput from "../../hooks/use-input";
import Container from "../../layout/Container/Container";
import { shippingInfoSliceActions } from "../../store/slices/shippingInfoSlice";

function BuyProcess(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const shippingInfo = useSelector(state => state.shippingInfo)
    const shoppingCart = useSelector(state => state.shoppingCart);
    const { value: firstName,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameInputblurHandler,
        reset: firstNameReset } = useInput(value => value.length >= 2);
    const { value: lastName,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameInputblurHandler,
        reset: lastNameReset } = useInput(value => value.length >= 2);
    const { value: phone,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneInputblurHandler,
        reset: phoneReset } = useInput(value => (value.length === 11) && value.startsWith('09'));
    const { value: expectTime,
        isValid: expectTimeIsValid,
        hasError: expectTimeHasError,
        valueChangeHandler: expectTimeChangeHandler,
        inputBlurHandler: expectTimeInputblurHandler,
        reset: expectTimeReset } = useInput(value => ((new Date(value)).getTime() - Date.now()) > 86400000);
    const { value: address,
        isValid: addressIsValid,
        hasError: addressHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressInputblurHandler,
        reset: addressReset } = useInput(value => value.length >= 15);

    const formIsValid = addressIsValid && expectTimeIsValid && phoneIsValid && lastNameIsValid && firstNameIsValid;



    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        const newObj = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            expectAt: (new Date(expectTime)).getTime(),
            products: shoppingCart,
            totalPrice: shoppingCart.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0),
            delivered: false
        }
        dispatch(shippingInfoSliceActions.newShipping(newObj));
        navigate('../../payment');
        setIsLoading(false);
    }
    return <Container screen='[500px]' component='form' onSubmit={submitHandler}>
        {/* {console.log(shoppingCart)} */}
        {/* {console.log(shippingInfo)} */}
        <h1 className="text-right text-xl font-bold">مشخصات گیرنده</h1>
        <div className="mx-2 grid grid-cols-1 md:grid-cols-2">
            <div className="mx-2">
                <TextField value={firstName} onChange={firstNameChangeHandler} onBlur={firstNameInputblurHandler} label='نام' id='first-name' placeholder='نام  گیرنده را وارد کنید' />
                {firstNameHasError && <span className="text-red-500">نام  باید بیشتر از دو حرف باشد</span>}
            </div>
            <div className="mx-2">
                <TextField value={lastName} onChange={lastNameChangeHandler} onBlur={lastNameInputblurHandler} label='نام خانوادگی' id='last-name' placeholder='نام خانوادگی گیرنده را وارد کنید' />
                {lastNameHasError && <span className="text-red-500">نام خانوادگی  باید بیشتر از دو حرف باشد</span>}
            </div>
            <div className="mx-2">
                <TextField value={phone} onChange={phoneChangeHandler} onBlur={phoneInputblurHandler} type='tel' label='شماره تماس' id='phone' placeholder='شماره تماس گیرنده را وارد کنید' />
                {phoneHasError && <span className="text-red-500">شماره تماس همراه باید 11 رقم باشد و با 09 شروع شود</span>}
            </div>
            <div className="mx-2">
                <TextField value={expectTime} onChange={expectTimeChangeHandler} onBlur={expectTimeInputblurHandler} type='date' label='زمان تحویل' id='expect-time' />
                {expectTimeHasError && <span className="text-red-500">زمان  تحویل کالا باید حداقل یک روز بعد از زمان ثبت سفارش باشد </span>}
            </div>
            <div className="mx-2 md:col-span-2">
                <TextField value={address} onChange={addressChangeHandler} onBlur={addressInputblurHandler} label='آدرس' id='address' placeholder='آدرس گیرنده را وارد کنید' />
                {addressHasError && <span className="text-red-500">آدرس صحیح نمی‌باشد</span>}
            </div>
            <div className="mx-2 md:col-span-2">
                <Button disabled={!formIsValid} type='submit' classes='w-full'>
                    <span className="px-1">پرداخت مبلغ :</span>
                    <span className="px-1">{shoppingCart.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0).toLocaleString('fa-IR')}</span>
                    <span className="px-1">تومان</span>
                    {isLoading && <Spinner size='md' />}
                </Button>
            </div>
        </div>
    </Container>
}
export default BuyProcess;