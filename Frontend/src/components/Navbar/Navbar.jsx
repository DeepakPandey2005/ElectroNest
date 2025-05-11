import React, { useContext, useState } from "react";
import "./Navbar.css";
import { BsBag, BsCart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { ProductContext } from "../../store/ContextProvider";
import { toast } from "react-toastify";
const Navbar = ({ setLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalPrice, token, setToken } = useContext(ProductContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="nav">
      <Link to="/" className="logo-name">
        Electronest
      </Link>
      <ul className="nav-list">
        <Link
          to={"/"}
          className={menu === "home" ? "active" : ""}
          onClick={() => {
            setMenu("home");
          }}
        >
          Home
        </Link>
        <a
          href="#menu"
          className={menu === "menu" ? "active" : ""}
          onClick={() => {
            setMenu("menu");
          }}
        >
          Menu
        </a>
        <a
          href="#footer"
          className={menu === "contact" ? "active" : ""}
          onClick={() => {
            setMenu("contact");
          }}
        >
          Contact
        </a>
        <li
          className={menu === "about" ? "active" : ""}
          onClick={() => {
            setMenu("about");
          }}
        >
          about
        </li>
      </ul>
      <div className="right-nav ">
        <IoSearch className="icon" />
        <div className="cart-box">
          <Link to={"/cart"}>
            <BsCart className="icon " />
          </Link>
          <div
            className={`${getTotalPrice() === 0 ? "" : "cart-notification"}`}
          ></div>
        </div>
        {!token ? (
          <button onClick={() => setLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <BiUser className="loggedin-icon" />
            <ul className="navbar-profile-dropdown">
              <li>
                <Link to="/myorders">
                  <BsBag />
                  <p>Orders</p>
                </Link>
              </li>

              <li onClick={()=>{logout(); toast.success('logged out')}}>
                <LuLogOut />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
