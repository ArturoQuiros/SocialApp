import NavbarX from "./NavbarX";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <NavbarX />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
