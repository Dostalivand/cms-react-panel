import React, { useEffect, useState } from 'react'
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import ProductsTable from '../ProducstTable/ProductsTable'

export default function Products() {

  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch('http://localhost:8000/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error fetching products');
        }
        return res.json();
      })
      .then((products) => setAllProduct(products))
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  return (
    <>
      <div className='container-fluid bg-custom '>
        <AddNewProduct getAllProducts={getAllProducts} />
        <ProductsTable allProduct={allProduct} getAllProducts={getAllProducts} />
      </div>
    </>
  )
}
