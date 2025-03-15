import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { ImWarning } from "react-icons/im";
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { FcHome } from "react-icons/fc";
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="container-fluid bg-custom">
            <Navbar className="bg-body-tertiary mt-3 mb-6 rounded-2 border justify-content-between">
                <Container className='pb-1'>
                    <Navbar.Brand>
                        <FcHome className="me-2 fs-4 mb-1 text-secondary d-none d-sm-inline"
                        /><span className='fs-4 text-secondary'>صفحه نخست</span>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <div className="dropdown open icon-user">
                            <Link
                                className="text-decoration-none text-secondary dropdown-toggle pl-3"
                                type="button"
                                id="triggerId"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <FaUserCircle className='text-secondary mb-1 d-none d-sm-inline fs-5' /><span className='me-2 text-secondary fs-5'>حساب کاربری</span>
                            </Link>
                            <div className="dropdown-menu pr-4 py-2 text-secondary" aria-labelledby="triggerId">
                                <Link className="row text-decoration-none text-secondary pr-4 py-1 fs-6" to="#"> <IoSettingsOutline className='icon-style' />تنظیمات</Link>
                                <Link className="row text-decoration-none text-secondary pr-4 py-1" to="#"><TbLogout className='icon-style-2' />خروج از حساب</Link>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {['warning'].map((variant) => (
                <Alert key={variant} variant={variant} className='shadow-custom'>
                    <div className='fs-5'>
                        <FaReact className='text-danger fs-5 ml-1' />فریم ورک و کتابخانه های "فرانت اند" استفاده شده :
                    </div>
                    <div className='mt-2 pt-2'>
                        <p><MdOutlineDoneOutline className='text-success ml-2' />فریم ورک (Bootstrap)</p>
                        <p><MdOutlineDoneOutline className='text-success ml-2' />کتابخانه (React Hot Toast)</p>
                        <p><MdOutlineDoneOutline className='text-success ml-2' />کتابخانه (React Router)</p>
                        <p><MdOutlineDoneOutline className='text-success ml-2' />کتابخانه (React Icons)</p>
                        <p><MdOutlineDoneOutline className='text-success ml-2' />کتابخانه (Recharts)</p>
                    </div>
                    <p className=''><ImWarning className='text-danger mb-1 ml-1 fs-6' />این پنل مدیریت بصورت داینامیک طراحی شده و برای "بک اند" از کتابخانه json-server جهت ذخیره سازی اطلاعات استفاده شده است.</p>
                </Alert>
            ))}
        </div>
    )
}