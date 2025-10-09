import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { fetchAllProjects } from "../services/projectService";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../appSlice";
import {
  convertTimeCardToTableFormat,
  fetchCurrentWeekTimeCards,
} from "../services/timecardService";
import { getUserDataFromLocalStorage } from "../services/authService";

const menuItems = [
  { id: "watch", name: "Watch", icon: "clock" },
  { id: "timesheet", name: "Time Sheet", icon: "calendar" },
  { id: "project", name: "Projects", icon: "folder" },
  { id: "notes", name: "Notes", icon: "document" },
];

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { projects, timeCards } = useSelector((state) => state.app);
  const user = getUserDataFromLocalStorage();

  useEffect(() => {
    if (projects.length === 0) {
      fetchAllProjects()
        .then((projects) => {
          dispatch(setState("projects", projects));
        })
        .catch((error) => {
          console.error("Error fetching projects on home page load:", error);
        });
    }

    if (timeCards.length === 0) {
      fetchCurrentWeekTimeCards()
        .then((timeCards) => {
          dispatch(setState("timeCards", timeCards));
          const formattedTimeCards = convertTimeCardToTableFormat(timeCards);
          dispatch(setState("tableTimeCards", formattedTimeCards));
        })
        .catch((error) => {
          console.error("Error fetching time cards on home page load:", error);
        });
    }
  }, []);

  // Get active menu item from current route
  const getActiveMenuItem = () => {
    const path = location.pathname;
    if (path.includes("/watch")) return "watch";
    if (path.includes("/timesheet")) return "timesheet";
    if (path.includes("/project")) return "project";
    if (path.includes("/notes")) return "notes";
    return "watch"; // default
  };

  const activeMenuItem = getActiveMenuItem();

  // Redirect to /home/watch if visiting just /home
  useEffect(() => {
    if (location.pathname === "/home") {
      navigate("/home/watch", { replace: true });
    }
  }, [location.pathname, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMenuItemClick = (item) => {
    navigate(`/home/${item}`);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    setIsUserMenuOpen(false);
  };

  const handleProfileSettings = () => {
    // Implement profile settings navigation here
    console.log("Opening profile settings...");
    setIsUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Header - spans full width */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-gray-800 shadow-sm border-b border-gray-700 h-16">
        <div className="flex items-center justify-between h-full px-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-400 hover:text-white focus:outline-none focus:text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1 className="text-xl font-bold text-white">Chrononote</h1>

          {/* User menu - always at top right */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center text-sm font-medium text-white hover:text-gray-300 focus:outline-none focus:text-gray-300 transition-colors duration-200"
            >
              <span className="mr-2">{user?.username}</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* User dropdown menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-50">
                <div className="py-1">
                  <button
                    onClick={handleProfileSettings}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main layout with sidebar and content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 top-16 z-20 w-64 bg-gray-800 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:inset-0 md:top-0`}
        >
          <div className="flex items-center justify-between h-16 px-4 bg-gray-900 md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="mt-8 md:mt-4">
            <div className="px-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeMenuItem === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {/* Icons for menu items */}
                  {item.icon === "clock" && (
                    <svg
                      className="mr-3 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {item.icon === "calendar" && (
                    <svg
                      className="mr-3 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {item.icon === "folder" && (
                    <svg
                      className="mr-3 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  )}
                  {item.icon === "document" && (
                    <svg
                      className="mr-3 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  )}
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Sidebar overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main content area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-3">
            <div className="max-w-7xl mx-auto">
              {/* React Router Outlet for nested routes */}
              <div className="bg-gray-900">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Click outside handler for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
