import {useEffect, useState} from "react";
import images from "../../constants/images";
import "./Profit.css";
import {deleteProfit, editProfit, getProfit, newProfit} from "../../api/api.js";

const Profit = () => {
  const [data,setData]=useState([]);
  const [date,setDate]=useState();
  const [note,setNote]=useState();
  const [money,setMoney]=useState();
  const [isEdit, setIsEdit]=useState(false);
  const [id,setId]=useState();
  const getData = async ()=> {
    const profit = await getProfit();
    setData(profit);
  }
  useEffect(()=>{
    getData().then();
  },[])
  const handleNumber = (event) => {
    const value = event.target.value.replace(/[^\d]/g, '');
    if (value.length <= 12) {
      setMoney(value);
    }
  };

  const [historyLink, setHistoryLink] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  const handleAdd=(index)=> {
    if(index!==undefined){
      setIsEdit(true);
      setSelectedOption(data[index].category);
      setMoney(parseInt(data[index].value));
      setNote(data[index].note);
      setDate(data[index].time.slice(0, 10));
    }
    else{
      setIsEdit(false);
      setSelectedOption();
      setMoney();
      setNote();
      setDate();
    }
    setIsAdd(!isAdd);
  }
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
            <div
              className={`profit-container_buttons-item ${
                historyLink ? "active" : ""
              }`}
              onClick={() => {
                setHistoryLink(true);
              }}
            >
              <p>Історія</p>
            </div>
            <div
              className={`profit-container_buttons-item ${
                !historyLink ? "active" : ""
              }`}
              onClick={() => {
                setHistoryLink(false);
              }}
            >
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
            <button onClick={()=>{handleAdd()}}>
              <p>Додати</p>
              <img src={images.Add} alt="Add" />
            </button>
          </div>
          <div className="profit-container-blocks">
            {/* --------------- COMPONENT -------------------- */}
            {isAdd&&(
                <div className="block">
                <>
                  <input
                    type="text"
                    placeholder="ГРН"
                    value={money}
                    onChange={(e) => {
                      handleNumber(e);
                    }}
                  />
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
                  <input type="text" value={note} onChange={(e)=>{setNote(e.target.value);}}/>
                  <input type="date" value={date} onChange={(e)=>{setDate(e.target.value);}}/>
                  <img onClick={()=>{if(isEdit){
                    editProfit(note, money, selectedOption, date,id);
                  }
                    else {
                    newProfit(note, money, selectedOption, date);
                  }
                    handleAdd();
                    setTimeout(getData, 200);
                  }}
                       className="addIcon"
                       src={isEdit?images.Check:images.Add} alt="Add" />
                </>

            </div>
            )}
            {data.length>0&&data.map((d,index)=>{return(
              <div key={index} className="block">
                <p>{parseInt(d.value)}</p>
                <p>{d.category}</p>
                <p>{d.note}</p>
                <p>{new Date(d.time).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <div className="buttons">
                  <img
                      src={images.Edit}
                      alt="Edit"
                      onClick={()=>{handleAdd(index); setId(d.id)}}
                  />
                  <img src={images.Delete} onClick={()=>{
                    deleteProfit(d.id).then();
                    setTimeout(getData, 200);
                  }} alt="Delete" />
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profit;
