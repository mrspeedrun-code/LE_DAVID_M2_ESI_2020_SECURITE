import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, NavItem } from 'react-bootstrap';

function ActionPost() {
    return(
      <>
        <NavItem>
          <Link to="/">
            <Button variant="info" size="lg">
              List Post
            </Button>{' '}
          </Link>
          <Link to="/post">
            <Button variant="primary" size="lg">
              Create Post
            </Button>{' '}
          </Link>
          <Link to="/delete">
            <Button variant="warning" size="lg">
              Delete Post
            </Button>
          </Link>
        </NavItem>
      </>
    )
}

export default ActionPost
