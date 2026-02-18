import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaBars } from "react-icons/fa";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="h-screen w-full flex overflow-hidden">

            {/* ✅ Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 h-full z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                <Sidebar setIsOpen={setIsOpen} />
            </div>

            {/* ✅ Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* ✅ Main Content */}
            <div className="flex-1 flex flex-col lg:ml-[246px]">

                {/* Navbar */}
                <div className="fixed top-0 left-0 right-0 z-30 lg:left-[246px]">
                    <div className="flex items-center">
                        <button
                            className="lg:hidden p-3 text-xl"
                            onClick={() => setIsOpen(true)}
                        >
                            <FaBars />
                        </button>

                        <div className="flex-1">
                            <Navbar />
                        </div>
                    </div>
                </div>

                <main className="mt-14 flex-1 overflow-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
