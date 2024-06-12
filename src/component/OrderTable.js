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
            {header.map((title) => (
              <th>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr onClick={() => openEditForm(item)}>
                <th>{index}</th>
                <th>{item.orderNum}</th>
                {/* <th>{item.createdAt.slice(0, 10)}</th> */}
                <th>
                  {moment(item.createdAt)
                    .tz('Asia/Seoul')
                    .format('YYYY-MM-DD HH:mm:ss')}
                </th>
                {/*// todo email 안 나오는 이유 그 백엔드에서 추가로 populate ?..그거 해주면 나올 듯 */}
                <th>{item.userId.email}</th>
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
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default OrderTable;
