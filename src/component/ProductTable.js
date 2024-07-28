import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { currencyFormat } from '../utils/number';
const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`정말로 "${name}" 상품을 삭제하시겠습니까?`)) {
      deleteItem(id);
    }
  };

  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: '100px' }}>{item.name}</th>
                <th>
                  {item.price.toLocaleString('ko-KR') + '원'}
                  <div style={{ color: '#8aaceb' }}>
                    Sale : 50% →{' '}
                    {(item.price / 2).toLocaleString('ko-KR') + '원'}
                  </div>
                </th>
                <th>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </th>
                <th>
                  <img src={item.image} width={100} height={150} alt="image" />
                </th>
                <th>{item.status}</th>
                <th style={{ minWidth: '100px' }}>
                  <Button
                    size="sm"
                    variant="danger"
                    // onClick={() => deleteItem(item._id)}
                    onClick={() => handleDelete(item._id, item.name)}
                    className="mr-1 mb-1"
                  >
                    -
                  </Button>
                  <button
                    size="sm"
                    className="custom-btn"
                    onClick={() => openEditForm(item)}
                  >
                    수정
                  </button>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductTable;
