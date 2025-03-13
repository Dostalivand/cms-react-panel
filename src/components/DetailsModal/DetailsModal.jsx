import React from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DetailsModal({ product }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [productInfo, setProductInfo] = useState({})

    return (
        <>
            <Button variant="outline-primary" onClick={() => {
                setShow(true)
                setProductInfo(product)
            }} className='m-1 btn-sm responsive-button'>
                <TbListDetails className='ml-1 d-none d-md-inline'/>جزئیات
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title className='fs-5'><TbListDetails className='ml-1 fs-6'/>جزئیات محصول</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th className='bg-secondary text-white'>نام محصول</th>
                                <th className='bg-secondary text-white'>میزان محبوبیت</th>
                                <th className='bg-secondary text-white'>میزان فروش</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{productInfo.title}</td>
                                <td>{productInfo.popularity}<FaStar className='mr-1 fs-5 pb-1 text-warning'/></td>
                                <td><span className='mr-1'>تومان</span>{productInfo.productDesc}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        بستن
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default DetailsModal;