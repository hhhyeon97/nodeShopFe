import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBox from '../component/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderAction';
import OrderDetailDialog from '../component/OrderDetailDialog';
import OrderTable from '../component/OrderTable';
import * as types from '../constants/order.constants';
import ReactPaginate from 'react-paginate';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { commonUiActions } from '../action/commonUiAction';

const AdminOrderPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order.orderList) || [];
  const [searchQuery, setSearchQuery] = useState({
    page: query.get('page') || 1,
    ordernum: query.get('ordernum') || '',
  });
  const [open, setOpen] = useState(false);
  const totalPageNum = useSelector((state) => state.order.totalPageNum) || 1;
  const tableHeader = [
    '#',
    'Order Number',
    'User',
    'Order Date',
    'Order Item',
    'Address',
    'Total Price',
    'Status',
  ];

  useEffect(() => {
    dispatch(orderActions.getOrderList({ ...searchQuery }));
  }, [query, dispatch]);

  useEffect(() => {
    if (searchQuery.ordernum === '') {
      delete searchQuery.ordernum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();
    // console.log('qqq', queryString);
    navigate('?' + queryString);
  }, [searchQuery, navigate]);

  const openEditForm = (order) => {
    setOpen(true);
    dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2 display-center mb-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="오더번호"
            field="ordernum"
          />
        </div>

        {orderList.length > 0 && (
          <OrderTable
            header={tableHeader}
            data={orderList}
            openEditForm={openEditForm}
          />
        )}
        {orderList.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              marginTop: '30px',
              marginBottom: '30px',
            }}
          >
            해당하는 주문 내역이 없습니다.
          </p>
        )}

        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
          forcePage={searchQuery.page - 1}
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="display-center list-style-none"
        />
      </Container>

      {open && (
        <OrderDetailDialog
          open={open}
          handleClose={handleClose}
          navigate={navigate}
          setSearchQuery={setSearchQuery}
          currentPage={searchQuery.page}
        />
      )}
    </div>
  );
};

export default AdminOrderPage;
