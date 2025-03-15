import React, { useState } from 'react'
import { LuCirclePlus } from "react-icons/lu";
import toast, { Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './AddNewUser.css'

export default function AddNewUser({ getAllUsers }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newUserName, setNewUserName] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');

    const [errors, setErrors] = useState({
        username: false,
        password: false,
        email: false,
    });

    const AddNewUser = {
        username: newUserName,
        password: newUserPassword,
        email: newUserEmail,
    };

    const clickHandlerAddNewUser = () => {
        fetch(`https://backend-cms.liara.run/users`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(AddNewUser)
        })
            .then(res => res.json(res))
            .then(data => {
                console.log(data);
                getAllUsers();
                emptyInput();
                setShow(false);
                toast.success('🦄 با موفقیت اضافه شد');
            });


    };

    function emptyInput() {
        setNewUserName('');
        setNewUserPassword('');
        setNewUserEmail('');
    }

    // ایجاد شرط برای بررسی کردن پر یا خالی بودن فرم
    const handleFormValidation = () => {
        if (
            newUserName &&
            newUserPassword &&
            newUserEmail
        ) {
            clickHandlerAddNewUser();
            setErrors({ username: false, password: false, eamil: false });
        } else {
            setErrors({
                username: !newUserName,
                password: !newUserPassword,
                eamil: !newUserEmail
            });
        }
    };


    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Button
                variant="primary"
                onClick={handleShow}
                className="btn-md mt-2 mb-4 shadow-custom"
            >
                <LuCirclePlus className='ml-1 fs-5' />افزودن کاربر
            </Button>
            <Modal show={show} onHide={handleClose} className="rtl-modal pr-4 pt-2" centered>
                <Modal.Header>
                    <Modal.Title>افزودن کاربر جدید</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            نام کاربری :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={newUserName}
                            onChange={(event) => setNewUserName(event.target.value)}
                            isInvalid={errors.username}
                        />
                        <Form.Control.Feedback type="invalid" className='mt-2'>
                            پر کردن این بخش الزامی میباشد.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            پسورد :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={newUserPassword}
                            onChange={(event) => setNewUserPassword(event.target.value)}
                            isInvalid={errors.password}
                        />
                        <Form.Control.Feedback type="invalid" className='mt-2'>
                            پر کردن این بخش الزامی میباشد.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            ایمیل :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={newUserEmail}
                            onChange={(event) => setNewUserEmail(event.target.value)}
                            isInvalid={errors.eamil}
                        />
                        <Form.Control.Feedback type="invalid" className='mt-2'>
                            پر کردن این بخش الزامی میباشد.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button
                        variant="primary"
                        onClick={handleFormValidation}
                        className="w-50"
                    >
                        افزودن کاربر
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
    )
}