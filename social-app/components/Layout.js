import NavbarX from "./NavbarX";
import FooterX from "./FooterX";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <NavbarX />
      {children}
      <FooterX />
    </div>
  );
};

export default Layout;
