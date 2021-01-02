import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Button, NavItem } from 'react-bootstrap';

function CreateProduct() {
    return(
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <NavItem>
            <Link to="/product">
              <Button variant="outline-secondary">Create Product</Button>
            </Link>
          </NavItem>
        </InputGroup.Prepend>
        <FormControl aria-describedby="basic-addon1" />
      </InputGroup>
    )
}

export default CreateProduct
