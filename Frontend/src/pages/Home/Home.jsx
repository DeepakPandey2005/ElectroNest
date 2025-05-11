import Menu from "../../components/Menu/Menu";
import "./Home.css";
const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-info">
          <h2 className="home-info-heading">
            Electronest - All Gadgets. One Nest
          </h2>
          <p className="home-info-text">
            An exclusive platform designed to sell all premiumm electronic
            accessories like headphones , keyboards , mouse and speakers etc.
            Choose from a diverse category of premiumm electronic Gadgets{" "}
          </p>
          <button className="home-info-btn" onClick={()=>window.scrollTo({top:500,behavior:'smooth'})}>View Menu</button>
        </div>
      </div>
      <h2 className="category-head">Explore our Categories </h2>
      <p className="category-text">
        Choose from a Choose from a diverse category of premium products as per
        your needs in an amazing offers{" "}
      </p>

      <Menu />
    </>
  );
};

export default Home;
