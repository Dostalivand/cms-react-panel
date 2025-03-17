import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaRegEdit } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';


export default function EditCommentModal({ onSubmit, comment }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editBodyComment, setEditBodyComment] = useState(comment.body);
    const [editDateComment] = useState(comment.date)
    const [editUserIdComment] = useState(comment.userName)
    const [editProdctIdComment] = useState(comment.productName)
    const [editIsReplyComment] = useState(comment.isReply)
    const [editReplyIdComment] = useState(comment.replyId)
    const [editIsAcceptComment] = useState(comment.isAccept)

    const handleSubmit = () => {
        const updatedComment = {
            id: comment.id,
            body: editBodyComment,
            date: editDateComment,
            userName: editUserIdComment,
            productName: editProdctIdComment,
            isReply: editIsReplyComment,
            replyId: editReplyIdComment,
            isAccept: editIsAcceptComment,

        };
        onSubmit(updatedComment);
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
            
            <Modal show={show} onHide={handleClose} centered className="rtl-modal pr-4 pt-2">
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label><h5 className='mr-1'>ویرایش کامنت :</h5></Form.Label>
                        <Form.Control value={editBodyComment} onChange={(event) => setEditBodyComment(event.target.value)} as="textarea" rows={3} />
                    </Form.Group>
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
    )
}