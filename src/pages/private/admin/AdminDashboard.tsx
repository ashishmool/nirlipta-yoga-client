import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    FaChalkboardTeacher,
    FaHammer,
    FaHome,
    FaSuitcase,
    FaUsers,
    FaSignOutAlt,
} from "react-icons/fa";
import { FaPeopleGroup, FaPersonPraying } from "react-icons/fa6";

const sidelinks = [
    { title: "Dashboard", href: "/admin", icon: <FaHome /> },
    { title: "Instructors", href: "/admin/instructors", icon: <FaChalkboardTeacher /> },
    { title: "Workshops", href: "/admin/workshops", icon: <FaHammer /> },
    { title: "Accommodations", href: "/admin/accommodations", icon: <FaHome /> },
    { title: "Retreats", href: "/admin/retreats", icon: <FaSuitcase /> },
    { title: "Yoga Poses", href: "/admin", icon: <FaPersonPraying /> },
    { title: "Partners", href: "/admin", icon: <FaPeopleGroup /> },
    { title: "Users", href: "/admin/users", icon: <FaUsers /> },
];

function Sidebar({
                     isCollapsed,
                     setIsCollapsed,
                     onLogout,
                 }: {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    onLogout: () => void;
}) {
    return (
        <aside
            className={`${
                isCollapsed ? "w-16" : "w-64"
            } bg-gray-800 text-white h-screen transition-all duration-300 flex flex-col justify-between`}
        >
            {/* Collapse/Expand Button */}
            <div className="p-4">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-gray-300 mb-4 w-full flex justify-center items-center hover:bg-gray-700 p-2 rounded"
                >
                    {isCollapsed ? (
                        <span className="text-lg">▶</span>
                    ) : (
                        <span className="text-lg">◀</span>
                    )}
                </button>

                {/* Navigation Links */}
                <nav>
                    {sidelinks.map((link) => (
                        <Link
                            key={link.title}
                            to={link.href}
                            className={`flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition-all duration-200 ${
                                isCollapsed ? "justify-center" : "justify-start"
                            }`}
                        >
                            <span className="text-xl">{link.icon}</span>
                            {!isCollapsed && (
                                <span className="whitespace-nowrap">{link.title}</span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Logout Button */}
            <button
                onClick={onLogout}
                className={`bg-red-600 hover:bg-red-700 p-3 text-white flex items-center justify-center rounded m-4 ${
                    isCollapsed ? "justify-center" : "justify-start"
                }`}
            >
                <FaSignOutAlt className="text-xl" />
                {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
        </aside>
    );
}


export default function AdminDashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear localStorage and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        navigate("/");
    };

    const userEmail = localStorage.getItem("email");

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                <header className="flex flex-col border-b border-gray-300 pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    {userEmail && (
                        <p className="text-sm text-gray-600 mt-2">Welcome, {userEmail}</p>
                    )}
                </header>

                {/* Nested Routes */}
                <div className="bg-white shadow rounded-lg p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

