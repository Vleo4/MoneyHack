import "./Report.css";
import images from "../../constants/images";
import { LineChart } from "../../components";
import { getProfit } from "../../api/api";
import { useEffect, useState } from "react";
import { isAuth } from "../../api/AuthContext";

const Report = () => {
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataLineChart, setDataLineChart] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    const profit = await getProfit();
    console.log(profit);
    setData(profit);
    const result = [];
    profit.forEach((r) => {
      const existingCategory = result.find(
        (item) => item.category === r.category
      );
      if (existingCategory) {
        existingCategory.value = parseInt(existingCategory.value);
        existingCategory.value += parseInt(r.value);
      } else {
        result.push({ category: r.category, value: parseInt(r.value) });
      }
    });
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
                <h3 style={{ color: "#23D154" }}>1931456 грн</h3>
              </div>
              <div className="graphic-test">
                <LineChart
                  data={dataLineChart}
                  title="Прибуток"
                  lineColor="#23D154"
                  pointBackgroundColor="#23D154"
                />
              </div>
            </div>
            <div className="profitBlock">
              <div className="profitBlock-text">
                <h3>Збитки:</h3>
                <h3 style={{ color: "#D12323" }}>1931456 грн</h3>
              </div>
              <div className="graphic-test">
                <LineChart
                  data={dataLineChart}
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
              <div className="creditBlock-block">
                <p>1000.25 грн</p>
                <p>Продукти</p>
                <p>2231423rdfggdfgedrsghrth rso[ihjsfioprghjofrsghjfg</p>
                <p>24 травня, 2036</p>
              </div>
              <div className="creditBlock-block">
                <p>1000.25 грн</p>
                <p>Продукти</p>
                <p>2231423rdfggdfgedrsghrth rso[ihjsfioprghjofrsghjfg</p>
                <p>24 травня, 2036</p>
              </div>
              <div className="creditBlock-block">
                <p>1000.25 грн</p>
                <p>Продукти</p>
                <p>2231423rdfggdfgedrsghrth rso[ihjsfioprghjofrsghjfg</p>
                <p>24 травня, 2036</p>
              </div>
              <div className="creditBlock-block">
                <p>999999999999 грн</p>
                <p>Продукти</p>
                <p>2231423rdfggdfgedrsghrth rso[ihjsfioprghjofrsghjfg</p>
                <p>24 травня, 2036</p>
              </div>
              <div className="creditBlock-block">
                <p>1000.25 грн</p>
                <p>Продукти</p>
                <p>2231423rdfggdfgedrsghrth rso[ihjsfioprghjofrsghjfg</p>
                <p>24 травня, 2036</p>
              </div>
              <div className="creditBlock-block">
                <p>1000.25 грн</p>
                <p>Продукти</p>
                <p>2231423rdfggdfgedrsghrth rso[ihjsfioprghjofrsghjfg</p>
                <p>24 травня, 2036</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
