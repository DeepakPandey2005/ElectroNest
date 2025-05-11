import "./Menu.css";
import { category as Data } from "../../assets";
import { useContext, useState } from "react";
import MenuItems from "./MenuItems";
import { ProductContext } from "../../store/ContextProvider";
const Menu = () => {
  const [category, setCategory] = useState("all");
  const { productData } = useContext(ProductContext);
  return (
    <>
      <div className="category" id="menu">
        {Data.map((data, i) => {
          return (
            <div
              key={i}
              className="category-card "
              onClick={() =>
                setCategory((prev) => (prev === data.name ? "all" : data.name))
              }
            >
              <img
                src={data.img}
                alt=""
                className={`category-img ${
                  category === data.name ? "active-category" : ""
                }`}
              />
              <p className="category-name">{data.name}</p>
            </div>
          );
        })}
      </div>
      <hr className="hr-line" />
      <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
        Best Products for you
      </h1>
      <div className="menu-container">
        {productData &&
          productData.map((data, i) => {
            if (category === "all" || category === data.category) {
              return (
                <MenuItems
                  key={i}
                  name={data.name}
                  id={data._id}
                  desc={data.description}
                  img={data.image}
                  rating={data.ratings}
                  price={data.price}
                  category={data.category}
                />
              );
            }
          })}
      </div>
    </>
  );
};

export default Menu;
