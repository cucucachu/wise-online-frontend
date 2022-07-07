import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line, ChartProps } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options: ChartProps['options'] = {
  // responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  // labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: [], //labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: 'rgba(255, 0, 0, 0.4)',
    },
    {
      fill: true,
      label: 'Dataset 3',
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: 'rgba(0, 0, 255, 0.4)',
    },
  ],
};

export const EngagementGraph: React.FC<{}> = () => {
  return <Line options={options} data={data} />;
};
