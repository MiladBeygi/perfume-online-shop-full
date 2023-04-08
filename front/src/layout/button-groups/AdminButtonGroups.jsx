import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

function AdminButtonGroups(props) {
    const navigate = useNavigate();
    const addProductsSectionHandler = () => {
        navigate("../admin-panel/add-product");
    };
    const productsSectionHandler = () => {
        navigate("../admin-panel/products-list");
    };
    const ordersSectionHandler = () => {
        navigate("../admin-panel/orders");
    };
    return <>
        <div className="my-2 border-b border-t p-3 " dir="ltr">

            <Button classes='m-2' onClick={ordersSectionHandler}>
                سفارش‌ها
            </Button>
            <Button classes='m-2' onClick={productsSectionHandler}>
                کالاها
            </Button>
            <Button classes='m-2' onClick={addProductsSectionHandler}>
                افزودن محصول
            </Button>

        </div>
    </>
}
export default AdminButtonGroups;