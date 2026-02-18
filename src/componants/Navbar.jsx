import React from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../redux/apis/authSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const { admin, token } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutAdmin());
        navigate("/signin")

    };

    return (
        <div
    className="
        flex items-center justify-between 
        h-12 md:h-14 
        px-3 md:px-6 
        backdrop-blur-md
    "
    style={{
        backgroundColor: "#FFD7EA75",
        transition: "all 0.3s ease",
    }}
>

            {/* 🔍 Search Bar */}
            {/* <div className="flex items-center bg-white rounded-full px-3 py-2 w-full sm:w-[250px] md:w-[280px] lg:w-[300px] mt-1 md:mt-0 md:ms-12 mb-2 md:mb-0 shadow-sm">
                <FaSearch className="text-gray-500 mr-2 text-sm" />
                <input
                    type="text"
                    placeholder="Search Invoice"
                    className="bg-transparent outline-none text-sm text-gray-700 w-full"
                />
            </div> */}

            {/* 🕒 Right Section */}
            <div className="flex items-center justify-end gap-3 md:gap-6 text-gray-700 font-medium w-full pe-2 md:pe-8">

                {/* 📅 Date */}
                {/* <div className="flex items-center gap-2 text-sm md:text-base">
                    <FaCalendarAlt className="text-[#FF007B]" />
                    <span>12-09-2025</span>
                </div> */}

                {/* ⏰ Time */}
                {/* <div className="flex items-center gap-2 text-sm md:text-base">
                    <IoTime className="text-[#FF007B]" />
                    <span>11:00 AM</span>
                </div> */}

                {/* 👤 Auth Section */}
                {token ? (
                    // 🔹 If logged in (verified)
                    <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-800 text-sm md:text-base">
                            {admin?.name || "Admin"}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-[#FF007B] text-white px-4 py-1 rounded-full text-sm hover:bg-[#e0006e] transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    // 🔹 If not logged in
                    <Link
                        to="/signin"
                        className="flex items-center gap-2 px-4 py-1 rounded-full mt-2 md:mt-0"
                        style={{
                            backgroundColor: "#FFCCE5",
                        }}
                    >
                        <FaUserCircle className="text-[#FF007B]" />
                        <span className="font-medium text-gray-800 text-sm md:text-base">
                            Login
                        </span>
                    </Link>
                )}
            </div>

        </div>
    );
};

export default Navbar;














