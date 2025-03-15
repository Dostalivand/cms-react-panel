import React from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TbListDetails } from "react-icons/tb";
import './DetailsUserModal.css'

export default function DetailsUserModal({ user }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [userInfo, setUserInfo] = useState({})

    return (
        <>
            <Button variant="outline-primary" onClick={() => {
                setShow(true)
                setUserInfo(user)
            }} className='mb-1 ml-1 btn-sm responsive-button'>
                <TbListDetails className='ml-1 d-none d-md-inline' />جزئیات
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                <Modal.Title className='fs-5'><TbListDetails className='ml-1 fs-6'/>جزئیات کاربر</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th className='bg-secondary text-white'>نام کاربری</th>
                                <th className='bg-secondary text-white'>پسورد</th>
                                <th className='bg-secondary text-white'>ایمیل</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{userInfo.username}</td>
                                <td>{userInfo.password}</td>
                                <td>{userInfo.email}</td>
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
    )
}
