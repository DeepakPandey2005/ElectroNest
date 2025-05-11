import axios from "axios";
import "./Login.css";
import { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { ProductContext } from "../../store/ContextProvider";
import { toast } from "react-toastify";
const Login = ({ setLogin }) => {
  const [currState, setCurrState] = useState("sign up");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setToken, url } = useContext(ProductContext);

  const onChangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    let res = await axios.post(newUrl, data);

    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success('Login success !')
      setLogin(false);
    } else {
      toast.error(res.data.message)
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={submitHandler} className="login-container">
        <MdCancel onClick={() => setLogin(false)} className="cancel" />
        <span className="currstate">{currState}</span>
        <div className="inputs">
          {currState === "sign up" && (
            <input
              type="text"
              name="name"
              onChange={onChangehandler}
              id=""
              value={data.name}
              placeholder="enter your name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangehandler}
            placeholder="enter your Email"
            value={data.email}
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangehandler}
            placeholder="enter your password"
            value={data.password}
            required
          />
          <div className="tc">
            <input type="checkbox" name="checkbox" required />
            <label htmlFor="checbox">
              I Accept all the terms and condition
            </label>
          </div>

          {currState === "login" ? (
            <button type="submit">Login</button>
          ) : (
            <button type="submit">Create Account</button>
          )}
        </div>
        {currState === "login" ? (
          <p>
            new user ?{" "}
            <span onClick={() => setCurrState("sign up")}>sign up</span>
          </p>
        ) : (
          <p>
            already have an account ?{" "}
            <span onClick={() =>setCurrState("login")}>login</span>
          </p>
        )}
      </form>
    </div>
  );
};
export default Login;
