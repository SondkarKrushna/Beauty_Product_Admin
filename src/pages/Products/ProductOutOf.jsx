
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import productimage from "/product.png";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import ProductAdd from "./ProductAdd";

const ProductOut = () => {
    const [activeCategory, setActiveCategory] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    
    return (
        <div
            className="h-screen p-3 flex flex-col overflow-hidden"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 flex-wrap">
                <h2 className="text-[#000] font-semibold text-m cursor-pointer">
                    Products
                </h2>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-3">
                <Link
                    to="/productIn"
                    className={`px-4 py-2 text-sm font-semibold rounded-lg ${location.pathname === "/productIn"
                        ? "bg-[#FF007F] text-white"
                        : "bg-[#FFE9F4] text-[#333]"
                        }`}
                >
                    In Stock
                </Link>
                <Link
                    to="/productOut"
                    className={`px-4 py-2 text-sm font-semibold rounded-lg ${location.pathname === "/productOut"
                        ? "bg-[#FF007F] text-white"
                        : "bg-[#FFE9F4] text-[#333]"
                        }`}
                >
                    Out of stock
                </Link>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="ms-auto btn rounded-full px-6 py-2 bg-[#FF007F] text-white border-none hover:opacity-90"
                >
                    + Add Product
                </button>
            </div>


            <div className="flex flex-1 flex-col lg:flex-row gap-6 overflow-hidden">
                {/* Sidebar */}
                <div className="w-full lg:w-1/6 bg-[#FFD7EA75] rounded-3xl p-3 flex flex-wrap lg:flex-col gap-2 justify-center lg:justify-start">
                    {[
                        "Hair Care",
                        "Creams",
                        "Skin Care",
                        "Nail Paints",
                        "Lipsticks",
                        "Hair dryer",
                    ].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-center px-4 py-2 rounded-full font-medium transition-all ${activeCategory === cat
                                ? "bg-gradient-to-r from-[#280F22] to-[#8E3579] text-white"
                                : "text-[#8E3579] hover:bg-[#FFD7EA]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* //👇 */}
                <div className="flex-1 bg-[#FFE9F4] rounded-2xl p-3 pe-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FFB6D9] scrollbar-track-transparent">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all relative flex flex-col items-center overflow-hidden w-full h-[210px]"
                        >
                            <img
                                src={productimage}
                                alt="Product"
                                className="w-full h-[120px] object-cover rounded-t-2xl"
                            />
                            <div className="text-center mt-2">
                                <p className="text-sm text-gray-700 leading-tight">
                                    Laura Mercier <br /> Cream
                                </p>
                                <p className="text-base font-semibold text-black mt-1">₹799</p>
                            </div>
                            <div className="absolute bottom-1 right-2 flex gap-2">
                                <button className="btn btn-xs bg-[#FF007F] text-white rounded-t-lg border-none w-10 me-2 h-5 flex items-center justify-center hover:opacity-90 gap-2">
                                    <AiFillEdit className="text-xs" />
                                    <FaTrashAlt className="text-xs" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal ... */}
            <ProductAdd
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ProductOut;





