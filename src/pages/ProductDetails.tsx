import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  selectProducts,
} from "../features/actions/actionsSelectors";
import type { AppDispatch } from "../app/store";
import { add, increment, decrement } from "../features/actions/cartSlice";
import type { Product } from "../types/product";
const ProductPage = () => {
  const [activeTab, setActiveTab] = useState("detalii");
  const { id } = useParams(); // id is string
  const [product, setProduct] = useState<Product | null>(null);
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch<AppDispatch>();
  const existInCart = cart.filter((cartItem) => cartItem._id === id);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((item) => item._id === id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  if (!product) return <h2>Product not found</h2>;
  return (
    <div className="product-page">
      <div className="container">
        <div className="product-hero">
          <div className="gallery">
            <img
              className="main-image"
              src={`/Candle/assets/${product.image}`}
              alt="Candle"
            />

            <div className="thumbnails">
              <img src="https://via.placeholder.com/100x120" alt="" />
              <img src="https://via.placeholder.com/100x120" alt="" />
              <img src="https://via.placeholder.com/100x120" alt="" />
            </div>
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price">{product.price.toFixed(2)} RON</p>
            <p className="description">De adaugat</p>

            <div className="actions">
              {(existInCart.length > 0 ? existInCart[0].quantity : 0) === 0 && (
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(add({ ...product, quantity: 1 }));
                  }}
                >
                  Add to Cart
                </button>
              )}
              {(existInCart.length > 0 ? existInCart[0].quantity : 0) > 0 && (
                <div className="quantity">
                  <button
                    className="btn"
                    onClick={() => {
                      dispatch(decrement({ _id: product._id }));
                    }}
                  >
                    -
                  </button>
                  <p className="count">{`${existInCart.length > 0 ? existInCart[0].quantity : 0}`}</p>
                  <button
                    className="btn"
                    onClick={() => {
                      dispatch(increment({ _id: product._id }));
                    }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="tab-content">
          <div className="tabs">
            <button
              className={activeTab === "detalii" ? "active" : ""}
              onClick={() => setActiveTab("detalii")}
            >
              Detalii
            </button>
            <button
              className={activeTab === "specificatii" ? "active" : ""}
              onClick={() => setActiveTab("specificatii")}
            >
              Specificații
            </button>
            <button
              className={activeTab === "review" ? "active" : ""}
              onClick={() => setActiveTab("review")}
            >
              Review-uri
            </button>
          </div>
          {activeTab === "detalii" && (
            <div className="panel">
              <p>de completat</p>
            </div>
          )}

          {activeTab === "specificatii" && (
            <div className="panel">
              <table>
                <tbody>
                  <tr>
                    <td>Diametru</td>
                    <td>de</td>
                  </tr>
                  <tr>
                    <td>Inaltime</td>
                    <td>completat</td>
                  </tr>
                  <tr>
                    <td>Greutate</td>
                    <td>si</td>
                  </tr>
                  <tr>
                    <td>Miros</td>
                    <td>aici</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "review" && (
            <div className="panel">
              <div className="review">
                <strong>Andrei Popescu</strong>
                <span>★★★★★</span>
                <p>de adaugat</p>
              </div>

              <div className="review">
                <strong>Maria Ionescu</strong>
                <span>★★★★☆</span>
                <p>de adaugat</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
