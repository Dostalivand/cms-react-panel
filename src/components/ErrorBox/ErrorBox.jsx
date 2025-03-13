import React from 'react'
import { Alert } from 'react-bootstrap'
import { BsExclamationCircle } from "react-icons/bs";
import './ErrorBox.css'

export default function ErrorBox({message}) {
    return (
        <>
            {['danger'].map((variant) => (
                <Alert key={variant} variant={variant} className='w-100 shadow-custom'>
                    <p className='d-flex justify-content-center align-items-center pt-2' ><BsExclamationCircle className='ml-1' />{message}</p>
                </Alert>
            ))}
        </>
    )
}
