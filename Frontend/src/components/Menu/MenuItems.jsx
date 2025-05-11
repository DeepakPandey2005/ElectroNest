import React, { useContext } from "react";
import { BiMinus, BiPlus, BiStar } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../store/ContextProvider";

const MenuItems = ({ name, price, id, desc, img, rating }) => {
  const navigate = useNavigate();
  const { cartData, url, addToCart, removeFromCart } =
    useContext(ProductContext);
  const quantity = cartData[id] || 0;

  return (
    <div className="product-card">
      <img src={url + "/images/" + img} alt="" className="product-img" />
      <div className="product-info">
        <p className="name">{name}</p>
        <div className="ratings">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>
              {index < rating ? (
                <BsStarFill className="rated" />
              ) : (
                <BiStar className="unrated" />
              )}
            </span>
          ))}
        </div>

        <p>{desc}</p>
        <p className="realprice">₹ {price + 999}</p>
        <p className="discount">₹ {price}</p>

        <div className="added">
          {quantity > 0 ? (
            <>
              <BiMinus className="remover" onClick={() => removeFromCart(id)} />
              {quantity}
              <BiPlus className="adder" onClick={() => addToCart(id)} />
              <button className="cart-btn" onClick={() => navigate("/cart")}>
                view cart
              </button>
            </>
          ) : (
            <button className="cart-btn" onClick={() => addToCart(id)}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
