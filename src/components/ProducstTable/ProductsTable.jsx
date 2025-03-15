import React, { useState } from 'react';
import { Image, Table } from 'react-bootstrap';
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailsModal from '../DetailsModal/DetailsModal';
import EditModal from '../EditModal/EditModal';
import ErrorBox from '../ErrorBox/ErrorBox';
import './ProductsTable.css';

export default function ProductsTable({ allProduct, getAllProducts }) {
    const [productID, setProductID] = useState(null);

    const editModalSubmitAction = (updatedProduct) => {
        fetch(`https://json-server-cms-new.liara.run/products/${updatedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to update product. Status: ${res.status}`);
                }
                return res.json();
            })
            .then(() => {
                getAllProducts();
            })
            .catch((error) => {
                console.error('Error updating product:', error.message);
            });
    };

    const deleteModalSubmitAction = () => {
        fetch(`https://json-server-cms-new.liara.run/products/${productID}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to delete product. Status: ${res.status}`);
                }
                return res.json();
            })
            .then(() => {
                getAllProducts();
            })
            .catch((error) => {
                console.error('Error deleting product:', error.message);
            });
    };

    return (
        <div>
            {allProduct.length ? (
                <Table striped bordered hover className="text-center responsive-title-1 shadow-custom rounded-3 overflow-hidden">
                    <thead>
                        <tr>
                            <th className='bg-secondary text-white text-nowrap'>تصویر محصول</th>
                            <th className='bg-secondary text-white'>نام</th>
                            <th className='bg-secondary text-white'>قیمت</th>
                            <th className='bg-secondary text-white'>موجودی</th>
                            <th className='bg-secondary text-white'>تنظیمات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProduct.slice().reverse().map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <Image
                                        src={product.img ? `data:image/jpeg;base64,${product.img}` : '/default-image.jpg'}
                                        alt="No Image"
                                        className='img-style'
                                        fluid
                                    />
                                </td>
                                <td className='custom-font'>{product.title}</td>
                                <td className='custom-font'>{product.price}</td>
                                <td className='custom-font'>{product.count}</td>
                                <td className='custom-font'>
                                    <DetailsModal product={product} />
                                    <DeleteModal
                                        submitDeleteAction={deleteModalSubmitAction}
                                        setProductID={setProductID}
                                        productID={product.id}
                                    />
                                    <EditModal
                                        product={product}
                                        onSubmit={editModalSubmitAction}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div className="mb-5 d-flex justify-content-center">
                    <ErrorBox message={'محصولی وجود ندارد.'} />
                </div>
            )}
        </div>
    );
}
