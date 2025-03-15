import { useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { ImWarning } from "react-icons/im";
import { LuCirclePlus } from "react-icons/lu";
import { PiBasket } from "react-icons/pi";
import toast, { Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './AddNewProduct.css'
import { Link } from 'react-router-dom';

function AddNewProduct({ getAllProducts }) {
    const [validated, setValidated] = useState(false);
    const [addNewProductName, setAddNewProductName] = useState('')
    const [addNewProductPrice, setAddNewProductPrice] = useState('')
    const [addNewProductCount, setAddNewProductCount] = useState('')
    const [addNewProductImg, setAddNewProductImg] = useState('no image')
    const [addNewProductPopularity, setAddNewProductPopularity] = useState('')
    const [addNewProductDesc, setAddNewProductDesc] = useState('')

    // تابع ارسال محصول جدید به سرور
    const addNewProduct = {
        title: addNewProductName,
        price: addNewProductPrice,
        count: addNewProductCount,
        img: addNewProductImg === 'no image' ? null : addNewProductImg,
        popularity: addNewProductPopularity,
        productDesc: addNewProductDesc,
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const clickHandlerAddNewProduct = () => {
        fetch(`https://backend-cms.liara.run/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addNewProduct)
        }).then(res => res.json(res))
            .then(data => {
                console.log(data)
                getAllProducts()
                emptyInput()
                toast.success('🦄 با موفقیت اضافه شد!');
            })
    }

    // تابع برای خالی کردن فیلدهای ورودی
    function emptyInput() {
        setAddNewProductName('')
        setAddNewProductPrice('')
        setAddNewProductCount('')
        setAddNewProductImg('no image')
        setAddNewProductPopularity('')
        setAddNewProductDesc('')
    }

    // تابع برای بررسی اینکه آیا تمام فیلدها پر شده‌اند یا خیر
    const handleFormValidation = () => {
        if (
            addNewProductName &&
            addNewProductPrice &&
            addNewProductCount &&
            (addNewProductImg !== 'no image' || addNewProductImg === 'no image') && // چک برای وجود تصویر
            addNewProductPopularity &&
            addNewProductDesc
        ) {
            clickHandlerAddNewProduct();
            setValidated(false);
        } else {
            setValidated(true);
        }
    };

    // اینجا کد مربوط به آپلود تصویر است:
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                setAddNewProductImg(base64String);
            };
            reader.readAsDataURL(file);
        } else {
            setAddNewProductImg('no image'); 
        }
    };

    return (
        <div className="pr-2 pl-2">
            <Toaster position="top-right" reverseOrder={false} />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="w-auto">
                    <Navbar className="bg-body-tertiary mt-3 mb-6 rounded-2 border justify-content-between">
                        <Container className='pb-1'>
                            <Navbar.Brand>
                                <PiBasket className="me-2 fs-4 text-secondary d-none d-sm-inline"
                                /><span className='fs-4 text-secondary'>محصولات</span>
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
                                    <div className="dropdown-menu row pr-4 py-2 text-secondary" aria-labelledby="triggerId">
                                        <Link className="row text-decoration-none text-secondary pr-4 py-1 fs-6" to="#"> <IoSettingsOutline className='icon-style' />تنظیمات</Link>
                                        <Link className="row text-decoration-none text-secondary pr-4 py-1" to="#"><TbLogout className='icon-style-2' />خروج از حساب</Link>
                                    </div>
                                </div>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    {['warning'].map((variant) => (
                        <Alert key={variant} variant={variant} className='mb-4 shadow'>
                            <div className='responsive-title mb-3'>
                                <ImWarning className='mb-1 ml-1' />نحوه عملکرد قسمت محصولات :
                            </div>
                            <p className='responsive-text'> این قسمت بصورت داینامیک طراحی شده و با اضافه کردن محصول جدید و سپس در قسمت <span className='fw-normal'>" تنظیمات "</span> میتوانید تمامی محصولات را مدیریت کنید. </p>
                        </Alert>
                    ))}
                    <Form.Group as={Col} md="4" controlId="validationCustom01" className='mb-3'>
                        <Form.Label>نام محصول :</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="نام محصول را بنویسید"
                            value={addNewProductName}
                            onChange={(event) => setAddNewProductName(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            پر کردن این بخش الزامی میباشد.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02" className='mb-3'>
                        <Form.Label>قیمت :</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="تومان"
                            value={addNewProductPrice}
                            onChange={(event) => setAddNewProductPrice(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            لطفا فقط عدد وارد کنید.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom03" className='mb-3'>
                        <Form.Label>موجودی :</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="بصورت عدد وارد کنید"
                            value={addNewProductCount}
                            onChange={(event) => setAddNewProductCount(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            لطفا فقط عدد وارد کنید.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="formFile" className='mb-3'>
                        <Form.Label>درج تصویر :</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            placeholder="آدرس عکس محصول را وارد کنید"
                            onChange={handleImageChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            پر کردن این بخش الزامی میباشد.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04" className='mb-3'>
                        <Form.Label>میزان محبوبیت :</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="بصورت عدد وارد کنید."
                            value={addNewProductPopularity}
                            onChange={(event) => setAddNewProductPopularity(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            لطفا فقط عدد وارد کنید.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom05" className='mb-3'>
                        <Form.Label>میزان فروش :</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="بصورت عدد وارد کنید."
                            value={addNewProductDesc}
                            onChange={(event) => setAddNewProductDesc(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            لطفا فقط عدد وارد کنید.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button variant="primary" onClick={handleFormValidation} className='mt-3 mb-5 shadow-custom'>
                    <LuCirclePlus className='ml-1 fs-5' />افزودن محصول
                </Button>
            </Form>
        </div>
    );
}
export default AddNewProduct;