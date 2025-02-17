import React, { useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, ScriptableContext } from "chart.js";
import {TotalFollowers} from "../../Data/TotalFollowers";

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler);

export default function LineChart() {
  
  // line chart data
  const [totalFollowers, setTotalFollowers] = useState({
    labels: TotalFollowers.map((data) => data.month),
    datasets: [{
      label: 'Followers',
      data: TotalFollowers.map((data) => data.followers),
    }],
  });
  
  // line chart options
  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: "#415C5C",
        fill: "start",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(65,92,92,1)");
          gradient.addColorStop(0.4, "rgba(65,92,92,0.2)");
          gradient.addColorStop(0.8, "rgba(65,92,92,0)");
          return gradient;
        },
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
  };
  
  return (
    <Line data={totalFollowers} options={options} />
  )
}