import { useSelector } from "react-redux";
import { selectCart } from "../features/actions/actionsSelectors";
import CartCard from "../components/ProductDetails/CartCard";
import { useState } from "react";
function Cart() {
  const cart = useSelector(selectCart);
  const loadEmailPhoneFromStorage = () => {
    try {
      const data = localStorage.getItem("emailPhone");
      return data ? data : "";
    } catch {
      return "";
    }
  };
  const [contact, setContact] = useState(loadEmailPhoneFromStorage);
  const totalPrice = cart
    .map((item) => item.price * item.quantity)
    .reduce((total, price) => total + price, 0);
  const emailPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value);
  };
  const sendHandler = () => {
    if (contact?.length) {
      localStorage.setItem("emailPhone", contact);
    }
  };
  return (
    <div>
      {totalPrice > 0 ? (
        <div className="cart">
          {cart.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
          <p className="final-price">Total: ${totalPrice}</p>
          <input
            onChange={emailPhone}
            className="contact"
            type="text"
            placeholder="Phone/Email"
            defaultValue={contact ? contact : ""}
          />
          <button className="btn" onClick={sendHandler}>
            Send
          </button>
        </div>
      ) : (
        <h1>Cart empty</h1>
      )}
    </div>
  );
}

export default Cart;
