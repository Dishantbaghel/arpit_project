import React, { useEffect, useRef, useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data = [], label = "Default Label" }) => {
  console.log("INSIDE GRAPH===========",data)
  const chartRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const visibleBars = 5; // Number of bars visible at a time

  // Set the min/max values for the x-axis dynamically

  // useEffect(() => {
  //   const chart = chartRef.current;
  //   if (chart) {
  //     chart.options.scales.x.min = scrollPosition;
  //     chart.options.scales.x.max = scrollPosition + visibleBars;
  //     chart.update(); // Refresh chart with new range
  //   }
  // }, [scrollPosition]);

  const handleScroll = (event) => {
    const delta = event.deltaY > 0 ? 1 : -1; // Scroll down: right, Scroll up: left
    setScrollPosition((prev) => {
      const newPos = prev + delta;
      return Math.max(0, Math.min(newPos, data.length - visibleBars));
    });
  };

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

  console.log("DISHANT*****************",chartData)

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
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }} onWheel={handleScroll}>
      <Bar  data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
