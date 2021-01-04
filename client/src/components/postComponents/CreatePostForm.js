import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Col, Button } from 'react-bootstrap'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import styled from 'styled-components'

function CreatePostForm(props) {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const Styles = styled.div`
    .image-preview {
      height: inherit;
      margin-left: 5%;
    }

    .preview-image {
      width: 100%;
      height: inherit;
      display: block;
      margin-bottom: 10px;
    }

    .preview-message {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5%;
    }

    .drop-zone {
      margin-bottom: 10px;
      padding: 40px 10px;
      height: inherit;
      border: 2px dashed #e9ebeb;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }
  }
`;

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);

          setErrorMsg('');
          await axios.post(`${API_URL}/api/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          props.history.push('/list');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return(
    <Styles>
    <Form className="search-form" onSubmit={handleOnSubmit}>
      <h2>Create Post Form</h2>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridArticleName">
          <Form.Label>Article Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={state.title || ''}
            placeholder="Enter article name "
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={state.description || ''}
          placeholder="Enter Description"
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Label>Upload Image</Form.Label>
      <div className="upload-section">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
              <input {...getInputProps()} />
              <p>Drag and drop a file OR click here to select a file</p>
              {file && (
                <div>
                  <strong>Selected file:</strong> {file.name}
                </div>
              )}
            </div>
          )}
        </Dropzone>

        {previewSrc ? (
          isPreviewAvailable ? (
            <div className="image-preview">
              <img className="preview-image" src={previewSrc} alt="Preview" />
            </div>
          ) : (
            <div className="preview-message">
              <p>No preview available for this file</p>
            </div>
          )
        ) : (
          <div className="preview-message">
            <p>Image preview will be shown here after selection</p>
          </div>
        )}
      </div><br/>

      <Button variant="primary" type="submit">Submit</Button>
    </Form>
    </Styles>
    )
}

export default CreatePostForm
