import candle1 from "../../assets/candle-1.jpg";
import candle2 from "../../assets/candle-2.jpg";
import ProductCard from "../ProductDetails/ProductCard";
function HomeContent() {
  return (
    <div className="content">
      <ProductCard
        item={{
          id: 1,
          name: "Candle",
          price: 100,
          image: candle1,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 2,
          name: "Candle",
          price: 100,
          image: candle2,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 3,
          name: "Candle",
          price: 100,
          image: candle1,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 4,
          name: "Candle",
          price: 100,
          image: candle2,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 5,
          name: "Candle",
          price: 100,
          image: candle1,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 6,
          name: "Candle",
          price: 100,
          image: candle2,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 7,
          name: "Candle",
          price: 100,
          image: candle1,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 8,
          name: "Candle",
          price: 100,
          image: candle2,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 9,
          name: "Candle",
          price: 100,
          image: candle1,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 10,
          name: "Candle",
          price: 100,
          image: candle2,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 11,
          name: "Candle",
          price: 100,
          image: candle1,
          quantity: 0,
        }}
      />
      <ProductCard
        item={{
          id: 12,
          name: "Candle",
          price: 100,
          image: candle2,
          quantity: 0,
        }}
      />
    </div>
  );
}

export default HomeContent;
