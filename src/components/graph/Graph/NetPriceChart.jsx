// DataChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const NetPriceChart = ({ data }) => {
    // Prepare data for the chart
    const chartData = {
        labels: data.map(item => item.symbol), // X-axis labels
        datasets: [
            {
                label: 'Net Price',
                data: data.map(item =>{const totalBuyValue = item.buyPrice * item.volume; return(totalBuyValue)}), // Y-axis data
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1 // Optional: adds curve to the line
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Value owned in each Company',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default NetPriceChart;
