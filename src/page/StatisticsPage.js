import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const StatisticsPage = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('/api/order/total');
        setTotalSales(response.data.data.totalSales);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const data = {
    labels: ['Total Sales'],
    datasets: [
      {
        label: 'Total Sales',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [totalSales],
      },
    ],
  };

  return (
    <div>
      <h1>Total Sales</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: '80%', margin: 'auto' }}>
          <Line data={data} />
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;
