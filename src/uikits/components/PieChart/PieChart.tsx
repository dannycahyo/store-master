import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

type Data = {
  label: string;
  total: number;
};

type PieChartProps = {
  data: Data[];
};

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const backgroundColors = data.map(
    () =>
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255,
      )}, ${Math.floor(Math.random() * 255)}, 0.2)`,
  );

  const borderColors = backgroundColors.map((color) =>
    color.replace("0.2", "1"),
  );

  const pieChartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.total),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={pieChartData} />;
};

export { PieChart };
