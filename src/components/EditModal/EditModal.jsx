import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FaRegEdit } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import './EditModal.css';

function EditModal({ onSubmit, product }) {
    const [show, setShow] = useState(false);
    const [productNewTitle, setProductNewTitle] = useState(product.title);
    const [productNewPrice, setProductNewPrice] = useState(product.price);
    const [productNewCount, setProductNewCount] = useState(product.count);
    const [productNewPopularity] = useState(product.popularity);
    const [productNewDesc] = useState(product.productDesc);
    const [productNewImg] = useState(product.img); // مقدار img را به‌عنوان مقدار پیش‌فرض نگه می‌داریم

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        const updatedProduct = {
            id: product.id,
            title: productNewTitle,
            price: productNewPrice,
            count: productNewCount,
            img: productNewImg,
            popularity: productNewPopularity,
            productDesc: productNewDesc,
        };
        onSubmit(updatedProduct);
        handleClose();
        toast.success('🦄 با موفقیت ویرایش شد!');
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Button
                variant="outline-success"
                onClick={handleShow}
                className="m-1 btn-sm responsive-button"
            >
                <FaRegEdit className='ml-1 d-none d-md-inline' />ویرایش
            </Button>
            <Modal show={show} onHide={handleClose} className="rtl-modal pr-4 pt-2">
                <Modal.Header>
                    <Modal.Title>ویرایش محصول</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            نام محصول :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={productNewTitle}
                            onChange={(event) => setProductNewTitle(event.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            قیمت :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={productNewPrice}
                            onChange={(event) => setProductNewPrice(event.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            موجودی :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={productNewCount}
                            onChange={(event) => setProductNewCount(event.target.value)}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="w-50"
                    >
                        ثبت ویرایش
                    </Button>
                    <Button
                        variant="outline-danger"
                        onClick={handleClose}
                        className="w-25"
                    >
                        انصراف
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditModal;
