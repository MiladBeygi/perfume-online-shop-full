import axios from "axios";
import { Spinner } from "flowbite-react";
import React from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import useInput from "../../hooks/use-input";

import Container from "../../layout/Container/Container";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import './EditModal.css';



const EditModal = React.forwardRef((props, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const { id, name, brand, price, quantity, category, subCategory, description, img, passObj, showModal } = props;

    //what we need for form validation
    const { value: productName,
        isValid: ProductNameIsValid,
        hasError: productNameHasError,
        valueChangeHandler: productNameChangeHandler,
        inputBlurHandler: productNameInputblurHandler,
        reset: productNameReset } = useInput(value => value.length >= 2, name);
    const { value: brandName,
        isValid: brandNameIsValid,
        hasError: brandNameHasError,
        valueChangeHandler: brandNameChangeHandler,
        inputBlurHandler: brandNameInputblurHandler,
        reset: brandNameReset } = useInput(value => value.length >= 2, brand);
    const { value: productPrice,
        isValid: productPriceIsValid,
        hasError: productPriceHasError,
        valueChangeHandler: productPriceChangeHandler,
        inputBlurHandler: productPriceInputblurHandler,
        reset: productPriceReset } = useInput(value => Number(value) >= 1, price);
    const { value: productQuantity,
        isValid: productQuantityIsValid,
        hasError: productQuantityHasError,
        valueChangeHandler: productQuantityChangeHandler,
        inputBlurHandler: productQuantityInputblurHandler,
        reset: productQuantityReset } = useInput(value => Number(value) >= 1, quantity);
    const { value: productCategory,
        isValid: productCategoryIsValid,
        hasError: productCategoryHasError,
        valueChangeHandler: productCategoryChangeHandler,
        inputBlurHandler: productCategoryInputblurHandler,
        reset: productCategoryReset } = useInput(value => value.length >= 2, category);
    const { value: productSubCategory,
        isValid: productSubCategoryIsValid,
        hasError: productSubCategoryHasError,
        valueChangeHandler: productSubCategoryChangeHandler,
        inputBlurHandler: productSubCategoryInputblurHandler,
        reset: productSubCategoryReset } = useInput(value => value.length >= 2, subCategory);
    const { value: productDescription,
        isValid: productDescriptionIsValid,
        hasError: productDescriptionHasError,
        valueChangeHandler: productDescriptionChangeHandler,
        inputBlurHandler: productDescriptionInputblurHandler,
        reset: productDescriptionReset } = useInput(value => value.length >= 2, description);

    //what we need for submit button
    const formIsValid = productDescriptionIsValid && productSubCategoryIsValid && productQuantityIsValid && productCategoryIsValid && productPriceIsValid && brandNameIsValid && ProductNameIsValid;



    const editSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("image", img);
        formData.append("name", productName);
        formData.append("brand", brandName);
        formData.append("price", productPrice);
        formData.append("category", productCategory);
        formData.append("subCategory", productSubCategory);
        formData.append("quantity", productQuantity);
        formData.append("description", productDescription);
        const formDataCategory = new FormData();
        formDataCategory.append("category", productCategory);

        const formDataSubCategory = new FormData();
        formDataSubCategory.append("category", productCategory);
        formDataSubCategory.append("subCategory", productSubCategory);




        const categoryGetResults = await axios.get('http://localhost:3002/category');
        try {
            const myCategory = await categoryGetResults.data;
            // console.log(myCategory);

            const existCategory = myCategory.find(el => el.category === productCategory)
            if (!existCategory) {
                axios.post('http://localhost:3002/category', formDataCategory).then(data => console.log('new category ')).catch((err) => console.log(err));
            }
        }
        catch (err) {
            console.log(err)
        }
        const subCategoryGetResults = await axios.get('http://localhost:3002/subcategory');
        try {
            const mySubCategory = await subCategoryGetResults.data;


            const existSubCategory = mySubCategory.find(el => (el.subCategory === productSubCategory) && (el.category === productCategory));

            if (!existSubCategory) {
                axios.post('http://localhost:3002/subcategory', formDataSubCategory).then(data => console.log('new subcategory')).catch((err) => console.log(err));
            }
        }
        catch (err) {

        }
        const pruductSendResult = await axios.patch(`http://localhost:3002/products/${id}`, formData);
        try {
            console.log("product edited");
            passObj(pruductSendResult.data);
        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false);

    }
    return <>


        <form onSubmit={editSubmitHandler} ref={ref} className={`bg-slate-400 p-4 md:fixed md:inset-x-5 z-[99999999] md:w-2/4 md:top-[10%] md:left-[25%] md:right-[25%]  rounded-3xl ${showModal ? "ModalOpen" : "ModalClosed"}`} >
            <h1 className="text-right border-b border-slate-800 py-3  text-xl font-bold">ویرایش محصول</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <div>
                    <TextField value={productName} onChange={productNameChangeHandler} onBlur={productNameInputblurHandler} classes='mx-2' label='نام محصول' />
                    {productNameHasError && <span className="text-red-800">نام کالا باید بیشتر از دو حرف باشد</span>}
                </div>
                <div>
                    <TextField value={brandName} onChange={brandNameChangeHandler} onBlur={brandNameInputblurHandler} classes='mx-2' label='برند' />
                    {brandNameHasError && <span className="text-red-800">نام برند باید بیشتر از دوحرف باشد</span>}
                </div>


                <div>
                    <TextField value={productPrice} onChange={productPriceChangeHandler} onBlur={productPriceInputblurHandler} type='number' classes='mx-2' label='قیمت' />
                    {productPriceHasError && <span className="text-red-800">قیمت باید یک عدد باشد</span>}
                </div>

                <div>
                    <TextField value={productQuantity} onChange={productQuantityChangeHandler} onBlur={productQuantityInputblurHandler} type='number' classes='mx-2' label='موجودی' />
                    {productQuantityHasError && <span className="text-red-800">   تعداد محصول باید بیشتر از 1 باشد </span>}
                </div>
                <div>
                    <TextField value={productCategory} onChange={productCategoryChangeHandler} onBlur={productCategoryInputblurHandler} classes='mx-2' label='دسته‌بندی' />
                    {productCategoryHasError && <span className="text-red-800">   دسته‌بندی محصول باید بیشتر از 2 حرف باشد</span>}
                </div>

                <div>
                    <TextField value={productSubCategory} onChange={productSubCategoryChangeHandler} onBlur={productSubCategoryInputblurHandler} classes='mx-2' label='زیرگروه' />
                    {productSubCategoryHasError && <span className="text-red-800">   زیرگروه محصول باید بیشتر از 2 حرف باشد</span>}
                </div>

                <div className="mx-2 sm:col-span-2">
                    <TextField value={productDescription} onChange={productDescriptionChangeHandler} onBlur={productDescriptionInputblurHandler} label='توضیحات' />
                    {productDescriptionHasError && <span className="text-red-800">   توصیف محصول باید بیشتر از 2 حرف باشد</span>}
                </div>

            </div>
            <Button onClick={editSubmitHandler} disabled={!formIsValid} classes='w-full'>
                ثبت تغییرات
                {isLoading && <Spinner />}
            </Button>
        </form>

    </>
})



export default EditModal;