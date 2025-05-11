import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Cart from "./pages/Cart/Cart";
import PlaceOrders from "./pages/PlaceOrders/PlaceOrders";
import ContextProvider from "./store/ContextProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Verify from "./pages/verify/verify";
import MyOrders from "./pages/myOrders/MyOrders";
const App = () => {
  const [login, setLogin] = useState(false);

  return (
    <ContextProvider>
      <div className="app">
        <ToastContainer/>
        {login ? <Login setLogin={setLogin} /> : <></>}
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </ContextProvider>
  );
};

export default App;
