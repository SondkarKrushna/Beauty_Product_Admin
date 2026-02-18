import React, { useState } from "react";
import { FaClock, FaCalendarAlt, FaTrash } from "react-icons/fa";

const AddFlashSale1 = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Hair Cream", originalPrice: "Rs.1100", salePrice: "Rs.1000" },
    ]);

    return (
        <div className="min-h-screen bg-[#FFF7FA] px-6 py-6">
         
            <h2 className="text-[16px] font-semibold mb-4 text-black">
                Add Flash Sale
            </h2>
        
            <div className="bg-white border border-[#F8D6E0] rounded-2xl p-6 shadow-sm">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Flash Sale Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter"
                            className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Select Date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
                            />
                            <FaCalendarAlt className="absolute right-4 top-3.5 text-pink-400 text-[16px]" />
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Start Time
                        </label>
                        <div className="flex items-center border border-[#F8BBD0] rounded-lg px-4 py-3 text-sm text-gray-500">
                            <FaClock className="text-[#FF0080] text-[16px] mr-3" />
                            <span>00 : 00</span>
                            <FaCalendarAlt className="text-[#FF0080] text-[16px] mx-3" />
                            <span>10-08-2025</span>
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            End Time
                        </label>
                        <div className="flex items-center border border-[#F8BBD0] rounded-lg px-4 py-3 text-sm text-gray-500">
                            <FaClock className="text-[#FF0080] text-[16px] mr-3" />
                            <span>00 : 00</span>
                            <FaCalendarAlt className="text-[#FF0080] text-[16px] mx-3" />
                            <span>10-08-2025</span>
                        </div>
                    </div>
                </div>



                <div className="flex flex-wrap items-center gap-8 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="discountMode"
                            defaultChecked
                            className="accent-[#FF0080] w-4 h-4"
                        />
                        <span className="text-sm font-medium text-black">
                            Apply Same Discount
                        </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="discountMode"
                            className="accent-[#FFB6C1] w-4 h-4"
                        />
                        <span className="text-sm font-medium text-black">
                            Set Manual Price
                        </span>
                    </label>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Select Products
                        </label>
                        <div className="relative">
                            <select className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none">
                                <option>Select</option>
                                <option>Hair Cream</option>
                                <option>Face Wash</option>
                            </select>
                            <span className="absolute right-4 top-3.5 text-pink-400 text-[16px] pointer-events-none">
                                ▼
                            </span>
                        </div>
                    </div>


                </div>


                <div className="flex justify-end mb-6">
                    <button className="bg-[#FF0080] hover:bg-[#e60073] text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-all duration-200">
                        Add Products
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FFEAF2] text-sm text-black font-medium">
                                <th className="py-3 px-4">Product</th>
                                <th className="py-3 px-4">Original Price</th>
                                <th className="py-3 px-4">Sale Price</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-t border-pink-100 text-sm text-gray-700 bg-[#FFD7EA24]"
                                >
                                    <td className="py-3 px-4">{p.name}</td>
                                    <td className="py-3 px-4">{p.originalPrice}</td>
                                    <td className="py-3 px-4">{p.salePrice}</td>
                                    <td className="py-3 px-4">
                                        <button className="text-red-500 hover:text-red-700 transition">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddFlashSale1;
