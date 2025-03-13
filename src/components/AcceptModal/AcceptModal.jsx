import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';

export default function AcceptModal() {

    const [show, setShow] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAcceptClick = () => {
        setIsButtonDisabled(true);
        handleClose();
        toast.success('🦄 با موفقیت تایید شد!');
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Button
                variant={isButtonDisabled ? "secondary" : "outline-success"}
                className='mb-1 mr-1 ml-1 m btn-sm responsive-button'
                onClick={() => handleShow()}
                disabled={isButtonDisabled}
            >
                <IoMdCheckmarkCircleOutline className='ml-1 d-none d-md-inline' />
                تایید
            </Button>
            <Modal show={show} className='d-flex justify-content-center mt-5' onHide={handleClose}>
                <Modal.Body>آیا این کامنت تایید شود؟</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={handleAcceptClick}>
                        بله
                    </Button>
                    <Button variant="outline-danger" onClick={handleClose}>
                        خیر
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}