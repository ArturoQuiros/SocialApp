import { Navbar, Dropdown, Avatar } from "flowbite-react/lib/cjs/index.js";
import { useAuthStore } from "../../hooks/useAuthStore";
import { Link, NavLink, useNavigate } from 'react-router-dom';

export const NavbarX = () => {

  const {startLogout, user} = useAuthStore();

  let profileDropdown = (
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
            {user.name}{" "}
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <a onClick={startLogout}>Log out</a>
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  );

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <img
            src="/src/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Social App Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Social App
          </span>
        </Navbar.Brand>
        {profileDropdown}
        <Navbar.Collapse>

          <NavLink 
              className={({isActive}) => `${isActive ? 'text-violet-900 font-bold' : ''}`} 
              to="/"
          >
              Home
          </NavLink>
          <NavLink 
              className={({isActive}) => ` ${isActive ? 'text-violet-900 font-bold' : ''}`} 
              to="/albums"
          >
              Albums
          </NavLink>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};