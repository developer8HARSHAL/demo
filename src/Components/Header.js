import { Menu, Plus, RefreshCw, Expand, Bell, Globe, User } from "lucide-react";
import { useState } from "react";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleFullScreenToggle = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleNotificationsToggle = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLanguageToggle = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  return (
    <div className="h-28 w-full flex items-center justify-between px-12 bg-white drop-shadow-lg">
      <div className="flex-1">
        <button
          onClick={toggleSidebar}
          className="p-6 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          aria-label="Toggle sidebar"
        >
          <Menu size={30} />
        </button>
      </div>

      <div className="flex-1 flex justify-center items-center">
      <img className="h-20 w-auto" src="/logo.png" alt="Logo" />

      </div>

      <nav className="flex-1 flex items-center space-x-8 justify-end">
        <div className="relative group">
          <div className="w-12 h-12 bg-violet-700 rounded-tl-lg rounded-bl-lg rounded-br-lg flex items-center justify-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Plus className="text-violet-700" size={24} />
            </div>
          </div>
        </div>

        <a onClick={handleRefresh} className="relative group w-12 h-12 text-violet-700 hover:bg-gray-100 transition-colors flex items-center justify-center">
          <RefreshCw size={35} />
          <span className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-black text-white text-4xl rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Refresh
          </span>
        </a>

        <a onClick={handleNotificationsToggle} className="relative group w-12 h-12 text-violet-700 hover:bg-gray-100 transition-colors flex items-center justify-center">
          <Bell size={35} />
          <span className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-black text-white text-4xl rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Notifications
          </span>
        </a>

        <div className="relative">
          <a onClick={handleLanguageToggle} className="relative group w-12 h-12 text-violet-700 py-12 hover:bg-gray-100 transition-colors flex items-center justify-center">
            <Globe size={35} />
            <span className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-black text-white text-4xl rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Language
            </span>
          </a>
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 w-2/8 bg-white border border-gray-300 rounded-lg shadow-lg">
              <ul className="p-4 space-y-4 text-2xl">
                <li className="hover:bg-gray-100 p-2 cursor-pointer">United States</li>
                <li className="hover:bg-gray-100 p-2 cursor-pointer">India</li>
                <li className="hover:bg-gray-100 p-2 cursor-pointer">United Kingdom</li>
                <li className="hover:bg-gray-100 p-2 cursor-pointer">Germany</li>
              </ul>
            </div>
          )}
        </div>

        <a onClick={handleFullScreenToggle} className="relative group w-12 h-12 text-violet-700 py-12 transition-colors hover:bg-gray-100 flex items-center justify-center">
          <Expand size={35} />
          <span className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-black text-white text-4xl rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Expand
          </span>
        </a>

        <div className="flex items-center space-x-2 px-10 py-10 text-gray-700 hover:bg-gray-100 transition-colors square">
          <User size={35} className="text-black fill-current" />
          <span className="text-3xl font-medium">admin</span>
        </div>
      </nav>

      {showNotifications && (
        <div className="fixed top-32 right-96 max-92 w-1/7 bg-white  p-6">
          <h3 className="text-2xl font-bold mb-10">Notifications</h3>
          <ul className="space-y-4 text-xl">
            <li className="border-b pb-2">Notification 1</li>
            <li className="border-b pb-2">Notification 2</li>
            <li className="border-b pb-2">Notification 3</li>
          </ul>
          <button onClick={handleNotificationsToggle} className="mt-4 text-lg text-blue-500">Close</button>
        </div>
      )}
    </div>
  );
}
