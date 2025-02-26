import React, { FC } from "react";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

// для работы необходима библиотека react-chartjs-2@5.2.0

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface AreaChartProps {
  title?: string;
}

const labels = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#000000",
      backgroundColor: "#ebebeb",
    },
  ],
};

const AreaChart: FC<AreaChartProps> = ({ title }) => {
  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: title,
          },
        },
      }}
      data={data}
    />
  );
};

export default AreaChart;
