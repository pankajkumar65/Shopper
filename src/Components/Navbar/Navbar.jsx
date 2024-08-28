import React, { useState, useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import userLogo from '../Assets/user_logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { useClient } from '../../Context/ClientContext';

const Navbar = ({ onSendmsg }) => {
  const [menu, setMenu] = useState("shop");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [logoutMessageVisible, setLogoutMessageVisible] = useState(false);
  const { client, setClient } = useClient();
  const { message, getTotalCartItems } = useContext(ShopContext);

  const sendMessageToParent = () => {
    const Navshow = "first";
    onSendmsg(Navshow);
  };

  const handleLogout = () => {
    setClient(null);
    sendMessageToParent();
    setLogoutMessageVisible(true);
    setTimeout(() => {
      setLogoutMessageVisible(false);
    }, 3000);
  };

  return (
    <div className='Navbar'>
      <div className='navbar'>
        <Link to="/shop">
          <div className="nav-logo flex items-center">
            <img src={logo} alt="" />
            <p className="ml-2">SHOPPER</p>
          </div>
        </Link>

        <div className='nav-menu-container'>
          <div className='nav-dropdown' onClick={() => setDropdownVisible(!dropdownVisible)}>
            ☰
          </div>
          <ul className={`nav-menu ${dropdownVisible ? 'nav-menu-visible' : ''}`}>
            <li onClick={() => setMenu("shop")}>
              <Link className="no-underline" to='/shop'>Shop</Link>
              {menu === "shop" ? <hr /> : <></>}
            </li>
            <li onClick={() => setMenu("mens")}>
              <Link className="no-underline" to='/mens'>Men</Link>
              {menu === "mens" ? <hr /> : <></>}
            </li>
            <li onClick={() => setMenu("womens")}>
              <Link className="no-underline" to='/womens'>Womens</Link>
              {menu === "womens" ? <hr /> : <></>}
            </li>
            <li onClick={() => setMenu("kids")}>
              <Link className="no-underline" to="/kids">Kids</Link>
              {menu === "kids" ? <hr /> : <></>}
            </li>
          </ul>
        </div>

        <div className='nav-login-cart flex items-center'>
          <div className="relative group">
            <img
              className="userlogo cursor-pointer "
              src={userLogo}
              alt="User Logo"
            />
            {/* Dropdown on hover */}
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-4 flex items-center">
                <img
                  className="w-9 h-9 rounded-full"
                  src={userLogo}
                  alt="User"
                />
              </div>
              <div className="border-t px-4 py-2 text-sm">
                <p><strong>Name:</strong> {}</p>
                <p><strong>DOB:</strong> {}</p>
                <p><strong>Email:</strong> {client}</p>
                <p><strong>Gender:</strong> {}</p>
              </div>
            </div>
          </div>

          <Link to="/" onClick={handleLogout}>
            <button className="ml-4">Logout</button>
          </Link>
          <Link to="/cart" className="ml-4 relative">
            <img src={cart_icon} alt="Cart Icon" />
            <div className="nav-cart-count absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalCartItems()}
            </div>
          </Link>
        </div>
      </div>
      {logoutMessageVisible && (
        <div className='w-20 h-20'>Logout successfully</div>
      )}
      <div className='message'>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Navbar;
