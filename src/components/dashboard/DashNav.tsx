import { useState, useEffect } from 'react';
import { FaBell, FaAngleDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Profile from "../../assets/profile.jpg";

function AdminDashBoardNav() {
  const navigate = useNavigate();
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  const user = { profile_picture: null }; 

  const handleProfileMenuToggle = () => {
    setToggleProfileMenu(!toggleProfileMenu);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleProfileMenuToggle();
    }
  };


  return (
    <div className="relative flex items-center justify-between w-full h-16 shadow-sm px-5">
      <div className="lg:hidden ml-8"></div>
      <div className="flex items-center gap-2">
        <h2 className="text-black font-bold">Survey App</h2>
        <h2 className="text-black font-extrabold hidden lg:block ml-20">
          Dashboard
        </h2>
      </div>
      <div className="flex items-center gap-1 sm:gap-8 mr-4">
        <div className="relative">
          <FaBell size="20" color="#424856" title="notifications" />
          <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red text-white flex items-center justify-center text-xs">
            1
          </div>
        </div>
        <div
          className="flex items-center gap-1 sm:gap-2 cursor-pointer"
          onClick={handleProfileMenuToggle}
          onKeyPress={handleKeyPress}
          role="button"
          tabIndex={0}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
            src={ Profile}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-black text-sm hidden lg:block">Ambroise Muhayimana</h2>
          </div>
          <FaAngleDown size="15" color="#424856" title="toggleProfile" />
        </div>
      </div>
      {toggleProfileMenu && (
        <div className="bg-white absolute z-20 top-16 right-0 flex flex-col items-center w-52 shadow-sm py-2 text-gray-700 rounded-b-md border-l border-b border-gray-300">
          <div className="flex flex-col w-full gap-2 border-b-[1.5px] border-gray-200 py-2">
            <div className="flex gap-2 w-full items-center px-2">
              <h2>Edit profile</h2>
            </div>
            <div className="flex gap-2 w-full items-center px-2">
              <h2>Preferences</h2>
            </div>
          </div>
          <div className="flex items-center w-full justify-between pr-2 py-2 border-b-[1.5px] border-gray-200">
            <div className="flex gap-2 items-center px-2">
              <h2>Night mode</h2>
            </div>
            <div className="rounded-xl w-9 h-5 bg-custom-purple flex items-center justify-end px-1">
              <div className="bg-white rounded-full w-3 h-3" />
            </div>
          </div>
          <div className="flex gap-2 w-full items-center px-2 pt-1">
            <h2>Help center</h2>
          </div>
          <button
            type="button"
            className="border-none outline-none bg-transparent flex gap-2 w-full items-center px-2 border-t-[1.5px] border-gray-200 pt-1 mt-8 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashBoardNav;