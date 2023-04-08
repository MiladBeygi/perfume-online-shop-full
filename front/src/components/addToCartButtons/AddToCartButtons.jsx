import Button from "../Button/Button";

function AddToCartButtons(props) {
    const { children, icreaseClickHandler, decreaseClickHandler } = props;
    return <>
        <div className=" flex justify-center sm:flex-row items-center ">
            <div>
                <Button onClick={icreaseClickHandler}> + </Button>
            </div>
            <div>
                <span className="px-5 font-bold"> {children} </span>
            </div>
            <div>
                <Button onClick={decreaseClickHandler}> - </Button>
            </div>



        </div>
    </>
}
export default AddToCartButtons;