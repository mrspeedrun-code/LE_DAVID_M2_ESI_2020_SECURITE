import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { API_URL } from '../../utils/constants';
import axios from 'axios';
import styled from 'styled-components'

const Styles = styled.div`
.files-container {
  width: 98%;
  overflow-x: auto;
}

.files-table {
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;

  tr,
  td,
  th {
    border: 1px solid #ccc;
    padding: 10px;
  }

  .file-title {
    width: 20%;
  }

  .file-description {
    width: 70%;
  }
}
`;

function DeletePost() {
  let [posts, setPosts] = useState([])
  const [show, setShow] = useState(false);
  const [articleSelectedId, setArticleSelectedId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const articleSelected = (id) => setArticleSelectedId(id)

  const deleteArticle = () => {
    axios.delete(`${API_URL}/api/deletePost/${articleSelectedId._id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': localStorage.getItem('auth-token')
      }
    }).then(res => {
      // refresh view
      axios
      .get(`${API_URL}/api/getAllPosts`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('auth-token')
        }
      }).then(res => setPosts(res.data))
    })

    axios
      .get(`${API_URL}/api/getAllPosts`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('auth-token')
        }
      }).then(res => setPosts(res.data))
    handleClose()
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/api/getAllPosts`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('auth-token')
        }
      }).then(res => setPosts(res.data))
  }, []);

  return(
    <>
      <Styles>
        <h2>Delete List</h2>
        <div className="files-container">
        <table className="files-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map(
                ({ _id, title, description }) => (
                  <tr key={_id}>

                    <td className="file-title">{title}</td>
                    <td className="file-description">{description}</td>
                    <td>
                      <Button variant="outline-danger" onClick={() => {
                        handleShow();
                        articleSelected({_id});
                      }}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={3} style={{ fontWeight: '300' }}>
                  No files found. Please add some.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Article</Modal.Title>
        </Modal.Header>
          <Modal.Body>Are you sure you want to delete this article ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outline-danger" onClick={deleteArticle}>
              Delete Article
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </Styles>
    </>
  )
}

export default DeletePost
