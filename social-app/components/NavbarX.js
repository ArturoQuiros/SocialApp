import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Navbar } from "flowbite-react/lib/cjs/index.js";
import { useRouter } from "next/router";

const NavbarX = () => {
  const router = useRouter();
  const { data: session } = useSession();

  let button;
  let hello;
  let home = true;
  let albums = false;

  if (router.pathname.startsWith("/albums")) {
    albums = true;
    home = false;
  }

  if (session) {
    button = (
      <button className="" onClick={() => signOut()}>
        Sign Out
      </button>
    );
    hello = <div className="">Welcome {session.user.name}</div>;
  } else {
    button = (
      <button className="" onClick={() => signIn()}>
        Sign In
      </button>
    );
    hello = <div className="hello"></div>;
  }

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <img
            src="/resources/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Social App
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="#">{hello}</Navbar.Link>
          <Navbar.Link href="/" active={home}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/albums" active={albums}>
            Albums
          </Navbar.Link>
          <Navbar.Link href="#">{button}</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarX;
