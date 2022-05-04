import React, { useEffect, useState } from "react";

const useProducts = (allProducts) => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => {
            if(allProducts){
                setProducts(data)
            }
            else {
                setProducts(data.slice(0,6));
            }
        })
    },[])
    return [products, setProducts];
}
export default useProducts;