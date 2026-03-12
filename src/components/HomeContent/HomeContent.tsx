import ProductCard from "../ProductDetails/ProductCard";
import { useSelector } from "react-redux";
import { selectProducts } from "../../features/actions/actionsSelectors";

function HomeContent() {
  const products = useSelector(selectProducts);

  return (
    <div className="content">
      {products.map((item) => (
        <ProductCard key={item._id} item={item} />
      ))}
    </div>
  );
}

export default HomeContent;
