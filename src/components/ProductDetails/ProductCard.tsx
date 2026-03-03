import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../../features/actions/cartSlice";
import type { AppDispatch } from "../../app/store";
import { useState } from "react";
function ProductCard({
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
  const [count, setCount] = useState(item.quantity);
  return (
    <div>
      <Link
        to={`/product/${item.id}`}
        style={{ textDecoration: "none", display: "block", width: "20rem" }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{ cursor: "pointer", display: "block" }}
          width={200}
          height={200}
        />
      </Link>
      <div className="actions">
        <div className="quantity">
          <button className="btn" onClick={() => setCount(count - 1)}>
            -
          </button>
          <p className="count">{count}</p>
          <button className="btn" onClick={() => setCount(count + 1)}>
            +
          </button>
        </div>
        <p className="price">${item.price}</p>
        <button
          className="btn"
          onClick={() => {
            dispatch(add({ ...item, quantity: count }));
            setCount(0);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
