import * as React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
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
import 'chartjs-adapter-date-fns';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type EngagementGraphProps = {
  data: EngagementData[] | undefined;
  selectedSeries: EngagementGraphSeries[];
  yAxisMax?: number;
}

export const EngagementGraph: React.FC<EngagementGraphProps> = ({ yAxisMax, data, selectedSeries }) => {
  const chartData: React.ComponentProps<typeof Line>['data'] = React.useMemo(() => {
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
          data: data.map(p => p.mobilesConnected),
          backgroundColor: 'rgba(39, 169, 213, 0.4)',    
        });
      }

      return {
        labels: data.map(point => {
          return new Date(point.time);
        }),
        datasets,
      }
    }

    return {
      labels: [],
      datasets: [],
    }
  }, [data, selectedSeries]);

  const options: React.ComponentProps<typeof Line>['options'] = React.useMemo(() => {
    return {
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
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: yAxisMax,
          ticks: {
            stepSize: 1,
          },
        },
        x: {
            type: 'time',
            time: {
                unit: 'minute'
            }
        }
      }
    };
  }, []);
  
  return <Line options={options} data={chartData} />;
};
