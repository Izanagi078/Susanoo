import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const toggleSideMenu = () => setOpenSideMenu(prev => !prev);

  return (
    <div>
      {/* Navbar Container */}
      <nav className="relative z-60 flex items-center gap-5 bg-black border-b border-yellow-500 p-4">
        {/* Hamburger icon visible on smaller screens */}
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={toggleSideMenu}
          aria-label="Toggle Side Menu"
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        {/* Title with gradient text */}
        <h2 className="text-lg font-medium">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-yellow-300">
            Expense
          </span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-yellow-300">
            Tracker
          </span>
        </h2>
      </nav>

      {/* Mobile SideMenu Overlay */}
      {openSideMenu && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 lg:hidden"
          onClick={toggleSideMenu}
        >
          <div
            className="absolute top-[61px] left-0 w-64 bg-black"
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
