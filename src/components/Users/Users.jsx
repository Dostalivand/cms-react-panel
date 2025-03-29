import React, { useEffect, useState } from 'react';
import { ImWarning } from "react-icons/im";
import { PiUsers } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { Table } from 'react-bootstrap';
import ErrorBox from '../ErrorBox/ErrorBox';
import Alert from 'react-bootstrap/Alert';
import DeleteUserModal from '../DeleteUser/DeleteUserModal';
import DetailsUserModal from '../DetailsUser/DetailsUserModal';
import EditUserModal from '../EditUser/EditUserModal';
import AddNewUser from '../AddNewUser/AddNewUser';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Users.css'
import { Link } from 'react-router-dom';

export default function Users() {

    const [allUsers, setAllUsers] = useState([])
    const [userID, setUserID] = useState(null)

    useEffect(() => {
        getAllUsers()
    }, [])

    function getAllUsers() {
        fetch(`https://backend-cms.liara.run/users`)
            .then(res => res.json(res))
            .then(users => {
                setAllUsers(users)
            })
    }

    const deleteUserModal = () => {
        fetch(`https://backend-cms.liara.run/users/${userID}`, {
            method: 'DELETE'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to delete product. Status: ${res.status}`);
                }
                return res.json();
            })
            .then(() => {
                getAllUsers();
            })
            .catch((error) => {
                console.error('Error deleting product:', error.message);
            });
    }

    const editUserModal = (updatedUser) => {
        fetch(`https://backend-cms.liara.run/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to update product. Status: ${res.status}`);
                }
                return res.json();
            })
            .then(() => {
                getAllUsers();
            })
            .catch((error) => {
                console.error('Error updating product:', error.message); 
            });

    }


    return (
        <div className="container-fluid bg-custom">
            <Navbar className="bg-body-tertiary mt-3 mb-6 rounded-2 border justify-content-between">
                <Container className='pb-1'>
                    <Navbar.Brand>
                        <PiUsers className="me-2 fs-4 text-secondary d-none d-sm-inline"
                        /><span className='fs-4 text-secondary'>کاربران</span>
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
            {/* <Navbar className="bg-body-tertiary mt-3 mb-6 rounded-2 border">
                <Container className='pb-2'>
                    <Navbar.Brand>
                        <PiUsers className="me-2 fs-4 text-secondary"
                        /><span className='fs-4 text-secondary'>کاربران</span>
                    </Navbar.Brand>
                    <div className="dropdown open mt-4 icon-user dropdown-style">
                        <a
                            className="text-decoration-none text-secondary dropdown-toggle pl-3 pt-4 mt-1"
                            type="button"
                            id="triggerId"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <FaUserCircle className='mb-1 text-secondary d-none d-sm-inline fs-5' /><span className='me-2 text-secondary fs-5'>حساب کاربری</span>
                        </a>
                        <div className="dropdown-menu pr-4 py-2 text-secondary" aria-labelledby="triggerId">
                            <a className="row text-decoration-none text-secondary pr-4 py-1 fs-6" href="#"> <IoSettingsOutline className='icon-style' />تنظیمات</a>
                            <a className="row text-decoration-none text-secondary pr-4 py-1" href="#"><TbLogout className='icon-style-2' />خروج از حساب</a>
                        </div>
                    </div>
                </Container>
            </Navbar> */}
            {/* <h3 className="mb-5 mt-4 mr-3">
                <PiUsers className="me-2" />
                کاربران
            </h3> */}
            {/* {[
                'warning',
            ].map((variant) => (
                <Alert key={variant} variant={variant} className='fs-sm-5 fs-md-3 fs-1 shadow'>
                    <div className='fs-1 fs-md-3 fs-sm-5 mb-3'>
                        <ImWarning className='mb-1 ml-1' />نحوه عملکرد بخش کاربران :
                    </div>
                    <p>این بخش بصورت داینامیک طراحی شده و با اضافه کردن کاربر جدید و سپس در قسمت <span className='fw-normal'>" تنظیمات "</span> میتوانید تمامی کاربران را مدیریت کنید. </p>

                </Alert>
            ))} */}
            {['warning'].map((variant) => (
                <Alert
                    key={variant}
                    variant={variant}
                    className="shadow"
                >
                    {/* عنوان با کلاس‌های سفارشی */}
                    <div className="responsive-title mb-3">
                        <ImWarning className="mb-1 me-2" />
                        نحوه عملکرد بخش کاربران:
                    </div>

                    {/* متن پاراگراف با کلاس‌های سفارشی */}
                    <p className="responsive-text">
                        این بخش بصورت داینامیک طراحی شده و با اضافه کردن کاربر جدید و سپس در قسمت " تنظیمات " می‌توانید تمامی کاربران را مدیریت کنید.
                    </p>
                </Alert>
            ))}
            <AddNewUser getAllUsers={getAllUsers} />
            {allUsers.length ? (
                <Table striped bordered hover className="text-center responsive-title-1 shadow-custom rounded-3 overflow-hidden">
                    <thead>
                        <tr>
                            <th className="bg-secondary text-white text-nowrap">نام کاربری</th>
                            <th className="bg-secondary text-white">پسورد</th>
                            <th className="bg-secondary text-white">ایمیل</th>
                            <th className="bg-secondary text-white">تنظیمات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.slice().reverse().map((user) => (
                            <tr key={user.id}>
                                <td className='custom-font'>{user.username}</td>
                                <td className='custom-font'>{user.password}</td>
                                <td className='custom-font'>{user.email}</td>
                                <td className='custom-font'>
                                    <DetailsUserModal user={user} />
                                    <DeleteUserModal variant="outline-danger"
                                        deleteUserModal={deleteUserModal}
                                        userID={user.id}
                                        setUserID={setUserID}
                                    />
                                    <EditUserModal
                                        user={user}
                                        onSubmit={editUserModal}
                                        variant="outline-success" className="ml-1 mb-1 btn-sm" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div className="error-box-style">
                    <ErrorBox message={'کاربری وجود ندارد.'} />
                </div>
            )}
        </div>
    )
}
