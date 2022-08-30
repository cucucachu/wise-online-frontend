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
import { Line } from 'react-chartjs-2';
import {EngagementGraphSeries, EngagementData} from './types';
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
  getStudentName?: (studentId: string) => string;
}

// const valueOrNullIfZero = (value: number) => value ? value : null

const getOrCreateTooltip = (chart: any) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};
// console.log(datasets);
// if (datasets[0] && datasets[0].dataIndex && getStudentName) {

// }

// return '';
const externalTooltipHandler = (getStudentName: EngagementGraphProps['getStudentName'], data: EngagementGraphProps['data'], context: any) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: any) => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach((title: any) => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = '0';

      const th = document.createElement('th');
      th.style.borderWidth = '0';
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body: any, i: any) => {
      if (i === bodyLines.length - 1) {
        return;
      }

      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = '0';

      const td = document.createElement('td');
      td.style.borderWidth = '0';

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);

    if (tooltip.dataPoints[0] && tooltip.dataPoints[0].dataIndex && getStudentName && data) {
      const studentNames = data[tooltip.dataPoints[0].dataIndex].flaggedStudents.map(studentId => {
        return getStudentName(studentId);
      });
    
      if (studentNames.length) {
        // return `Flagged students: ${studentNames.join(', ')}`;
        const container = document.createElement('div');
        container.style.marginTop = '15px';
        const heading = document.createElement('div');
        heading.innerText = 'Flagged students:';

        container.appendChild(heading);
        studentNames.forEach((studentName) => {
          const p = document.createElement('div');
          p.innerText = studentName;
          container.appendChild(p);
        });

        tableRoot.appendChild(container);
      }  
    }
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

export const EngagementGraph: React.FC<EngagementGraphProps> = ({ getStudentName, yAxisMax, data, selectedSeries }) => {
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

      datasets.push({
        fill: false,
        label: 'Flags',
        data: data.map(p => p.flaggedStudents.length ? 0 : null),
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 5,
      });

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
        tooltip: {
          enabled: false,
          position: 'nearest',
          external: externalTooltipHandler.bind(null, getStudentName, data),
          // callbacks: {
          //   footer(datasets) {
          //   },
          // }
        }
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
