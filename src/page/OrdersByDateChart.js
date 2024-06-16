import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersByDateTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/order/orders-by-date');
        console('rrr', response);
        setData(response.data.data.ordersByDate);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // 데이터 로딩 실패 시에도 로딩 상태를 false로 변경
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <h2>주문 건수별 날짜 (테이블)</h2>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>주문 건수</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.date).toLocaleDateString('en-US')}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersByDateTable;
