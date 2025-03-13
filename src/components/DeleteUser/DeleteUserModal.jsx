import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';

export default function DeleteUserModal({ deleteUserModal, userID, setUserID }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteClick = () => {
        deleteUserModal();  
        handleClose();
        toast.success('🦄 با موفقیت حذف شد!');
    };

    const handleDeleteUser = (id) => {
        setUserID(id);  
        handleShow();
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Button variant="outline-danger" className='ml-1 mb-1 btn-sm responsive-button' onClick={() => handleDeleteUser(userID)}>
                <RiDeleteBin6Line className='ml-1 mb-1 d-none d-md-inline' />حذف
            </Button>
            <Modal show={show} className='d-flex justify-content-center mt-5' onHide={handleClose}>
                <Modal.Body>آیا این کاربر حذف شود؟</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={(handleDeleteClick)}>
                        بله
                    </Button>
                    <Button variant="outline-danger" onClick={handleClose}>
                        خیر
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
