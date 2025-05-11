import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let ProductContext = createContext({});

const ContextProvider = (props) => {
  let url = "http://localhost:8080";
  const [token, setToken] = useState("");
  const [productData, setProductData] = useState([]);
  const [cartData, setCartData] = useState({});

  const fetchCartData = async (token) => {
    const res = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartData(res.data.cartData);
  };
  const fetchProductData = async () => {
    const res = await axios.get(url + "/api/product/list");
    setProductData(res.data.data);
  };

  const addToCart = async (itemId) => {
    if (!cartData[itemId]) {
      setCartData((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartData((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const res = axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartData((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const res = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };
  const getTotalPrice = () => {
    let totalPrice = 0;
    if (!cartData || !productData) return totalPrice;

    for (const productId in cartData) {
      const itemInfo = productData.find((prod) => prod._id === productId);
      if (itemInfo) {
        totalPrice += itemInfo.price * cartData[productId];
      }
    }
    return totalPrice;
  };

  useEffect(() => {
    async function loadData() {
      await fetchProductData();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await fetchCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [token]);
  return (
    <ProductContext.Provider
      value={{
        url,
        cartData,
        productData,
        token,
        setToken,
        addToCart,
        removeFromCart,
        getTotalPrice,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ContextProvider;
