import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PerformanceChart = () => {
  const data = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Our Performance',
        data: [12, 28, 42, 35, 58, 72],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Benchmark (Nifty 50)',
        data: [3, 12, 15, 24, 4, 20],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: prefersReduced ? 0 : 1500,
      easing: prefersReduced ? 'linear' : 'easeInOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          font: { size: 12 },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#333',
        bodyColor: '#333',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#fff', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: {
          color: '#fff',
          font: { size: 10 },
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="relative w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default PerformanceChart;