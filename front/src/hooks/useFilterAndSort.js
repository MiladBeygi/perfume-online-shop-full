const useFilterAndSort = (products, sortMethod, filterMethod) => {
    if (sortMethod === 'cheapest') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            return searchProducts.sort((a, b) => a.price - b.price)
        }
        return products.sort((a, b) => a.price - b.price);
    } else if (sortMethod === 'most-expensive') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            return searchProducts.sort((a, b) => b.price - a.price)
        }
        return products.sort((a, b) => b.price - a.price)
    } else if (sortMethod === 'newest') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            return searchProducts.sort((a, b) => b.createdAt - a.createdAt)
        }
        return products.sort((a, b) => b.createdAt - a.createdAt)
    } else if (sortMethod === 'men') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            const menProducts = searchProducts.filter((el) => el.category === 'men');
            return menProducts;
        }
        const menProducts = products.filter((el) => el.category === 'men')
        return menProducts;
    } else if (sortMethod === 'women') {
        if (filterMethod !== "null") {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            const womenProducts = searchProducts.filter((el) => el.category === 'women');
            return womenProducts;
        }
        const womenProducts = products.filter((el) => el.category === 'women')
        return womenProducts;
    } else if (sortMethod === 'none' || sortMethod === 'null') {
        if (filterMethod !== 'null') {
            const searchProducts = products.filter((el) => (el.name).toLowerCase().includes(filterMethod) || (el.brand).toLowerCase().includes(filterMethod) || (el.description).toLowerCase().includes(filterMethod));
            return searchProducts;
        }
        return products;
    } else {
        return products;
    }
}
export default useFilterAndSort;