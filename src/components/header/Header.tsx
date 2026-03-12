import { Link } from "react-router-dom";
import {
  selectCart,
  selectUser,
} from "../../features/actions/actionsSelectors";
import { useSelector } from "react-redux";
import { useState } from "react";
import Login from "../auth/Signup-Login";
function Header() {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const [showLogin, setShowLogin] = useState(false);
  const itemsCount = cart
    .map((item) => item.quantity)
    .reduce((total, quantity) => total + quantity, 0);
  return (
    <header>
      <Link className="left" to={`/Candle`}>
        <img
          src={`/Candle/assets/candle-logo.png`}
          alt="candle"
          width={40}
          height={40}
        />
        <p className="name">Candle</p>
      </Link>
      <div className="right">
        {user.isAdmin && (
          <div className="admin-panel">
            <Link to={`/Candle/admin`}>Admin</Link>
          </div>
        )}
        <div className="cart-icon">
          <Link to={`/Candle/cart`}>
            <img
              src={`/Candle/assets/cart.png`}
              alt="cart"
              width={40}
              height={40}
            />
            {itemsCount > 0 && <p className="cart-count">{itemsCount}</p>}
          </Link>
        </div>
        <div onClick={() => setShowLogin(true)} className="user">
          <img
            src={`/Candle/assets/user.png`}
            alt="user"
            width={40}
            height={40}
          />
        </div>
      </div>
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
}

export default Header;
