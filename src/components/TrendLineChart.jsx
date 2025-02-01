import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required Chart.js elements
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const BarChartWithTrendLine = () => {
  // Bar chart data
  const barData = [30, 40, 25, 50, 35, 60, 45];

  // Calculate trend line data (example: simple moving average)
  const calculateTrendLine = (data) => {
    const trend = [];
    const len = data.length;
    const sum = data.reduce((a, b) => a + b, 0);
    const avg = sum / len; // Example trend: Average value
    for (let i = 0; i < len; i++) {
      trend.push(avg); // Adjust logic for more complex trends
    }
    return trend;
  };

  const trendLineData = calculateTrendLine(barData);

  // Chart configuration
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        type: "bar", // Bar dataset
        label: "Sales",
        data: barData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        type: "line", // Line dataset for the trend
        label: "Trend Line",
        data: trendLineData,
        borderColor: "red",
        borderWidth: 2,
        fill: false,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart with Trend Line",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChartWithTrendLine;
