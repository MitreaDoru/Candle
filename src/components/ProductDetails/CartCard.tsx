import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { remove, increment, decrement } from "../../features/actions/cartSlice";
import type { AppDispatch } from "../../app/store";
function CartCard({
  item,
}: {
  item: {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
  };
}) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="cart-item">
      <Link
        to={`/product/${item.id}`}
        style={{ textDecoration: "none", display: "block", width: "6rem" }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{ cursor: "pointer", display: "block" }}
          width={60}
          height={60}
        />
      </Link>
      <div className="actions">
        <div className="quantity">
          <button
            className="btn"
            onClick={() => dispatch(decrement({ id: item.id }))}
          >
            -
          </button>
          <p className="count">{item.quantity}</p>
          <button
            className="btn"
            onClick={() => dispatch(increment({ id: item.id }))}
          >
            +
          </button>
        </div>
        <p className="price">${item.price * item.quantity}</p>
        <button
          className="btn"
          onClick={() => {
            dispatch(remove({ id: item.id }));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default CartCard;
