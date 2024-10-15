import { useState } from "react";
import { Link } from "react-router-dom";
import { Gauge, Users, User, Briefcase, ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar({ isOpen }) {
  const [openDropdown, setOpenDropdown] = useState("");

  const links = [
    
    {
      name: "Users",
      icon: User,
      subLinks: [
        { name: "User List", path: "/users" },
        { name: "Assign Role", path: "/users/assign-role" }
      ]
    },
    {
      name: "Employee",
      icon: Users,
      subLinks: [
        { name: "Employee List", path: "/Employee" }
      ]
    },
    {
      name: "GoalTypeManagement",
      icon: User,
      subLinks: [
        { name: "GoalTypeManagement", path: "/GoalTypeManagement" }
      ]
    },
    {
      name: "Training",
      icon: User,
      subLinks: [
        { name: "Training List", path: "/Training" },
        { name: "Training Type", path: "/users/assign-role" },
        { name: "Trainers", path: "/users/assign-role" }
      ]
    },
    {
      name: "TicketManagement",
      icon: User,
      subLinks: [
        { name: "TicketManagement", path: "/TicketManagement" }
      ]
    },
  ];

  const toggleDropdown = (linkName) => {
    setOpenDropdown(openDropdown === linkName ? "" : linkName);
  };

  return (
    <div className={`fixed left-0 w-1/7 md:w-80 bg-gray-100 shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto overflow-x-hidden z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} h-full`}>
      <nav className="mt-5">
        <ul>
          {links.map((link) => (
            <li key={link.name} className="mb-10">
              <button
                onClick={() => toggleDropdown(link.name)}
                className="flex items-center w-full h-20 px-2 sm:px-4 md:px-8 py-2 text-left text-gray-700 hover:bg-white"
              >
                <span className="flex-shrink-0 mr-2 sm:mr-4 md:mr-6">
                  <link.icon size={35} className="text-violet-600" />
                </span>
                <span className="text-xl md:text-3xl truncate">{link.name}</span>
                {link.subLinks && (
                  <span className="ml-auto">
                    {openDropdown === link.name ? (
                      <ChevronUp size={30} className="text-violet-600" />
                    ) : (
                      <ChevronDown size={30} className="text-violet-600" />
                    )}
                  </span>
                )}
              </button>
              {openDropdown === link.name && link.subLinks && (
                <ul className="ml-8 sm:ml-10 md:ml-12 mt-2">
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.name} className="mb-6">
                      <Link
                        to={subLink.path}
                        className="text-xl md:text-2xl block px-2 sm:px-3 md:px-4 py-2 text-gray-400 hover:bg-gray-50 truncate"
                      >
                        {subLink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}