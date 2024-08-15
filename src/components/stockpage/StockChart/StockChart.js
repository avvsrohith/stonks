// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import './StockChart.css';

// function StockChart({ intradayData, dailyData }) {
//   const [timeframe, setTimeframe] = useState('intraday');

//   const prepareChartData = (data, isIntraday) => {
//     const entries = Object.entries(data);
//     const labels = entries.map(([date]) => isIntraday ? date.split(' ')[1] : date);
//     const prices = entries.map(([, values]) => parseFloat(values['4. close']));

//     return {
//       labels: labels.reverse(),
//       datasets: [
//         {
//           label: 'Stock Price',
//           data: prices.reverse(),
//           borderColor: 'rgb(75, 192, 192)',
//           tension: 0.1
//         }
//       ]
//     };
//   };

//   const chartData = timeframe === 'intraday' 
//     ? prepareChartData(intradayData, true)
//     : prepareChartData(dailyData, false);

//   return (
//     <div className="stock-chart">
//       <div className="chart-controls">
//         <button onClick={() => setTimeframe('intraday')}>Intraday</button>
//         <button onClick={() => setTimeframe('daily')}>Daily</button>
//       </div>
//       <Line data={chartData} />
//     </div>
//   );
// }

// export default StockChart;


// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import './StockChart.css';

// function StockChart({ data }) {
//   const chartData = data.t.map((timestamp, index) => ({
//     date: new Date(timestamp * 1000).toLocaleDateString(),
//     price: data.c[index]
//   }));

//   return (
//     <div className="stock-chart">
//       <h2>30-Day Price History</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="price" stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default StockChart;


// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import './StockChart.css';

// function StockChart({ data }) {
//   // Check if data is available and has the expected structure
//   if (!data || !data.t || !Array.isArray(data.t) || !data.c || !Array.isArray(data.c)) {
//     return <div>No chart data available</div>;
//   }

//   const chartData = data.t.map((timestamp, index) => ({
//     date: new Date(timestamp * 1000).toLocaleDateString(),
//     price: data.c[index]
//   }));

//   return (
//     <div className="stock-chart">
//       <h2>30-Day Price History</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="price" stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default StockChart;

// components/StockChart.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAggregates } from '../../../api/polygon';
import './StockChart.css';

function StockChart({ symbol }) {
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const to = new Date().toISOString().split('T')[0];
        console.log(to);
        let from, multiplier, timespan;

        switch (timeframe) {
          case 'week':
            from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            multiplier = 1;
            timespan = 'hour';
            break;
          case 'month':
            from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            multiplier = 1;
            timespan = 'day';
            break;
          case 'year':
            from = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            multiplier = 1;
            timespan = 'week';
            break;
          default:
            from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            multiplier = 1;
            timespan = 'hour';
        }

        const data = await getAggregates(symbol, multiplier, timespan, from, to);
        
        if (data.results) {
          const formattedData = data.results.map(item => ({
            date: new Date(item.t).toLocaleDateString(),
            price: item.c
          }));
          setChartData(formattedData);
        } else {
          setError('No data available');
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError('Failed to fetch chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol, timeframe]);

  if (loading) return <div>Loading chart data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="stock-chart">
      <div className='charttitle'>Price History</div>
      <div className="chart-controls">
        <button onClick={() => setTimeframe('week')}>1 Week</button>
        <button onClick={() => setTimeframe('month')}>1 Month</button>
        <button onClick={() => setTimeframe('year')}>1 Year</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;