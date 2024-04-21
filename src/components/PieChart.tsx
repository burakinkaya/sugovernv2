// PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary components for the Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  chartData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }>;
  };
}

function PieChart({ chartData }: PieChartProps) {
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}

export default PieChart;
