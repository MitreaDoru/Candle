import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
const Home = () => {
  return (
    <div className="home">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
