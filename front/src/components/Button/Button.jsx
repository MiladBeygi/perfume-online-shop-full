import React from "react";

const Button = React.forwardRef((props, ref) => {
    const { children, classes, secondary } = props;
    return <button ref={ref} type="submit" className={`mt-4 text-white bg-${secondary ? 'gray' : 'green'}-700 hover:bg-${secondary ? 'gray' : 'green'}-800 focus:ring-4 focus:ring-${secondary ? 'gray' : 'green'}-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-${secondary ? 'gray' : 'green'}-600 dark:hover:bg-${secondary ? 'gray' : 'green'}-700 focus:outline-none dark:focus:ring-${secondary ? 'gray' : 'green'}-800 disabled:bg-slate-500  ${classes}`} {...props}> {children}</button >
})
export default Button;