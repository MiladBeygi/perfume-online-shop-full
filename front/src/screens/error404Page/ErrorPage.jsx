import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../layout/Container/Container";

function ErrorPage(props) {
    const error = useSelector(state => state.error.error);
    const navigate = useNavigate();
    const clickHandler = (event) => {
        navigate('/login');
    }
    return <Container classes='' >
        <p>متأسفانه اشکالی در ارسال دیتا به سرور رخ داده است دوباره تلاش کنید</p>
        <p>{error}</p>
        <Button onClick={clickHandler}>بازگشت به صفحه اصلی</Button>
    </Container>
}
export default ErrorPage;