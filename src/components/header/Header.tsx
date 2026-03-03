import { Link } from "react-router-dom";
import logo from "../../assets/candle-logo.png";
import cartIcon from "../../assets/cart.png";
import { selectCart } from "../../features/actions/actionsSelectors";
import user from "../../assets/user.png";
import { useSelector } from "react-redux";
function Header() {
  const cart = useSelector(selectCart);
  const itemsCount = cart
    .map((item) => item.quantity)
    .reduce((total, quantity) => total + quantity, 0);
  return (
    <header>
      <Link className="left" to={`/Candle`}>
        <img src={logo} alt="candle" width={40} height={40} />
        <p className="name">Candle</p>
      </Link>
      <div className="right">
        <div className="cart-icon">
          <Link to={`/Candle/cart`}>
            <img src={cartIcon} alt="cart" width={40} height={40} />
            {itemsCount > 0 && <p className="cart-count">{itemsCount}</p>}
          </Link>
        </div>
        <div className="user">
          <img src={user} alt="user" width={40} height={40} />
        </div>
      </div>
    </header>
  );
}

export default Header;
