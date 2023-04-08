import axios from "axios";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import useInput from "../../hooks/use-input";
import Container from "../../layout/Container/Container";
import { errorSliceActions } from "../../store/slices/errorSlice";
import { login } from "../../store/slices/usersSlice";

function Login(props) {
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { value: userName,
        isValid: userNameIsValid,
        hasError: userNameHasError,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameInputblurHandler,
        reset: userNameReset } = useInput(value => value.length >= 2);
    const { value: pass,
        isValid: passIsValid,
        hasError: passHasError,
        valueChangeHandler: passChangeHandler,
        inputBlurHandler: passInputblurHandler,
        reset: passReset } = useInput(value => value.length >= 4)

    const formIsValid = passIsValid && userNameIsValid;


    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        (async () => {
            try {
                const res = await dispatch(login({ username: userName, password: pass })).unwrap();
                toast.success("خوش آمدید");
                setTimeout(() => {
                    // console.log(res);
                    navigate("/");
                    // console.log(user)
                }, 1000);
            }
            catch (error) {
                console.log(user.error)
                toast.error("نام کاربری یا کلمه عبور اشتباه است.");
            }
            finally {
                setIsLoading(false);
            }
        })();
    }
    useEffect(() => {
        if (localStorage.getItem('ACCESS_TOKEN') && localStorage.getItem('REFRESH_TOKEN')) {
            navigate('/')
        }
    }, [])

    return <Container component='form' onSubmit={submitHandler}>
        <h1 className="text-3xl text-right my-[15px]">صفحه ورود</h1>
        <TextField value={userName} onBlur={userNameInputblurHandler} onChange={userNameChangeHandler} id='userName' type='text' label='نام کاربری' placeholder='لطفا نام کاربری را وارد نمایید' />
        {userNameHasError && <span className="text-red-500">نام کاربری باید بیشتر از دو حرف باشد </span>}
        <TextField value={pass} onBlur={passInputblurHandler} onChange={passChangeHandler} id='pass' type='password' label='رمز عبور' placeholder='لطفا رمز عبور را وارد نمایید' />
        {passHasError && <span className="text-red-500">رمز عبور باید بیشتر از 4 کاراکتر باشد</span>}
        <Button disabled={!formIsValid} classes=' w-full'>{isLoading ? <Spinner /> : 'ورود'}</Button>
    </Container>
}
export default Login;