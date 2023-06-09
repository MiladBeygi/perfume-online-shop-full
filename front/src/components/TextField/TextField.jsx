function TextField(props) {
    const { label, id, className, error, validation, classes } = props;
    return <div className={`my-2 ${classes}`} >
        <label htmlFor={id} className="text-right block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input id={id} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`} {...props} />
    </div >
}
export default TextField;