import { useContext } from "react";
import "./Cart.css";
import { CgRemove } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../store/ContextProvider";
const Cart = () => {
  const navigate = useNavigate();
  const { cartData, productData, getTotalPrice,url,removeFromCart } = useContext(ProductContext);
    return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-info">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>remove</p>
        </div>
        <br />
        <hr />
      </div>
      {productData &&
        productData.map((item, index) => {
          if (cartData[item._id] > 0) {
            return (
              <div key={index}>
                <hr />
                <div className="cart-info" key={index}>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartData[item._id]}</p>
                  <p> ₹ {item.price * cartData[item._id]}</p>
                  <p>
                    <CgRemove
                      className="cancel"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    />
                  </p>
                </div>
              </div>
            );
          }
        })}
      <br />
      <br />
      <br />
      <br />
      <div className="checkout">
        <div>
          <p className="cart-summary">Cart Total</p>
          <div className="summary-left">
            <div className="cart-detail">
              <p>subtotal</p>
              <p>₹ {getTotalPrice()}</p>
            </div>
            <hr />
            <div className="cart-detail">
              <p>Deleivery fee</p>
              <p>₹ {getTotalPrice() === 0 ? 0 : 99}</p>
            </div>
            <hr />
            <div className="cart-detail">
              <p>Total</p>
              <p>₹ {getTotalPrice() === 0 ? 0 : getTotalPrice() + 99}</p>
            </div>
            <hr />
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        <div className="promocode">
          <p>if you have a promocode</p>
          <div className="promocode-input">
            <input
              type="text"
              name=""
              id=""
              placeholder="enter the promocode "
            />
            <button>submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
