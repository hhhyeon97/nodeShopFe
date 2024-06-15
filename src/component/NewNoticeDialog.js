import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { noticeActions } from '../action/noticeAction';

const NewNoticeDialog = ({ showDialog, setShowDialog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.notice);

  const handleClose = () => {
    setTitle('');
    setContent('');
    setShowDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(noticeActions.createNotice({ title, content }));
    if (success) {
      handleClose();
    }
  };

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Notice</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Loading…' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Form>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </Modal>
  );
};

export default NewNoticeDialog;
