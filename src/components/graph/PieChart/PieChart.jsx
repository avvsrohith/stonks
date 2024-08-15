import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SharesPieChart = ({ data }) => {
    // Compute total buy value
    const totalBuyValue = data.reduce((acc, item) => acc + item.buyPrice * item.volume, 0);

    // Prepare data for the chart
    const chartData = {
        labels: data.map(item => item.symbol), // Labels for pie segments
        datasets: [
            {
                label: 'Share Distribution',
                data: data.map(item => (item.buyPrice * item.volume / totalBuyValue) * 100), // Percentage data
                backgroundColor: data.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`), // Random colors for each slice
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1,
            }
        ]
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw.toFixed(2);
                        return `${label}: ${value}%`;
                    }
                }
            }
        }
    };

    return <Pie data={chartData} options={options} />;
};

// PropTypes for validation
SharesPieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            symbol: PropTypes.string.isRequired,
            buyPrice: PropTypes.number.isRequired,
            volume: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default SharesPieChart;
