import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { API_URL } from '../../utils/constants';
import axios from 'axios';

function ListPost() {
  let [posts, setPosts] = useState([])

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
      <h2>List</h2>
      {posts.map((data) => (
        <>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>
              {data.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
      ))}
    </>
  )
}

export default ListPost
