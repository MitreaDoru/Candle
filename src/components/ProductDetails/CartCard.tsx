import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { remove, increment, decrement } from "../../features/actions/cartSlice";
import type { AppDispatch } from "../../app/store";
import type { Product } from "../../types/product";
function CartCard({ item }: { item: Product }) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="cart-item">
      <Link
        to={`/product/${item._id}`}
        style={{ textDecoration: "none", display: "block", width: "6rem" }}
      >
        <img
          src={`/Candle/assets/${item.image}`}
          alt={item.name}
          style={{ cursor: "pointer", display: "block" }}
        />
      </Link>
      <div className="actions">
        <div className="quantity">
          <button
            className="btn"
            onClick={() => dispatch(decrement({ _id: item._id }))}
          >
            -
          </button>
          <p className="count">{item.quantity}</p>
          <button
            className="btn"
            onClick={() => dispatch(increment({ _id: item._id }))}
          >
            +
          </button>
        </div>
        <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          className="btn"
          onClick={() => {
            dispatch(remove({ id: item._id }));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default CartCard;
