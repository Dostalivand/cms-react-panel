import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { ImWarning } from "react-icons/im";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, Row, Col } from "react-bootstrap";
import { RxDashboard } from "react-icons/rx";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./Dashboard.css";
import { Link } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#5e6e82"];

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [barOffset] = useState(0);

    useEffect(() => {
        Promise.all([
            fetch("https://backend-cms.liara.run/comments").then((response) => response.json()),
            fetch("https://backend-cms.liara.run/products").then((response) => response.json()),
            fetch("https://backend-cms.liara.run/users").then((response) => response.json())
        ])
            .then(([comments, products, users]) => {
                setData([
                    { name: "کاربران", value: users.length },
                    { name: "محصولات", value: products.length },
                    { name: "کامنت‌ها", value: comments.length }
                ]);

                setBarData([
                    { name: "کاربران", Number: users.length },
                    { name: "محصولات", Number: products.length },
                    { name: "کامنت‌ها", Number: comments.length }
                ]);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    if (data.length === 0 || barData.length === 0) {
        return <div className="d-flex justify-content-center align-items-center text-white">در حال اتصال به سرور ...</div>;
    }

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <g>
                <text
                    x={x}
                    y={y - 10}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={14}
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                <text
                    x={x}
                    y={y + 10}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={12}
                >
                    {data[index].name}
                </text>
            </g>
        );
    };

    return (
        <>
            <div className="container-fluid bg-custom">
                <Navbar className="bg-body-tertiary mt-3 mb-6 rounded-2 border justify-content-between">
                    <Container className='pb-1'>
                        <Navbar.Brand>
                            <RxDashboard className="me-2 fs-4 text-secondary d-none d-sm-inline"
                            /><span className='fs-4 text-secondary'>داشبورد</span>
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
                                    <Link className="row text-decoration-none text-secondary pr-4 py-1 fs-6" href="#"> <IoSettingsOutline className='icon-style' />تنظیمات</Link>
                                    <Link className="row text-decoration-none text-secondary pr-4 py-1" href="#"><TbLogout className='icon-style-2' />خروج از حساب</Link>
                                </div>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="">
                    {['warning'].map((variant) => (
                        <Alert key={variant} variant={variant} className="shadow-custom">
                            <div className='responsive-title mb-3'>
                                <ImWarning className='mb-1 ml-1' />نحوه عملکرد داشبورد :
                            </div>
                            <p className="responsive-text">این قسمت بصورت داینامیک طراحی شده و با اضافه کردن و یا حذف مقادیر از بخش پنل مدیریت ، گزارش ها بصورت خودکار تغییر خواهند کرد.</p>
                        </Alert>
                    ))}
                </div>
                <Row className="chart-container" style={{ justifyContent: "center", alignItems: "center" }}>
                    <Col xs={12} md={6} className="mb-4">
                        <Card
                            bg="bg-custom"
                            text="dark"
                            style={{ padding: "10px" }}
                            className="shadow-custom"
                        >
                            <Card.Header style={{ textAlign: "center", fontSize: "1.5rem", border: "1px solid lightgray" }}>
                                گزارش آمار درصدی
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} className="mb-4">
                        <Card
                            bg="bg-custom"
                            text="dark"
                            style={{
                                padding: "10px"
                            }}
                            className="shadow-custom"
                        >
                            <Card.Header style={{ textAlign: "center", fontSize: "1.5rem", border: "1px solid lightgray" }}>
                                گزارش آمار عددی
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={barData}
                                        margin={{
                                            top: 50,
                                            right: 55,
                                            left: 0,
                                            bottom: 5
                                        }}
                                        barSize={40}
                                    >
                                        <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 10 }} />
                                        <YAxis dx={-20} />
                                        <Tooltip />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Bar
                                            dataKey="Number"
                                            fill="#8884d8"
                                            background={{ fill: "#eee" }}
                                            radius={[barOffset, barOffset, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Dashboard;




