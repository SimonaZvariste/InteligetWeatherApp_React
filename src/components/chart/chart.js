
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


function LineChart({ dataSet, labels, bgColor, borderColor, label, title="" }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: dataSet,
        borderColor: borderColor || 'rgb(255, 99, 132)',
        backgroundColor: bgColor || 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return <Line options={options} data={data} style={{

    maxHeight: "1000px",
    margin: "auto",
    backgroundColor: 'lightgrey',
    border: '3px solid rgb(63, 78, 137)',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '-1rem 0 3rem #140f25;'
  }} />;
}

export default LineChart;
