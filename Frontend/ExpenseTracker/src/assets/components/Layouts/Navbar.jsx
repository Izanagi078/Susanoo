import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleSideMenu = () => setOpenSideMenu(prev => !prev);

  return (
    <div>
      {/* Set a higher z-index on the navbar so it always stays visible */}
      <nav className="relative z-60 flex items-center gap-5 bg-white border-b border-gray-300 p-4">
        {/* Hamburger icon is visible only on smaller screens */}
        <button
          className="block lg:hidden text-black focus:outline-none"
          onClick={toggleSideMenu}
          aria-label="Toggle Side Menu"
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        {/* Always render the Expense Tracker title */}
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
      </nav>

      {/* Mobile SideMenu Overlay */}
      {openSideMenu && (
        <div
          className="fixed inset-0 z-50 bg-white bg-opacity-30 lg:hidden"
          onClick={toggleSideMenu}
        >
          <div
            className="absolute top-[61px] left-0 w-64 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
