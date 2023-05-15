import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const MyDoughnut = (props) => {
  const label = props.data.map((l) => l.category);
  const value = props.data.map((l) => l.value);
  const options = {
    
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: label,
    datasets: [
      {
        data: value,
        backgroundColor: "rgba(0,0,0,0.1)",
        hoverBackgroundColor: props.background,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.7)",
      },
    ],
  };
  return (
    <div className="piechart-test">
      <Doughnut data={data} options={options} />
    </div>
  );
};
export default MyDoughnut;
