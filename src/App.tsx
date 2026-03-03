import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import HomeContent from "./components/HomeContent/HomeContent";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/Candle", element: <HomeContent /> },
      { path: "/Candle/product/:id", element: <ProductDetails /> },
      { path: "/Candle/cart", element: <Cart /> },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
