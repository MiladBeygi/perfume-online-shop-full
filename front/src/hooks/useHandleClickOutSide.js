import { useEffect } from "react"

const useHandleClickOutside = (elementRef, btnRef, callBack) => {
    useEffect(() => {
        const handleClickOutSide = (e) => {
            e.preventDefault();
            if (elementRef &&
                elementRef.current &&
                !elementRef.current.contains(e.target) &&
                !btnRef.current.contains(e.target)) {
                callBack();
            }
        };
        document.addEventListener("click", handleClickOutSide);
        return () => {
            document.removeEventListener("click", handleClickOutSide);
        }
    }, [])

};
export default useHandleClickOutside;