import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";
import { FaComments } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import './Header.css';

export default function Header() {
    const location = useLocation();

    return (
        <div>
            <div className='container-fluid'>
                <div className='row min-vh-100'>
                    <div className='bg-sidebar w-auto col-auto col-md-2 min-vh-100'>
                        <div className='d-flex justify-content-center text-nowrap pl-4 pr-2'>
                            <Link className='text-decoration-none text-white d-none d-sm-inline mt-3'>
                                <i className='fs-4'></i>
                                <span className='me-3 d-none d-sm-inline fs-4'>پنل مدیریت</span>
                            </Link>
                        </div>
                        <hr className='text-secondary d-none d-sm-block' />
                        <ul className="nav nav-pills flex-column mt-3 mt-sm-0 list-style">
                            <li className='nav-item text-white fs-3 my-1 py-2 py-sm-0'>
                                <Link
                                    to="/"
                                    className={`nav-link fs-6 ${location.pathname === "/" ? "active" : "text-white"}`}
                                    aria-current="page"
                                >
                                    <div className='mb-1'>
                                        <IoHome />
                                        <span className='me-2 d-none d-sm-inline'>صفحه نخست</span>
                                    </div>
                                </Link>
                            </li>
                            <li className='nav-item text-white fs-3 my-1 py-2 py-sm-0'>
                                <Link
                                    to="/dashboard"
                                    className={`nav-link fs-6 ${location.pathname === "/dashboard" ? "active" : "text-white"}`}
                                    aria-current="page"
                                >
                                    <div className='mb-1'>
                                        <MdSpaceDashboard />
                                        <span className='me-2 d-none d-sm-inline'>داشبورد</span>
                                    </div>
                                </Link>
                            </li>
                            <li className='nav-item text-white fs-3 my-1 py-2 py-sm-0'>
                                <Link
                                    to="/users"
                                    className={`nav-link fs-6 ${location.pathname === "/users" ? "active" : "text-white"}`}
                                    aria-current="page"
                                >
                                    <div className='mb-1'>
                                        <FaUsers />
                                        <span className='me-2 d-none d-sm-inline'>کاربران</span>
                                    </div>
                                </Link>
                            </li>
                            <li className='nav-item text-white fs-3 my-1 py-2 py-sm-0'>
                                <Link
                                    to="/products"
                                    className={`nav-link fs-6 ${location.pathname === "/products" ? "active" : "text-white"}`}
                                    aria-current="page"
                                >
                                    <div className='mb-1'>
                                        <FaBasketShopping />
                                        <span className='me-2 d-none d-sm-inline title'>محصولات</span>
                                    </div>
                                </Link>
                            </li>
                            <li className='nav-item text-white fs-3 my-1 py-2 py-sm-0'>
                                <Link
                                    to="/comments"
                                    className={`nav-link fs-6 ${location.pathname === "/comments" ? "active" : "text-white"}`}
                                    aria-current="page"
                                >
                                    <div className='mb-1'>
                                        <FaComments />
                                        <span className='me-2 d-none d-sm-inline'>کامنت ها</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                        <hr className='text-secondary mt-3 d-none d-sm-block' />
                        <div>
                            <Button variant="outline-danger" className='text-nowrap mt-3 pb-2'><FaPowerOff className='ml-1 mr-1' />
                                <span className='d-none d-sm-inline'>خروج از حساب کاربری</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}