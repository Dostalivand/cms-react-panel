import React, { useState } from 'react'
import { RiQuestionAnswerLine } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function AnswerCommentModal() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [answerComment, setAnswerComment] = useState('')

    const [errors, setErrors] = useState({
        answerComment: false
    });

    function emptyInput() {
        setAnswerComment('');
    }

    const handleSubmit = () => {
        handleClose();
        emptyInput()
        toast.success('🦄 پاسخ شما با موفقیت ارسال شد!');
    };


    const handleFormValidation = () => {
        if (answerComment) {
            handleSubmit();
            setErrors({ answerComment: false });
        } else {
            toast.error('🦄 لطفا پاسخ خود را وارد کنید!');
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Button
                variant="outline-primary"
                onClick={handleShow}
                className="ml-1 mb-1 btn-sm responsive-button"
            >
                <RiQuestionAnswerLine className='ml-1 d-none d-md-inline' />پاسخ
            </Button>
            <Modal show={show} onHide={handleClose} centered className="rtl-modal pr-4 pt-2">
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label><h5 className='mr-1'>پاسخ مورد نظر خود را وارد کنید :</h5></Form.Label>
                        <Form.Control as="textarea" rows={3} value={answerComment} isInvalid={errors.text} onChange={(event) => setAnswerComment(event.target.value)}/>
                        <Form.Control.Feedback type="invalid" className='mt-2'>
                            پر کردن این بخش الزامی میباشد.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button
                        variant="primary"
                        onClick={handleFormValidation}
                        className="w-50"
                    >
                        ارسال پاسخ
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
