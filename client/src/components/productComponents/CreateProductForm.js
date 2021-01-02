import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Col, Button } from 'react-bootstrap'
import Dropzone from 'react-dropzone';

function CreateProductForm() {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

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
    console.log(event)
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
          // await axios.post(`${API_URL}/upload`, formData, {
          //   headers: {
          //     'Content-Type': 'multipart/form-data'
          //   }
          // });
          // props.history.push('/list');
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
    <Form className="search-form" onSubmit={handleOnSubmit}>
      <h2>Create Product Form</h2>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridId">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={state.id || ''}
            placeholder="Enter ID"
            onChange={handleInputChange}
          />
        </Form.Group>

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
    )
}

export default CreateProductForm

// How to upload image ??
// Don't forget list
// Delete button
// Login first page before access home page

// modèle login
// email
// password

// modèle product
// id
// nom article
// description article
// photo