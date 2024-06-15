import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import SearchBox from '../component/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import NewItemDialog from '../component/NewItemDialog';
import * as types from '../constants/product.constants';
import ReactPaginate from 'react-paginate';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { commonUiActions } from '../action/commonUiAction';
import ProductTable from '../component/ProductTable';
import api from '../utils/api';
const AdminProduct = () => {
  const navigate = useNavigate();
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get('page') || 1,
    name: query.get('name') || '',
  });

  const [mode, setMode] = useState('new');
  const tableHeader = [
    '#',
    'Sku',
    'Name',
    'Price',
    'Stock',
    'Image',
    'Status',
    '',
  ];

  // useEffect(() => {
  //   // 페이지 로딩 시 기본 페이지 설정
  //   const page = query.get('page') || 1; // URL에서 페이지 번호 읽기
  //   setSearchQuery({ ...searchQuery, page }); // 검색 쿼리 업데이트
  //   dispatch(productActions.getProductList({ ...searchQuery, page })); // 상품 목록 가져오기
  // }, []);

  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery }));
  }, [query, dispatch]);

  useEffect(() => {
    if (searchQuery.name === '') {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();
    navigate(`?${queryString}`);
  }, [searchQuery, navigate]);

  // useEffect(() => {
  //   const params = new URLSearchParams(searchQuery);
  //   const queryString = params.toString();
  //   navigate(`?${queryString}`);
  // }, [searchQuery, navigate]);

  const deleteItem = (id) => {
    dispatch(productActions.deleteProduct(id, navigate, setSearchQuery));
  };

  const openEditForm = (product) => {
    setMode('edit');
    dispatch({ type: types.SET_SELECTED_PRODUCT, payload: product });
    setShowDialog(true);
  };

  const handleClickNewItem = () => {
    setMode('new');
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    const nextPage = selected + 1; // 변경된 페이지 번호 계산
    setSearchQuery({ ...searchQuery, page: nextPage }); // 검색 쿼리 업데이트
    dispatch(productActions.getProductList({ ...searchQuery, page: nextPage })); // 상품 목록 가져오기
  };

  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="제품 이름으로 검색"
            field="name"
          />
        </div>
        <Button className="mt-2 mb-2" onClick={handleClickNewItem}>
          Add New Item +
        </Button>

        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />
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

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        navigate={navigate}
        // searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={searchQuery.page}
      />
    </div>
  );
};

export default AdminProduct;
