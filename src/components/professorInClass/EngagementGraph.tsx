import * as React from 'react';
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
import {EngagementGraphSeries, EngagementData} from './types';
import { format } from 'date-fns';

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

const labels = (new Array(13)).fill(0).map((_, i) => i * 5);
console.log('labels', labels);
export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 100)),
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

type EngagementGraphProps = {
  data: EngagementData[] | undefined;
  selectedSeries: EngagementGraphSeries[];
}

export const EngagementGraph: React.FC<EngagementGraphProps> = ({ data, selectedSeries }) => {
  const chartData = React.useMemo(() => {
    if (data) {
      const datasets = [];
      if (selectedSeries.includes('connected')) {
        datasets.push({
          fill: true,
          label: 'Computers connected',
          data: data.map(p => p.desktopsConnected),
          backgroundColor: 'rgba(155, 210, 25, 0.4)',
        });
      }

      if (selectedSeries.includes('disconnects')) {
        datasets.push({
          fill: true,
          label: 'Disconnects',
          data: data.map(p => p.disconnects),
          backgroundColor: 'rgba(255, 0, 0, 0.4)',    
        });
      }

      if (selectedSeries.includes('mobile')) {
        datasets.push({
          fill: true,
          label: 'Mobile Connects',
          data: data.map(p => p.disconnects),
          backgroundColor: 'rgba(39, 169, 213, 0.4)',    
        });
      }

      return {
        labels: data.map(point => {
          return format(new Date(point.time), 'h:mm');
        }),
        datasets,
      }
    }

    return {
      labels: [],
      datasets: [],
    }
  }, [data, selectedSeries]);
  
  return <Line options={options} data={chartData} />;
};
