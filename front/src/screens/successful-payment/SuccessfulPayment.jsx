import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function SuccessfulPayment(props) {
    const navigate = useNavigate();
    return <>
        <div className="md:min-h-[600px] flex flex-col items-center justify-center">
            <h1 className="font-bold text-green-600 text-4xl my-5">
                <i className="fa fa-check mx-3 border border-[5px] rounded-full p-1 border-green-600"></i>
                پرداخت شما با موفقیت انجام شد
            </h1>
            <p className="text-xl my-5">
                به زودی برای هماهنگی تحویل سفارش با شما تماس گرفته خواهد شد.
            </p>
            <p className="text-xl my-5">
                از خرید شما متشکریم
            </p>
            <Button onClick={() => navigate('../../')}>بازگشت به صفحه اصلی</Button>
        </div>
    </>
}
export default SuccessfulPayment;