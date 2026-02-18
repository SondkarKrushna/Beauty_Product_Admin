import React, { useMemo } from "react";
import {
    FaHome,
    FaFileInvoice,
    FaMoneyBill,
    FaShoppingCart,
    FaBolt,
    FaTimes   // 👈 Add this
} from "react-icons/fa";
import { MdPeople, MdCategory } from "react-icons/md";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import sidebarImage from "/sidebarlogo.png";

const Sidebar = ({ setIsOpen }) => {   // 👈 receive prop
    const location = useLocation();

    const menuItems = useMemo(
        () => [
            { path: "/", label: "Dashboard", icon: <FaHome /> },
            { path: "/customers", label: "Customers", icon: <MdPeople /> },
            { path: "/invoice", label: "Invoices", icon: <FaFileInvoice /> },
            { path: "/revenue", label: "Revenue", icon: <FaMoneyBill /> },
            { path: "/productIn", label: "Products", icon: <PiHandbagSimpleFill /> },
            { path: "/order", label: "Orders", icon: <FaShoppingCart /> },
            { path: "/flashsale", label: "Flash Sale", icon: <FaBolt /> },
            { path: "/categories", label: "Categories", icon: <MdCategory /> },
            { path: "/ContactUsTable", label: "Help Queries", icon: <MdCategory /> }
        ],
        []
    );

    const isActive = (path) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

    const getClasses = (path) =>
        `flex items-center w-[237px] p-3 rounded-r-full cursor-pointer transition-all ${
            isActive(path)
                ? "bg-[#FF007B] text-white"
                : "bg-white/20 hover:bg-white/30 text-white"
        }`;

    return (
        <aside
            className="flex flex-col text-white w-[246px] h-screen rounded-tr-3xl rounded-br-3xl shadow-lg overflow-y-auto scrollbar-none relative pb-6 lg:pb-0"
            style={{
                background:
                    "linear-gradient(180.36deg, #280F22 33.41%, #FF007B 180.86%)",
            }}
        >
            {/* ❌ Close Button (Mobile Only) */}
            <button
                className="absolute top-4 right-4 text-xl lg:hidden"
                onClick={() => setIsOpen(false)}
            >
                <FaTimes />
            </button>

            {/* 🌸 Logo Section */}
            <div className="flex flex-col items-center mb-4 mt-4">
                <img src={sidebarImage} alt="logo" className="h-20" />
                <h2 className="tracking-wider font-serif">S O N A L</h2>
                <p className="text-sm text-white/80">Cosmetics</p>
            </div>

            {/* 🧭 Navigation */}
            <nav className="flex-1">
                <ul className="space-y-2">
                    {menuItems.map(({ path, label, icon }) => (
                        <li key={path}>
                            <Link to={path} className={getClasses(path)}>
                                <span className="mr-3 text-lg">{icon}</span>
                                <span className="font-medium">{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
