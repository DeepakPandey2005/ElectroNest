import "./Navbar.css"
import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
  return (
    <>
    <div className='Navbar'>
        <div className='navbar-container'>
<span>Electronest</span>
<p>Admin Panel</p>
        </div>

<FaUserCircle className="admin-logo"/>

    </div>
      <br />
      <hr />
    </>
  )
}

export default Navbar
