import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
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
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
);

const TestBarChart = ({ data = [], label = "Default Label" }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const visibleBars = 5; // Number of bars visible at a time

  const handleScroll = (event) => {
    if (data.length <= visibleBars) return;
    const delta = event.deltaY > 0 ? 1 : -1;
    setScrollPosition((prev) => Math.max(0, Math.min(prev + delta, data.length - visibleBars)));
  };

  // Generate trendline data
  const trendlineData = data.map((item) => item.totalCount ?? 0);

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
      {
        label: "Trendline",
        data: trendlineData,
        type: "line",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 3, // Show small points for clarity
        pointBackgroundColor: "red",
        fill: false,
        datalabels: {
          align: "top",
          anchor: "end",
          color: "red",
          font: {
            weight: "bold",
            size: 12,
          },
          formatter: (value) => value, // Show actual trendline values
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        min: scrollPosition,
        max: scrollPosition + visibleBars,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        display: true, // Enable datalabels globally
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }} onWheel={handleScroll}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TestBarChart;
