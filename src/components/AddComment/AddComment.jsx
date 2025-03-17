import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { LuCirclePlus } from "react-icons/lu";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


export default function AddComment({ getAllComments }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newCommentUser, setNewCommentUser] = useState('');
    const [newCommentProduct, setNewCommentProduct] = useState('');
    const [newCommentDate, setNewCommentDate] = useState('');
    const [newCommentText, setNewCommentText] = useState('');

    const [errors, setErrors] = useState({
        user: false,
        product: false,
        date: false,
        text: false,
    });

    const AddNewComment = {
        userName: newCommentUser,
        productName: newCommentProduct,
        date: newCommentDate,
        body: newCommentText
    };

    const clickHandlerAddNewComment = () => {
        fetch(`https://json-server-cms-new.liara.run/comments`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(AddNewComment)
        })
            .then(res => res.json(res))
            .then(data => {
                console.log(data);
                getAllComments();
                emptyInput();
                setShow(false);
                toast.success('🦄 با موفقیت اضافه شد!');
            });
    };

    function emptyInput() {
        setNewCommentUser('');
        setNewCommentProduct('');
        setNewCommentDate('');
        setNewCommentText('');
    }

    // ایجاد شرط برای بررسی کردن پر یا خالی بودن فرم
    const handleFormValidation = () => {
        if (
            newCommentUser &&
            newCommentProduct &&
            newCommentDate &&
            newCommentText
        ) {
            clickHandlerAddNewComment();
            setErrors({ user: false, product: false, date: false, text: false });
        } else {
            setErrors({
                user: !newCommentUser,
                product: !newCommentProduct,
                date: !newCommentDate,
                text: !newCommentText
            });
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Button

                onClick={handleShow}
                className="btn-md mt-2 mb-4 shadow-custom"
            >
                <LuCirclePlus className='ml-1 fs-5' />افزودن کامنت
            </Button>
            <Modal show={show} onHide={handleClose} className="rtl-modal pr-4 pt-2" centered>
                <Modal.Header>
                    <Modal.Title>افزودن کامنت جدید</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            نام کاربری :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={newCommentUser}
                            onChange={(event) => setNewCommentUser(event.target.value)}
                            isInvalid={errors.user}
                        />
                        <Form.Control.Feedback type="invalid" className='mt-2'>
                            پر کردن این بخش الزامی میباشد.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            نام محصول :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={newCommentProduct}
                            onChange={(event) => setNewCommentProduct(event.target.value)}
                            isInvalid={errors.product}
                        />
                        <Form.Control.Feedback type="invalid" className='mt-2'>
                            پر کردن این بخش الزامی میباشد.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            تاریخ :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={newCommentDate}
                            onChange={(event) => setNewCommentDate(event.target.value)}
                            isInvalid={errors.date}
                        />
                        <Form.Control.Feedback type="invalid" className='mt-2'>
                            پر کردن این بخش الزامی میباشد.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="rounded-end-2 rounded-start-0 input-style d-flex justify-content-center">
                            متن کامنت :
                        </InputGroup.Text>
                        <Form.Control
                            className="rounded-start-2 rounded-end-0"
                            value={newCommentText}
                            onChange={(event) => setNewCommentText(event.target.value)}
                            isInvalid={errors.text}
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
                        افزودن کامنت
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
