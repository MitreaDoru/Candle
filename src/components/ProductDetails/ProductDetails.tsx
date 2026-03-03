import candle1 from "../../assets/candle-1.jpg";
import candle2 from "../../assets/candle-2.jpg";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};
const products = [
  { id: 1, name: "Vanilla Dream", image: candle1, price: 100, quantity: 0 },
  { id: 2, name: "Amber Glow", image: candle2, price: 100, quantity: 0 },
];
function ProductDetails() {
  const { id } = useParams(); // id is string
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((item) => item.id === Number(id));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) return <h2>Product not found</h2>;

  return <ProductCard item={product} />;
}

export default ProductDetails;
