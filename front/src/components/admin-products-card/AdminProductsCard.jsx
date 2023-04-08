import axios from "axios";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useHandleClickOutside from "../../hooks/useHandleClickOutSide";
import { ScentMap } from "../../screens/products/Products";
import BackDrop from "../Backdrop/BackDrop";
import Button from "../Button/Button";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../edit-modal/EditModal";
function GenderMap(value) {
    switch (value) {
        case 'men':
            return 'آقایان';
        case 'women':
            return 'خانم‌ها';
    }
};
function AdminProductsCard(props) {
    // const [myModalRef, setMyModalRef] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletedObj, setDeletedObj] = useState({});

    const deleteModalRef = useRef(null);
    const deleteButtonRef = useRef(null);
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const modalRef = useRef(null);
    const buttonRef = useRef(null);
    const [editedObj, setEditedObj] = useState({});
    const callBackFn = () => {
        setShowModal(false);
    }

    useHandleClickOutside(deleteModalRef, deleteButtonRef, closeDeleteModal);
    useHandleClickOutside(modalRef, buttonRef, callBackFn);

    const { brand, img, name, category, subCategory, id, price, quantity, changingID, description } = props;


    const deleteClickHandler = async (event) => {
        // console.log(id);
        const deleteResult = await axios.delete(`http://localhost:3002/products/${id}`);

        changingID(id)

    }
    const editClickHandler = (event) => {
        setShowModal(!showModal);
    }

    const passObj = (value) => {
        setEditedObj(value);
        changingID(editedObj.id);
        setShowModal(!showModal);
    }
    useEffect(() => {
        // console.log(editedObj)
    }, [editedObj]);
    return <>
        <div className=" bg-slate-200 flex flex-col sm:flex-row sm:justify-between items-center hover:bg-slate-300 rounded-xl my-2">
            <div className="sm:w-[150px] ">
                <Link to={`../../products/${category}/${subCategory}/${id}`} className="w-full">
                    <img className="w-full rounded-xl" src={`http://localhost:3002${img}`} alt='photo-card' />
                </Link>
            </div>
            <div className="mx-5 text-lg font-bold">
                <p><Link to={`../../products/${category}/${subCategory}/${id}`}>{name}</Link></p>
                <p>قیمت: <span className="underline">{price.toLocaleString("fa-IR")}</span> تومان</p>
            </div>
            <div className="mx-5 text-lg font-bold">
                <span>{<Link to={`../../products/${category}`}>{GenderMap(category)}</Link>} / <Link to={`../../products/${category}/${subCategory}`}>{ScentMap(subCategory)}</Link></span>
            </div>
            <div className="text-lg font-bold">
                موجودی:
                <span className="mx-1">{quantity}</span>
                عدد
            </div>
            <div>
                {/* <button onClick={editClickHandler} ref={buttonRef}>edit</button> */}
                <Button ref={buttonRef} onClick={editClickHandler} classes='mx-2 bg-yellow-400 hover:bg-yellow-600'>ویرایش</Button>
                <Button ref={deleteButtonRef} onClick={() => setShowDeleteModal(true)} classes='mx-2 bg-red-600 hover:bg-red-800'>حذف</Button>
            </div>
        </div>
        <div className="relative">
            {showModal && <EditModal showModal={showModal} id={id} ref={modalRef} img={img} name={name} category={category} subCategory={subCategory} price={price} quantity={quantity} brand={brand} description={description} passObj={passObj} />}
            {showModal && <BackDrop />}
        </div>
        <div>
            {showDeleteModal && <DeleteModal showDeleteModal={showDeleteModal} ref={deleteModalRef} deleteProduct={deleteClickHandler} closeDeleteModal={closeDeleteModal} />}
            {showDeleteModal && <BackDrop />}
        </div>

    </>
}
export default AdminProductsCard;