import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin // Register the zoom plugin
);

const BarChart = ({ data, label }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: label,
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true, // Enable panning
          mode: "x", // Allow panning in the x-axis only
        },
        zoom: {
          wheel: {
            enabled: true, // Enable zooming with the mouse wheel
          },
          drag: {
            enabled: false, // Disable drag-to-zoom
          },
          pinch: {
            enabled: true, // Enable pinch-to-zoom for touch devices
          },
          mode: "x", // Allow zooming in the x-axis only
        },
      },
    },
    maintainAspectRatio: false, // Ensure the chart resizes properly
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
