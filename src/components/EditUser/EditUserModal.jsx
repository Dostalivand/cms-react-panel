import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FaRegEdit } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

export default function EditUserModal({ user, onSubmit }) {

    const [show, setShow] = useState(false);
    const [editUserName, setEditUserName] = useState(user.username);
    const [editPassword, setEditPassword] = useState(user.password);
    const [editEmail, seteditEmail] = useState(user.email);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        const updatedUser = {
            id: user.id,
            username: editUserName,
            password: editPassword,
            email: editEmail
        };
        onSubmit(updatedUser);
        handleClose();
        toast.success('🦄 با موفقیت ویرایش شد!');
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Button
                variant="outline-success"
                onClick={handleShow}
                className="ml-1 mb-1 btn-sm responsive-button"
            >
                <FaRegEdit className='ml-1 d-none d-md-inline' />ویرایش
            </Button>
            <Modal show={show} onHide={handleClose} className="rtl-modal pr-4 pt-2">
                <Modal.Header>
                    <Modal.Title>ویرایش کاربر</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            نام کاربری :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={editUserName}
                            onChange={(event) => setEditUserName(event.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            پسورد :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={editPassword}
                            onChange={(event) => setEditPassword(event.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            ایمیل :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={editEmail}
                            onChange={(event) => seteditEmail(event.target.value)}
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
