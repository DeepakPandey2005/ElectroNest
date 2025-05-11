import { LiaLinkedin } from "react-icons/lia";
import "./Footer.css";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="footer" id="footer">
        <div className="footer-left">
          <p className="logo-name">Electronest</p>
          <p className="footer-para">
            An exclusive platform designed to sell all premiumm electronic
            accessories like headphones , keyboards , mouse and speakers etc.
            Choose from a diverse category of premiumm electronic Gadgets
          </p>
          <div className="logos">
            <LiaLinkedin />
            <BsTwitter />
            <FaFacebook />
          </div>
        </div>
        <div className="footer-middle">
          <span>Company</span>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Deleivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-right">
          Get in Touch
          <p>+91 39428392</p>
        </div>
      </div>
      <hr />
      <p className="copyright">&copy; 2025 All rights are reserved</p>
    </>
  );
};

export default Footer;
