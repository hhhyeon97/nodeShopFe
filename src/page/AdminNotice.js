import React, { useEffect, useState } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { noticeActions } from '../action/noticeAction';
import NewNoticeDialog from '../component/NewNoticeDialog';

const AdminNotice = () => {
  const dispatch = useDispatch();
  const { notice } = useSelector((state) => state.notice);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    dispatch(noticeActions.getNoticeList());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(noticeActions.deleteNotice(id));
  };

  const handleClickNewNotice = () => {
    setShowDialog(true);
  };

  // if (!notices) {
  //   return <div>Loading...</div>; // 로딩 중일 때 보여줄 메시지 또는 스피너
  // }

  return (
    <Container>
      <button className="mt-2 mb-2 custom-btn" onClick={handleClickNewNotice}>
        공지 작성
      </button>

      {/* {notices.length === 0 ? (
        <div>No notices found.</div> // 데이터가 없을 때 보여줄 메시지
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, index) => (
              <tr key={notice._id}>
                <td>{index + 1}</td>
                <td>{notice.title}</td>
                <td>{notice.content}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(notice._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )} */}

      <NewNoticeDialog showDialog={showDialog} setShowDialog={setShowDialog} />
    </Container>
  );
};

export default AdminNotice;
