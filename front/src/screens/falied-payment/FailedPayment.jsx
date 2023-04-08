import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";


function FailedPayment(props) {
    const navigate = useNavigate();
    return <>
        <div className="md:min-h-[600px] flex flex-col items-center justify-center">
            <h1 className="font-bold text-red-600 text-4xl my-5">
                <i className="fa fa-check mx-3 border border-[5px] rounded-full p-1 border-red-600"></i>
                متاسفانه مشکلی در پرداخت شما پیش آمده است
            </h1>
            <Button onClick={() => navigate('../../cart')}>بازگشت به سبد خرید</Button>
        </div>
    </>
}
export default FailedPayment; 