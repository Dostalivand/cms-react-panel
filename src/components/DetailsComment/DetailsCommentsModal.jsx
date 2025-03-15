import React, { useState } from 'react'
import { VscEye } from "react-icons/vsc";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './DetailsCommentsModal.css'

export default function DetailsCommentsModal({ comment }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [commentInfo, setCommentInfo] = useState({})

    return (
        <>
            <Button variant="outline-primary" onClick={() => {
                setShow(true)
                setCommentInfo(comment)
            }} className="mb-1 btn-sm responsive-button">
                <VscEye className='ml-1 d-none d-md-inline'/>مشاهده کامنت 
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>متن کامنت : </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{commentInfo.body}</p>
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

