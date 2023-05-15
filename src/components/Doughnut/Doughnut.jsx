import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const MyDoughnut = (props) => {
    const label=props.data.map((l)=>l.category);
    const value=props.data.map((l)=>l.value);
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    const backgroudHover =props.data.map(()=>null);
    console.log(backgroudHover);
    const data = {
        labels: label,
        datasets: [
            {
                data: value,
                backgroundColor: 'rgba(0,0,0,0)',
                hoverBackgroundColor:'rgba(42, 95, 0, 0.9)',
            },
        ],
    };
    return(
      <div className="doughnut">
          <Doughnut  data={data} options={options}/>
      </div>
  )
}
export default MyDoughnut;
