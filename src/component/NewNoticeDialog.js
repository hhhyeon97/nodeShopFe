import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { noticeActions } from '../action/noticeAction';
import { commonUiActions } from '../action/commonUiAction';

const InitialFormData = {
  title: '',
  content: '',
};

const NewNoticeDialog = ({ showDialog, setShowDialog }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(InitialFormData);
  const { loading, error, success } = useSelector((state) => state.notice);

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(noticeActions.createNotice({ formData }));
    if (success) {
      handleClose();
    }
  };

  const handleChange = (event) => {
    //form에 데이터 넣어주기
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {/* {mode === 'new' ? 'Create New Notice' : 'Edit Notice'} */}
          add new notice !
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {/* {mode === 'new' ? 'Create' : 'Save changes'} */}
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewNoticeDialog;
