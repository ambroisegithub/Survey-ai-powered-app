import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa6";
import Profile from "../assets/profile.jpg";
// import { logout } from "../Redux/Slices/LoginSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import HSButton from "../components/ui/form/HSButton";

function Navbar() {
  // const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.loginIn.user);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-between w-full h-16 shadow-sm bg-white">
      <RxHamburgerMenu
        title="hamburger"
        size="24"
        color="#424856"
        className="lg:hidden ml-4 cursor-pointer"
        onClick={() => setToggleMenu(!toggleMenu)}
      />

      <div className="flex items-center gap-2 md:ml-8">
        <h2 className="text-textBlack font-bold">Survey Management</h2>
      </div>

      <nav className="hidden lg:flex items-center h-full">
        <Link
          to="/surveys"
          className={`${
            location.pathname === "/surveys"
              ? "border-b-2 border-[#1C4A93] text-[#1C4A93]"
              : "text-gray-600"
          } h-full flex items-center justify-center px-4`}
        >
          All Surveys
        </Link>
        <Link
          to="/surveys/create/blank"
          className={`${
            location.pathname === "/surveys/create/blank"
              ? "border-b-2 border-[#1C4A93] text-[#1C4A93]"
              : "text-gray-600"
          } h-full flex items-center justify-center px-4`}
        >
          Create Survey
        </Link>
        <Link
          to="/surveys/responses/all"
          className={`${
            location.pathname === "/surveys/responses/all"
              ? "border-b-2 border-[#1C4A93] text-[#1C4A93]"
              : "text-gray-600"
          } h-full flex items-center justify-center px-4`}
        >
          All Responses
        </Link>
        {!user && (
          <Link
            to="/login"
            className={`${
              location.pathname === "/login"
                ? "border-b-2 border-[#1C4A93] text-[#1C4A93]"
                : "text-gray-600"
            } h-full flex items-center justify-center px-4`}
          >
            Login
          </Link>
        )}
      </nav>

      <div className="flex items-center gap-6 mr-8">
        {user ? (
          <div
            className="hidden lg:flex items-center gap-2 cursor-pointer"
            onClick={() => setToggleProfileMenu(!toggleProfileMenu)}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={Profile}
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>
            <h2 className="text-textBlack">{`${user.firstName} ${user.lastName}`}</h2>
            <FaAngleDown size="16" color="#424856" />
          </div>
        ) : (
          <HSButton path="/login" title="Login" styles="xs:hidden lg:flex" />
        )}
      </div>

      {toggleMenu && (
        <div className="bg-white absolute z-20 top-16 left-0 flex flex-col items-start p-4 w-full text-gray-700 shadow-md border-b border-gray-200">
          <Link
            to="/surveys"
            className="py-2"
            onClick={() => setToggleMenu(false)}
          >
            All Surveys
          </Link>
          <Link
            to="/surveys/create/blank"
            className="py-2"
            onClick={() => setToggleMenu(false)}
          >
            Create Survey
          </Link>
          <Link
            to="/surveys/responses/all"
            className="py-2"
            onClick={() => setToggleMenu(false)}
          >
            All Responses
          </Link>
        </div>
      )}

      {toggleProfileMenu && (
        <div className="bg-white absolute z-20 top-16 right-0 flex flex-col items-start w-52 text-gray-700 shadow-md border-b border-l border-gray-200 py-4">
          <Link
            to="/profile"
            className="py-2 px-4"
            onClick={() => setToggleProfileMenu(false)}
          >
            Edit Profile
          </Link>
          <Link
            to="/settings"
            className="py-2 px-4"
            onClick={() => setToggleProfileMenu(false)}
          >
            Preferences
          </Link>

          <button
            type="button"
            className="border-none outline-none bg-transparent flex gap-2 w-full items-center border-t-[1.5px] border-lightGrey pt-1 mt-8 cursor-pointer"
            // onClick={() => {
            //   setToggleProfileMenu(false);
            //   if (user) {
            //     dispatch(logout());
            //   } else {
            //     navigate("/login");
            //   }
            // }}
          >
            {user ? "Sign out" : "Sign in"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;