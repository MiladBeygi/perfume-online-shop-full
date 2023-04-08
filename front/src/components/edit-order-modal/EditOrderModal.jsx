import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import './edit-order-modal.css';
const EditOrderModal = React.forwardRef((props, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const { firstName, lastName, address, phone, expectAt, products, totalPrice, delivered, createdAt, id, passObj, showModal } = props;

    const deliveredClickHandler = async () => {
        setIsLoading(true);
        const myEditedObj = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            expectAt: expectAt,
            products: products,
            totalPrice: totalPrice,
            delivered: true,
            createdAt: createdAt,
        }
        try {
            const pruductSendResult = await axios.patch(`http://localhost:3002/orders/${id}`, myEditedObj);
            console.log("new product");
            passObj(pruductSendResult.data);
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => { }, [showModal])
    return <>
        <div className={`md:p-[50px] bg-slate-300 rounded-2xl sm:fixed sm:top-[10%] sm:right-[25%] sm:left-[25%] z-[999999] ${showModal ? "ModalOpen" : 'modalClosed'}`} ref={ref}>
            <div className="my-1">
                <span className="px-2">نام مشتری : </span>
                <span className="px-1">{firstName}</span>
                <span className="px-1">{lastName}</span>
            </div>
            <div className="my-1">
                <span className="px-2">آدرس : </span>
                <span className="px-2">{address}</span>
            </div>
            <div className="my-1">
                <span className="px-2">تلفن : </span>
                <span className="px-2">{+phone}</span>
            </div>
            <div className="my-1">
                <span className="px-2">زمان تحویل : </span>
                <span className="px-2">{(new Date(expectAt)).toLocaleDateString('fa-IR')}</span>
            </div>
            <div className="my-1">
                <span className="px-2">
                    زمان سفارش
                </span>
                <span className="px-2">{(new Date(createdAt)).toLocaleDateString('fa-IR')}</span>
            </div>
            <div className="w-full">
                <table className="w-full bg-sky-200 ">

                    <thead>
                        <tr>
                            <th>
                                ردیف
                            </th>
                            <th>
                                نام کالا
                            </th>
                            <th>
                                قیمت
                            </th>
                            <th>
                                تعداد
                            </th>
                            <th>
                                جمع قیمت
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((el, i) => {
                            return <tr key={i + 1}>
                                <td className="border border-slate-800 border-[2px]">
                                    {(i + 1).toLocaleString("fa-IR")}
                                </td>
                                <td className="border border-slate-800 px-2 border-[2px]">
                                    {el.name}
                                </td>
                                <td className="border border-slate-800 px-2 border-[2px]">
                                    {(+el.price).toLocaleString("fa-IR")}
                                </td>
                                <td className="border border-slate-800 px-2 border-[2px]">
                                    {(+el.quantity).toLocaleString("fa-IR")}
                                </td>
                                <td className="border border-slate-800 px-2 border-[2px]">
                                    {((+el.quantity) * (+el.price)).toLocaleString("fa-IR")}
                                </td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='3' className="border border-slate-800 px-2 border-[2px]">
                                مجموع قیمت
                            </td>
                            <td colSpan='2' className="border border-slate-800 px-2 border-[2px]">
                                {(+totalPrice).toLocaleString("fa-IR")}
                            </td>
                        </tr>
                    </tfoot>
                </table>
                {!delivered ? <Button onClick={deliveredClickHandler} classes='w-2/4'>تحویل شد</Button> : <div className="my-2">سفارش تحویل داده شده است</div>}
            </div>
        </div>
    </>
})
export default EditOrderModal;