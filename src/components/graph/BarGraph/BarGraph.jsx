// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// import PropTypes from 'prop-types';

// // Register necessary components for Chart.js
// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const ComparisonBarChart = ({ data }) => {
//     // Prepare data for the chart
//     const chartData = {
//         labels: data.map(item => item.symbol), // X-axis labels
//         datasets: [
//             {
//                 label: 'Total Buy Value',
//                 data: data.map(item => item.buyPrice * item.volume), // Y-axis data for total buy value
//                 backgroundColor: 'rgba(75, 192, 192, 0.5)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1,
//             },
//             {
//                 label: 'Total Actual Value',
//                 data: data.map(item => item.sellPrice * item.volume), // Y-axis data for total actual value
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 borderColor: 'rgba(255, 99, 132, 1)',
//                 borderWidth: 1,
//             }
//         ]
//     };

//     // Chart options
//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Comparison of Total Buy Value and Total Actual Value',
//             },
//         },
//         scales: {
//             x: {
//                 stacked: true, // Stack bars on the x-axis
//             },
//             y: {
//                 stacked: true, // Stack bars on the y-axis
//             }
//         }
//     };

//     return <Bar data={chartData} options={options} />;
// };

// // PropTypes for validation
// ComparisonBarChart.propTypes = {
//     data: PropTypes.arrayOf(
//         PropTypes.shape({
//             symbol: PropTypes.string.isRequired,
//             buyPrice: PropTypes.number.isRequired,
//             volume: PropTypes.number.isRequired,
//             sellPrice: PropTypes.number.isRequired,
//         })
//     ).isRequired,
// };

// export default ComparisonBarChart;

// ComparisonBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

// Register necessary components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ComparisonBarChart = ({ data }) => {
    // Prepare data for the chart
    const chartData = {
        labels: data.map(item => item.symbol), // X-axis labels
        datasets: [
            {
                label: 'Total Buy Value',
                data: data.map(item => item.buyPrice * item.volume), // Y-axis data for total buy value
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                // Offset bars by a certain amount to place them side by side
                barThickness: 40, // Adjust the thickness of bars if needed
                categoryPercentage: 0.5, // Adjust the category width
                barPercentage: 0.8 // Adjust the bar width within the category
            },
            {
                label: 'Total Actual Value',
                data: data.map(item => item.sellPrice * item.volume), // Y-axis data for total actual value
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                // Offset bars by a certain amount to place them side by side
                barThickness: 40, // Adjust the thickness of bars if needed
                categoryPercentage: 0.5, // Adjust the category width
                barPercentage: 0.8 // Adjust the bar width within the category
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
            title: {
                display: true,
                text: 'Comparison of Total Buy Value and Total Actual Value',
            },
        },
        // Adjust the scales to place bars side by side
        scales: {
            x: {
                stacked: false, // Ensure bars are not stacked
                barPercentage: 0.8, // Adjust the width of bars
                categoryPercentage: 0.5 // Adjust the width of categories
            },
            y: {
                stacked: false, // Ensure bars are not stacked
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

// PropTypes for validation
ComparisonBarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            symbol: PropTypes.string.isRequired,
            buyPrice: PropTypes.number.isRequired,
            volume: PropTypes.number.isRequired,
            sellPrice: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ComparisonBarChart;
