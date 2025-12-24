import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import lens from "../assets/lens.png";
import userIcon from "../assets/user.png";
import CartIcon from "./CartIcon";
import { toast } from "react-hot-toast";

interface searchProp {
  setSearch: (menu: string) => void;
  setMenu: (menu: string) => void;
}

const Navbar: React.FC<searchProp> = (props) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | null>("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [])
   


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");

    window.location.href = "/login"; 
  };

  return (
    <div className="grid grid-cols-2 p-3 shadow-md bg-white">
      
      {/* LEFT SECTION */}
      <div
        onClick={() => props.setMenu("")}
        className="flex cursor-pointer items-center"
      >
        <Link to="/home">
          <div className="ml-7">
            <h1 className="text-blue-700 text-2xl font-bold italic">Flipkart</h1>
            <h4 className="text-gray-500 italic">Explore Plus</h4>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <div className="bg-blue-50 flex items-center p-4 w-[820px] ml-9 rounded-md">
          <img src={lens} alt="search icon" className="w-6 h-5" />
          <input
            type="text"
            placeholder="Search products"
            onChange={(e) => props.setSearch(e.target.value)}
            className="outline-none ml-3 p-2 w-650 h-8"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-end gap-2 mr-10">
        <a className="flex items-center justify-center gap-2 cursor-pointer" onClick={() => navigate("/cart")}>
          <CartIcon />
          <h1 className="mr-10">Cart</h1>
        </a>

        {/* USER DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((p) => !p)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={userIcon} alt="user" className="w-6 h-6" />
            <h1 className="font-medium">
              {username!==null ? username : "Account"}
            </h1>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-md p-3 z-50 border">
              
              {!username && (
                <>
                  <Link
                    to="/register"
                    className="block py-2 px-2 hover:bg-gray-100 rounded text-nowrap"
                  >
                    New Customer? Sign Up
                  </Link>

                  <Link
                    to="/login"
                    className="block py-2 px-2 hover:bg-gray-100 rounded"
                  >
                    Login
                  </Link>

                  <hr className="my-2" />
                </>
              )}

              {username && (
                <>
                  {/* <button className="block w-full text-left py-2 px-2 hover:bg-gray-100 rounded">
                    Profile
                  </button> */}

                  <Link
                    to="/profile"
                    className="block py-2 px-2 hover:bg-gray-100 rounded"
                  >
                    Profile
                  </Link>


                  {/* <button className="block w-full text-left py-2 px-2 hover:bg-gray-100 rounded">
                    Orders
                  </button> */}

                  <Link
                    to="/Orders"
                    className="block py-2 px-2 hover:bg-gray-100 rounded"
                  >
                    Orders
                  </Link>

                  <hr className="my-2" />

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 px-2 hover:bg-gray-100 rounded text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </>
              )}

            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Navbar;
