import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaRegComments } from 'react-icons/fa6';
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { ImWarning } from "react-icons/im";
import ErrorBox from '../ErrorBox/ErrorBox';
import DetailsCommentsModal from '../DetailsComment/DetailsCommentsModal';
import DeleteCommentModal from '../DeleteComment/DeleteCommentModal';
import EditCommentModal from '../EditComment/EditCommentModal';
import AcceptModal from '../AcceptModal/AcceptModal';
import Alert from 'react-bootstrap/Alert';
import AddComment from '../AddComment/AddComment';
import AnswerCommentModal from '../AnswerComment/AnswerCommentModal';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Comments.css';
import { Link } from 'react-router-dom';

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [commentID, setCommentID] = useState(null)

  useEffect(() => {
    getAllComments()
  }, [])

  function getAllComments() {
    fetch(`https://backend-cms.liara.run/comments`)
      .then((res) => res.json())
      .then((comments) => {
        setAllComments(comments)
      })
  }

  const deleteCommentModal = () => {
    fetch(`https://backend-cms.liara.run/comments/${commentID}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete product. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        getAllComments(); 
      })
      .catch((error) => {
        console.error('Error deleting product:', error.message);
      });
  }

  const editCommentModal = (updatedComment) => {
    fetch(`https://backend-cms.liara.run/comments/${updatedComment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedComment)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update product. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        getAllComments();
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
            <FaRegComments className="me-2 fs-4 text-secondary d-none d-sm-inline"
            /><span className='fs-4 text-secondary'>کامنت ها</span>
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
        <Alert key={variant} variant={variant} className='shadow'>
          <div className='mb-3 responsive-title'>
            <ImWarning className='mb-1 ml-1' />نحوه عملکرد قسمت کامنت :
          </div>
          <p className='responsive-text'> این قسمت بصورت داینامیک طراحی شده و با اضافه کردن کامنت جدید و سپس در قسمت <span className='fw-normal'>" تنظیمات "</span> میتوانید تمامی کامنت ها را مدیریت کنید. </p>
        </Alert>
      ))}
      <AddComment getAllComments={getAllComments} />
      {allComments.length ? (
        <Table striped bordered hover className="text-center responsive-title-1 shadow-custom rounded-3 overflow-hidden">
          <thead>
            <tr>
              <th className="bg-secondary text-white text-nowrap">نام کاربری</th>
              <th className="bg-secondary text-white">محصول</th>
              <th className="bg-secondary text-white">تاریخ</th>
              <th className="bg-secondary text-white">تنظیمات</th>
            </tr>
          </thead>
          <tbody>
            {allComments.slice().reverse().map((comment) => (
              <tr key={comment.id}>
                <td className='custom-font'>{comment.userName}</td>
                <td className='custom-font'>{comment.productName}</td>
                <td className='custom-font'>{comment.date}</td>
                <td className='custom-font'>
                  <DetailsCommentsModal comment={comment} />
                  <AcceptModal />
                  <DeleteCommentModal variant="outline-danger"
                    deleteCommentModal={deleteCommentModal}
                    commentID={comment.id}
                    setCommentID={setCommentID}
                  />
                  <AnswerCommentModal />
                  <EditCommentModal
                    comment={comment}
                    onSubmit={editCommentModal}
                    variant="outline-success" className="ml-1 mb-1 btn-sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="error-box-style">
          <ErrorBox message={'کامنتی وجود ندارد.'} />
        </div>
      )}
    </div>

  );
}
