import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Navbar, Dropdown, Avatar } from "flowbite-react/lib/cjs/index.js";
import { useRouter } from "next/router";

const NavbarX = () => {
  const router = useRouter();
  const { data: session } = useSession();

  let button;
  let hello;
  let home = true;
  let albums = false;
  let profileDropdown;

  if (router.pathname.startsWith("/albums")) {
    albums = true;
    home = false;
  }

  if (session) {
    profileDropdown = (
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{}</span>
            <span className="block truncate text-sm font-medium">
              {session.user.name}{" "}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <a onClick={() => signOut()}>Sign out</a>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    );
  } else {
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={<Avatar rounded={true} />}
      >
        <Dropdown.Header>
          <span className="block text-sm">{}</span>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item>
          <a onClick={() => signIn()}>Sign In</a>
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>;
  }

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Social App
          </span>
        </Navbar.Brand>
        {profileDropdown}
        <Navbar.Collapse>
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
