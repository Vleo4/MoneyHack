import { Link } from "react-router-dom";
import "./Main.css";
import { images } from "../../constants";
import { MyDoughnut } from "../../components";
import { useEffect, useState } from "react";
import { isAuth } from "../../api/AuthContext";

const Main = () => {
  useEffect(() => {
    if (isAuth()) {
      window.location.href = "/profit";
    }
  }, [isAuth()]);
  const [hover, setHover] = useState([]);
  const [hover2, setHover2] = useState([]);
  const handleHover = (index, bool) => {
    setHover((prevHover) => {
      return prevHover.map((value, howIndex) => {
        if (howIndex === index) {
          return bool;
        } else {
          return false;
        }
      });
    });
  };
  const handleHover2 = (index, bool) => {
    console.log(bool);
    setHover2((prevHover) => {
      return prevHover.map((value, howIndex) => {
        if (howIndex === index) {
          return bool;
        } else {
          return false;
        }
      });
    });
    console.log(hover2);
  };

  const spendData = [
    {
      category: "Groceries",
      value: 40,
    },
    {
      category: "Cafes and Restaurants",
      value: 10,
    },
    {
      category: "Other",
      value: 10,
    },
    {
      category: "Entertainment and Sports",
      value: 7.1,
    },
    {
      category: "Mobile Top-up",
      value: 5.1,
    },
    {
      category: "Medicine",
      value: 5.1,
    },
    {
      category: "Travel",
      value: 5.1,
    },
    {
      category: "Taxi",
      value: 5.1,
    },
    {
      category: "Utilities",
      value: 3.1,
    },
    {
      category: "Clothing and Footwear",
      value: 2.5,
    },
    {
      category: "Cinema",
      value: 2.1,
    },
    {
      category: "Pets",
      value: 1.4,
    },
    {
      category: "Books",
      value: 0.9,
    },
];

const profitData = [
    {
      category: "Salary",
      value: 31.6,
    },
    {
      category: "Business Profit",
      value: 29.4,
    },
    {
      category: "Investment Income",
      value: 9.3,
    },
    {
      category: "Capital Income",
      value: 8.7,
    },
    {
      category: "Bonuses",
      value: 7,
    },
    {
      category: "Product Sales",
      value: 7,
    },
    {
      category: "Royalties",
      value: 7,
    },
];


  useEffect(() => {
    const hoverArray = spendData.map(() => false);
    setHover(hoverArray);
  }, []);
  useEffect(() => {
    const hoverArray = profitData.map(() => false);
    setHover2(hoverArray);
  }, []);

  return (
    <>
      <div className="main-nav">
        <Link to="/login" className="main-nav-item">Login</Link>
        <Link to="/register" className="main-nav-item">Sign up</Link>
      </div>
      <div className="main">
        <div className="main-header">
          <div className="logo-wrapper">
            <h1>MONEY</h1>
            <h1>HACK</h1>
          </div>

          <h2>Control your money</h2>
        </div>
        <div className="main-section">
          <div className="border">
            <div className="content">
            <h3>Manage Your Finances with Ease</h3>
              <p>
                With the MoneyHack website, users can easily and conveniently manage their finances. 
                The site offers the ability to track income and expenses, add, delete, and edit financial transactions, 
                as well as generate a financial report with filtering options based on various parameters. 
                Thanks to MoneyHack, users will be able to control their finances effortlessly and ensure the stability 
                of their financial situation.
              </p>
              <Link to="/login" className="try-now">
                Try Now!
              </Link>
            </div>
          </div>
          <div className="service-text-wrapper">
            <div className="service-text">
              <h2>What our service can do</h2>
            </div>
          </div>
          <div className="spend-block">
            <div className="spend-block-text">
              <h2>Loss amount</h2>
              <div className="spend-block-text-wrapper">
                {spendData.map((spend, index) => (
                  <div
                    className="spend-block-text_data"
                    onMouseOver={() => {
                      handleHover(index, true);
                    }}
                    onMouseLeave={() => {
                      handleHover(index, false);
                    }}
                    key={spend.category}
                  >
                    <p>{spend.category}</p>
                    <p>{spend.value} $</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="spend-block-piechart">
              <MyDoughnut
                hover={hover}
                data={spendData}
                background={"rgba(0, 125, 46, 1)"}
              />
            </div>
          </div>
          <div className="profit-block">
            <div className="profit-block-text">
              <h2>Profit amount</h2>
              <div className="profit-block-text-wrapper">
                {profitData.map((profit, index) => (
                  <div
                    className="profit-block-text_data"
                    onMouseLeave={() => {
                      handleHover2(index, false);
                    }}
                    onMouseOver={() => {
                      handleHover2(index, true);
                    }}
                    key={profit.category}
                  >
                    <p>{profit.category}</p>
                    <p>{profit.value} $</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="profit-block-piechart">
              <MyDoughnut
                hover={hover2}
                data={profitData}
                background={"rgba(55, 120, 0, 1)"}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <img src={images.GitHub} alt="GitHub" />
          <p>© Money Hack Team</p>
        </div>
      </div>
    </>
  );
};

export default Main;
