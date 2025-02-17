import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const VolumeChart = ({ Volume }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            size: 14,
          },
          margin: "20px",
        },
      },
    },
    scales: {
      A: {
        title: "USD",
        type: "linear",
        position: "left",
        ticks: {
          color: "#FF4C8B",
          callback: function (value, index, values) {
            if (parseInt(value) >= 1000) {
              return (
                "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            } else {
              return "$" + value;
            }
          },
        },
      },
      B: {
        type: "linear",
        position: "right",
        ticks: {
          color: "#FAEEE7",
          max: 1,
          min: 0,
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  const VolumeData = {
    datasets: [
      {
        label: "Volume Quote 7d($) ",
        yAxisID: "A",
        data: Volume,
        borderColor: "#FAEEE7",
        backgroundColor: "#FAEEE7",
      },
    ],
  };

  return <Line options={options} data={VolumeData} />;
};

export default VolumeChart;
