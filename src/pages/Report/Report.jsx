import "./Report.css";
import images from "../../constants/images";
import { LineChart } from "../../components";
import {getCredit, getLoss, getProfit} from "../../api/api";
import { useEffect, useState } from "react";
import { isAuth } from "../../api/AuthContext";

const Report = () => {
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);
  const [dataCredit, setDataCredit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLineChart, setDataLineChart] = useState([]);
  const [dataLineChart2, setDataLineChart2] = useState([]);
  const [year, setYear]=useState(2023);
  const [year2, setYear2]=useState(2023);
  const [suma,setSuma]=useState(0);
  const [suma2,setSuma2]=useState(0);
  const getData = async () => {
    setIsLoading(true);
    const profit = await getProfit();
    const profit2 = await getLoss();
    const profit3=await getCredit();
    console.log(profit3);
    setDataCredit(profit3);
    const result = [];
    const result2 = [];
    profit.forEach((r) => {
      const existingCategory = result.find(
        (item) => item.time[0] + item.time[1] + item.time[2] + item.time[3]+ item.time[4] + item.time[5] + item.time[6] === r.time[0] + r.time[1] + r.time[2] + r.time[3]+ r.time[4] + r.time[5] + r.time[6]
      );
      if (existingCategory) {
        existingCategory.value = parseInt(existingCategory.value);
        existingCategory.value += parseInt(r.value);
      } else {
        result.push({ time: r.time[0] + r.time[1] + r.time[2] + r.time[3]+ r.time[4] + r.time[5] + r.time[6], value: parseInt(r.value) });
      }
    });
    profit2.forEach((r) => {
      const existingCategory2 = result2.find(
          (item) => item.time[0] + item.time[1] + item.time[2] + item.time[3]+ item.time[4] + item.time[5] + item.time[6] === r.time[0] + r.time[1] + r.time[2] + r.time[3]+ r.time[4] + r.time[5] + r.time[6]
      );
      if (existingCategory2) {
        existingCategory2.value = parseInt(existingCategory2.value);
        existingCategory2.value += parseInt(r.value);
      } else {
        result2.push({ time: r.time[0] + r.time[1] + r.time[2] + r.time[3]+ r.time[4] + r.time[5] + r.time[6], value: parseInt(r.value) });
      }
    });
    const abc = result.map((r) => {
    if (r.time.substring(0, 4) == year) {
      return r.value}
    else return 0});
    const sum = abc.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const abc2 = result2.map((r) => {
      if (r.time.substring(0, 4) == year) {
        return r.value}
      else return 0});    const sum2 = abc2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setSuma(sum);
    setSuma2(sum2);
    setDataLineChart2(result2);
    setDataLineChart(result);
    setIsLoading(false);
  };
  useEffect(() => {
    getData().then();
  }, []);
  return (
    <div className="report">
      <div className="report-wrapper">
        <h2>Звіти</h2>
        <div className="report-container">
          <div className="profitBlock-wrapper">
            <div className="profitBlock">
              <div className="profitBlock-text">
                <h3>Прибуток:</h3>
                <h3 style={{ color: "#23D154" }}>{suma} грн</h3>
              </div>
              <input type="number" value={year} onChange={(e)=>{setYear(e.target.value)}} />
              <div className="graphic-test">
                <LineChart
                  data={dataLineChart}
                  year={year}
                  title="Прибуток"
                  lineColor="#23D154"
                  pointBackgroundColor="#23D154"
                />
              </div>
            </div>
            <div className="profitBlock">
              <div className="profitBlock-text">
                <h3>Збитки:</h3>
                <h3 style={{ color: "#D12323" }}>{suma2} грн</h3>
              </div>
              <input type="number" value={year2} onChange={(e)=>{setYear2(e.target.value)}} />

              <div className="graphic-test">
                <LineChart
                  data={dataLineChart2}
                  year={year2}
                  title="Збитки"
                  lineColor="#D12323"
                  pointBackgroundColor="#D12323"
                />
              </div>
            </div>
          </div>
          <div className="creditBlock">
            <h2>Непогашені кредити</h2>
            <div className="creditBlock-wrapper">
              <div className="creditBlock-buttons">
                <p>
                  Сума <img src={images.Arrows} alt="Arrows" />
                </p>
                <p>
                  Позиковано <img src={images.Arrows} alt="Arrows" />
                </p>
                <p>
                  Нотатка <img src={images.Arrows} alt="Arrows" />
                </p>
                <p>
                  Дата взяття <img src={images.Arrows} alt="Arrows" />
                </p>
              </div>
              {dataCredit.map((c) => {
                if (!c.is_closed) {
                  return (
                      <div className="creditBlock-block" key={c.id}>
                        <p>{c.value} грн</p>
                        <p>{c.from_where}</p>
                        <p>{c.note}</p>
                        <p>{  new Date(c.start_time).toLocaleDateString("uk-UA", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}</p>
                      </div>
                  );
                }
                return null;
              })}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
