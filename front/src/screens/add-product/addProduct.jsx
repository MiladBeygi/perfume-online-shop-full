import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import { Spinner } from "flowbite-react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import Container from "../../layout/Container/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminButtonGroups from "../../layout/button-groups/AdminButtonGroups";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddProduct(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { isLogin } = useSelector(state => state.users);
    const navigate = useNavigate();
    const { value: productName,
        isValid: ProductNameIsValid,
        hasError: productNameHasError,
        valueChangeHandler: productNameChangeHandler,
        inputBlurHandler: productNameInputblurHandler,
        reset: productNameReset } = useInput(value => value.length >= 2);
    const { value: brandName,
        isValid: brandNameIsValid,
        hasError: brandNameHasError,
        valueChangeHandler: brandNameChangeHandler,
        inputBlurHandler: brandNameInputblurHandler,
        reset: brandNameReset } = useInput(value => value.length >= 2);
    const { value: productPrice,
        isValid: productPriceIsValid,
        hasError: productPriceHasError,
        valueChangeHandler: productPriceChangeHandler,
        inputBlurHandler: productPriceInputblurHandler,
        reset: productPriceReset } = useInput(value => Number(value) >= 1);
    const { value: productQuantity,
        isValid: productQuantityIsValid,
        hasError: productQuantityHasError,
        valueChangeHandler: productQuantityChangeHandler,
        inputBlurHandler: productQuantityInputblurHandler,
        reset: productQuantityReset } = useInput(value => Number(value) >= 1);
    const { value: productCategory,
        isValid: productCategoryIsValid,
        hasError: productCategoryHasError,
        valueChangeHandler: productCategoryChangeHandler,
        inputBlurHandler: productCategoryInputblurHandler,
        reset: productCategoryReset } = useInput(value => value.length >= 2);
    const { value: productSubCategory,
        isValid: productSubCategoryIsValid,
        hasError: productSubCategoryHasError,
        valueChangeHandler: productSubCategoryChangeHandler,
        inputBlurHandler: productSubCategoryInputblurHandler,
        reset: productSubCategoryReset } = useInput(value => value.length >= 2);
    const { value: productDescription,
        isValid: productDescriptionIsValid,
        hasError: productDescriptionHasError,
        valueChangeHandler: productDescriptionChangeHandler,
        inputBlurHandler: productDescriptionInputblurHandler,
        reset: productDescriptionReset } = useInput(value => value.length >= 2);


    const [productImage, setProductImage] = useState(null);
    const productImageChangeHandler = (e) => {
        // setProductImage(e.target.files[0]);
        if (e.target.files[0]) {
            setProductImage(e.target.files[0]);
        }
        // console.log(e.target.files[0]);

    }



    const formIsValid = productDescriptionIsValid && productSubCategoryIsValid && productQuantityIsValid && productCategoryIsValid && productPriceIsValid && brandNameIsValid && ProductNameIsValid;

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("image", productImage);
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
        const pruductSendResult = await axios.post('http://localhost:3002/products', formData);
        try {
            console.log("new product")
        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false);
        productDescriptionReset();
        productSubCategoryReset();
        productCategoryReset();
        productQuantityReset();
        productPriceReset();
        brandNameReset();
        productNameReset();
        setProductImage(null);
    }
    useEffect(() => {
        if (!isLogin) {
            navigate("../login")
        }
    }, []);
    return <>
        <AdminButtonGroups />
        <h1 className="text-3xl text-right my-[15px] border-b py-5"> اضافه کردن محصول</h1>
        <Container component='form' onSubmit={submitHandler} screen='[500px]' classes='grid grid-cols-1 sm:grid-cols-2 '>
            <TextField classes='mx-2' value={productName} onChange={productNameChangeHandler} onBlur={productNameInputblurHandler} id='product-name' type='text' placeholder='نام کالا را وارد کنید' label='نام کالا' />
            {productNameHasError && <span className="text-red-500">نام کالا باید بیشتر از دو حرف باشد</span>}
            <TextField classes='mx-2' value={brandName} onChange={brandNameChangeHandler} onBlur={brandNameInputblurHandler} id='brand-name' type='text' placeholder='نام برند را وارد کنید' label='برند' />
            {brandNameHasError && <span className="text-red-500">نام برند باید بیشتر از دوحرف باشد</span>}
            <TextField classes='mx-2' value={productPrice} onChange={productPriceChangeHandler} onBlur={productPriceInputblurHandler} id='product-price' type='number' placeholder='قیمت محصول را وارد کنید' label='قیمت' />
            {productPriceHasError && <span className="text-red-500">قیمت باید یک عدد باشد</span>}
            <TextField classes='mx-2' value={productQuantity} onChange={productQuantityChangeHandler} onBlur={productQuantityInputblurHandler} id='product-quantity' type='number' placeholder='تعداد محصول را وارد کنید' label='تعداد' />
            {productQuantityHasError && <span className="text-red-500">   تعداد محصول باید بیشتر از 1 باشد </span>}
            <TextField classes='mx-2' value={productCategory} onChange={productCategoryChangeHandler} onBlur={productCategoryInputblurHandler} id='product-category' type='text' placeholder='دسته‌بندی محصول را وارد کنید' label='دسته‌بندی' />
            {productCategoryHasError && <span className="text-red-500">   دسته‌بندی محصول باید بیشتر از 2 حرف باشد</span>}
            <TextField classes='mx-2' value={productSubCategory} onChange={productSubCategoryChangeHandler} onBlur={productSubCategoryInputblurHandler} id='product-subcategory' type='text' placeholder='زیرگروه محصول را وارد کنید' label='زیرگروه' />
            {productSubCategoryHasError && <span className="text-red-500">   زیرگروه محصول باید بیشتر از 2 حرف باشد</span>}
            <TextField classes='mx-2' value={productDescription} onChange={productDescriptionChangeHandler} onBlur={productDescriptionInputblurHandler} id='product-description' type='text' placeholder='توصیف محصول را وارد کنید' label='توصیف محصول' />
            {productDescriptionHasError && <span className="text-red-500">   توصیف محصول باید بیشتر از 2 حرف باشد</span>}

            <TextField classes='mx-2' accept='.JPG,.jpeg' onChange={productImageChangeHandler} id='product-image' placeholder='تصویر محصول را وارد کنید' type='file' label='عکس محصول' />
            <Button disabled={!formIsValid} classes='col-span-1 sm:col-span-2 w-full'>{isLoading ? <Spinner /> : 'افزودن محصول'}</Button>
        </Container>
    </>
}
export default AddProduct;