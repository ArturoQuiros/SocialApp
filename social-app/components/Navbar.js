import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="header">
      <div className="logo">
        <h1>logo</h1>
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/protected">
        <a>Protected</a>
      </Link>
    </nav>
  );
};

export default Navbar;
