import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end'
    }
  },
};

const labels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total Trial',
      data: [10, 30, 50, 60, 49, 56, 244],
      borderColor: 'rgb(107, 82, 200)',
      backgroundColor: 'rgba(107, 82, 200, 1)',
    },
    {
      label: 'Total Permanent Access',
      data: [74, 52, 214, 232, 54, 86, 31],
      borderColor: 'rgb(124, 181, 247)',
      backgroundColor: 'rgba(124, 181, 247, 1)',
    },
  ],
};

export default function LineChart() {
  return <Line options={options} data={data} />;
}

