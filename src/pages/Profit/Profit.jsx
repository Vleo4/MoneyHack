import { useState } from "react";
import images from "../../constants/images";
import "./Profit.css";

const Profit = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [selectedOption, setSelectedOption] = useState("Інше");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="profit">
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
            <button>
              <p>Додати</p>
              <img src={images.Add} alt="Add" />
            </button>
          </div>

          <div className="profit-container-blocks">
            {/* --------------- COMPONENT -------------------- */}
            <div className="block">
              {isEdit ? (
                <>
                  <input type="number" placeholder="ГРН" />
                  <div className="category">
                    <button onClick={toggleDropdown}>
                      {selectedOption}{" "}
                      <img src={images.ArrowDown} alt="ArrowDown" />
                    </button>
                    <div
                      className={`category-dropdown ${
                        isDropdownOpen ? "open" : ""
                      }`}
                    >
                      <h6 onClick={() => handleOptionClick("Інше")}>Інше</h6>
                      <h6 onClick={() => handleOptionClick("Заробітна плата")}>
                        Заробітна плата
                      </h6>
                      <h6 onClick={() => handleOptionClick("Бізнес-прибуток")}>
                        Бізнес-прибуток
                      </h6>
                      <h6
                        onClick={() => handleOptionClick("Інвестиційний дохід")}
                      >
                        Інвестиційний дохід
                      </h6>
                      <h6
                        onClick={() => handleOptionClick("Капітальний дохід")}
                      >
                        Капітальний дохід
                      </h6>
                      <h6 onClick={() => handleOptionClick("Премії")}>
                        Премії
                      </h6>
                      <h6 onClick={() => handleOptionClick("Продаж товарів")}>
                        Продаж товарів
                      </h6>
                      <h6
                        onClick={() =>
                          handleOptionClick("Авторські винагороди")
                        }
                      >
                        Авторські винагороди
                      </h6>
                    </div>
                  </div>
                  <input type="text" />
                </>
              ) : (
                <>
                  <p>1000.25 грн</p>
                  <p>Премія</p>
                  <p>10889917228942977461801886991562875332015211812811</p>
                </>
              )}
              <p>24 травня, 2022</p>
              <div className="buttons">
                <img
                  src={isEdit ? images.Check : images.Edit}
                  alt="Edit"
                  onClick={handleEditClick}
                />
                <img src={images.Delete} alt="Delete" />
              </div>
            </div>
            {/* ----------------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profit;
