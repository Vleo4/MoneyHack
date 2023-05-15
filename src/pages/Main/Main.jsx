import { Link } from "react-router-dom";
import "./Main.css";

const Main = () => {
  const spendData = [
    {
      category: "Продукти",
      value: 40,
    },
    {
      category: "Кафе та ресторани",
      value: 10,
    },
    {
      category: "Інше",
      value: 10,
    },
    {
      category: "Розваги та спорт",
      value: 7.1,
    },
    {
      category: "Поповнення мобільного",
      value: 5.1,
    },
    {
      category: "Медицина",
      value: 5.1,
    },
    {
      category: "Подорожі",
      value: 5.1,
    },
    {
      category: "Таксі",
      value: 5.1,
    },
    {
      category: "Комунальні послуги",
      value: 3.1,
    },
    {
      category: "Одяг та взуття",
      value: 2.5,
    },
    {
      category: "Кіно",
      value: 2.1,
    },
    {
      category: "Тварини",
      value: 1.4,
    },
    {
      category: "Книги",
      value: 0.9,
    },
  ];

  /* const chartSpendData = [
    ["Продукти", 40],
    ["Кафе та ресторани", 10],
    ["Інше", 10],
    ["Розваги та спорт", 7.1],
    ["Поповнення мобільного", 5.1],
    ["Медицина", 5.1],
    ["Подорожі", 5.1],
    ["Таксі", 5.1],
    ["Комунальні послуги", 3.1],
    ["Одяг та взуття", 2.5],
    ["Кіно", 2.1],
    ["Тварини", 1.4],
    ["Книги", 0.9],
  ]; */

  return (
    <div className="main">
      <div className="main-header">
        <h1>MONEYHACK</h1>
        <h2>Володійте своїми фінансами</h2>
      </div>
      <div className="main-section">
        <div className="border">
          <div className="content">
            <h3>Керуйте своїми фінансами з легкістю</h3>
            <p>
              Завдяки сайту MoneyHack користувачі зможуть легко і зручно
              керувати своїми фінансами. Сайт пропонує можливість відстежування
              доходів та витрат, додавання, видалення та редагування фінансових
              операцій, а також генерацію звіту про фінансовий стан користувача
              з можливістю фільтрації за різними параметрами. Завдяки MoneyHack
              користувачі зможуть контролювати свої фінанси з легкістю та
              забезпечити стабільність своєї фінансової ситуації.
            </p>
            <Link to="/" className="try-now">
              Спробувати зараз!
            </Link>
            <div className="service-text">
              <h2>Що може наш сервіс?</h2>
            </div>
          </div>
        </div>

        <div className="spend-block">
          <div className="spend-block-text">
            <h2>Кількість витрат у категорії</h2>
            <div className="spend-block-text-wrapper">
              {spendData.map((spend) => (
                <div className="spend-block-text_data" key={spend.category}>
                  <p>{spend.category}</p>
                  <p>{spend.value}%</p>
                </div>
              ))}
            </div>
          </div>
          <div className="spend-block-piechart"></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
