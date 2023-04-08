import axios from "axios";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useHandleClickOutside from "../../hooks/useHandleClickOutSide";
import { ScentMap } from "../../screens/products/Products";
import BackDrop from "../Backdrop/BackDrop";
import Button from "../Button/Button";
import EditModal from "../edit-modal/EditModal";
import EditOrderModal from "../edit-order-modal/EditOrderModal";

function AdminOrderCard(props) {
    // const [myModalRef, setMyModalRef] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [cssClass, setCssClass] = useState(false);
    const [deletedObj, setDeletedObj] = useState({});
    const modalRef = useRef(null);
    const buttonRef = useRef(null);
    const [editedObj, setEditedObj] = useState({});
    const callBackFn = () => {
        // setCssClass(false);
        setShowModal(false);
        // setTimeout(() => {
        // }, 2000);


    }
    useHandleClickOutside(modalRef, buttonRef, callBackFn);

    const { firstName, lastName, address, phone, expectAt, products, totalPrice, delivered, createdAt, id, passedObj } = props;



    const editClickHandler = (event) => {
        setShowModal(!showModal);
        // setCssClass(true);
        // setTimeout(() => {
        // }, 1000);
    }


    const passObj = (value) => {
        setEditedObj(value);
        setShowModal(!showModal);
        passedObj(value);
    }
    useEffect(() => {
        // console.log(editedObj)
    }, [editedObj]);
    return <>
        <div className={`bg-slate-200 flex flex-col sm:flex-row sm:justify-between items-center hover:bg-slate-300 rounded-xl my-2 `} >
            <div className="sm:w-[150px] mx-5 text-lg font-bold">
                نام کاربر :
                {firstName} {lastName}
            </div>
            <div className="mx-5 text-lg font-bold">
                مجموع مبلغ:
                {(+totalPrice).toLocaleString("fa-IR")}
            </div>
            <div className="mx-5 text-lg font-bold">
                زمان ثبت سفارش:
                {(new Date(createdAt)).toLocaleDateString('fa-IR')}
            </div>

            <div>
                <Button ref={buttonRef} onClick={editClickHandler} classes='mx-2 bg-yellow-400 hover:bg-yellow-600'>بررسی سفارش</Button>

            </div>
        </div>
        <div className="relative">
            {showModal && <EditOrderModal showModal={showModal} id={id} ref={modalRef} firstName={firstName} lastName={lastName} totalPrice={totalPrice} address={address} phone={phone} expectAt={expectAt} createdAt={createdAt} products={products} passObj={passObj} delivered={delivered} />}
            {showModal && <BackDrop />}

        </div>

    </>
}
export default AdminOrderCard;