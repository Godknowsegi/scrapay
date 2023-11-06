import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Root = () => {
  return (
    <>
      <div>
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Root;
