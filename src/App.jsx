import React from "react";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import Comments from "./components/Comments/Comments";
import Users from "./components/Users/Users";
import HomePage from "./components/HomePage/HomePage";



export default function App() {
  return (
    <>
      <div className="d-flex">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/comments" element={<Comments />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div >
    </>
  );
}
