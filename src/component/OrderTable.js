import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import { badgeBg } from '../constants/order.constants';
import { currencyFormat } from '../utils/number';
import moment from 'moment-timezone';
const OrderTable = ({ header, data, openEditForm }) => {
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
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id} onClick={() => openEditForm(item)}>
                <th>{index}</th>
                <th>{item.orderNum}</th>
                <th>{item.userId.email}</th>
                <th>
                  {moment(item.createdAt)
                    .tz('Asia/Seoul')
                    .format('YYYY-MM-DD HH:mm:ss')}
                </th>
                {item.items.length > 0 ? (
                  <th>
                    {item.items[0].productId.name}
                    {item.items.length > 1 && `외 ${item.items.length - 1}개`}
                  </th>
                ) : (
                  <th></th>
                )}
                <th>{item.shipTo.address + ' ' + item.shipTo.city}</th>
                <th>{item.totalPrice.toLocaleString('ko-KR') + '원'}</th>
                <th>
                  <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={header.length}>No Data to show</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default OrderTable;
