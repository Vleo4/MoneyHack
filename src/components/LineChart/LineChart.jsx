import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props) => {

   
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const labels = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [65, 56549, 8054, 8441, 53246, 5125, 44230],
        borderColor: props.lineColor,
        borderWidth: 4,
        pointBackgroundColor: props.pointBackgroundColor,
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
