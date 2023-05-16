import images from "../../constants/images";
import "./Profit.css";

const Profit = () => {
  return (
    <div className="profit">
      <h3>moneyhack</h3>
      <div className="profit-wrapper">
        <h2>Профіт</h2>
        <div className="profit-container">
          <div className="profit-container_buttons">
            <div className="profit-container_buttons-item">
              <p>Історія</p>
            </div>
            <div className="profit-container_buttons-item">
              <p>Графік</p>
            </div>
          </div>
          <div className="profit-container-labels">
            <p>
              Сума <img src={images.Arrows} alt="Arrows" />
            </p>
            <p>
              Категорія <img src={images.Arrows} alt="Arrows" />
            </p>
            <p>
              Нотатка <img src={images.Arrows} alt="Arrows" />
            </p>
            <p>
              Дата <img src={images.Arrows} alt="Arrows" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profit;
