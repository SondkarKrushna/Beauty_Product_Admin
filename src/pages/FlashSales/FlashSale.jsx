import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useGetAllSaleQuery } from "../../redux/apis/createSaleApi";

const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-[#F7DCE7]">
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32" /></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12" /></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16" /></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20" /></td>
    </tr>
);

export default function FlashSale() {
    const { data, isLoading, isError } = useGetAllSaleQuery();

    // 🧩 Memoized data
    const flashSales = useMemo(() => data?.data || [], [data]);

    // 🕓 Helper for date formatting
    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="p-9 bg-[#FFF7FA] min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-[15px] text-2xl">
                        Flash Sale Management
                    </h2>
                    <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="bg-white p-5 rounded-lg">
                    <h3 className="font-semibold text-[15px] text-[#0E0E0E] mb-3">
                        Existing Flash Sale
                    </h3>
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FFE3EE] text-[#0E0E0E]">
                                <th className="py-3 px-6 font-semibold">Sale Name</th>
                                <th className="py-3 px-6 font-semibold">Start Time</th>
                                <th className="py-3 px-6 font-semibold">End Time</th>
                                <th className="py-3 px-6 font-semibold">Products</th>
                                <th className="py-3 px-6 font-semibold">Status</th>
                                <th className="py-3 px-6 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#FFE9F2]">
                            {[...Array(4)].map((_, i) => (
                                <SkeletonRow key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-600 font-semibold">
                    ❌ Failed to load flash sales. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="p-9 bg-[#FFF7FA] min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-[15px] text-2xl">
                    Flash Sale Management
                </h2>
                <Link
                    to="../addflashsale"
                    className="bg-[#FF2E8B] text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
                >
                    + Add Flash Sale
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold text-[15px] text-[#0E0E0E] mb-3">
                    Existing Flash Sale
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse ">
                        <thead>
                            <tr className="bg-[#FFE3EE] text-[#0E0E0E]">
                                <th className="py-3 px-6 font-semibold">Sale Name</th>
                                <th className="py-3 px-6 font-semibold">Start Time</th>
                                <th className="py-3 px-6 font-semibold">End Time</th>
                                <th className="py-3 px-6 font-semibold">Products</th>
                                <th className="py-3 px-6 font-semibold">Status</th>
                                {/* <th className="py-3 px-6 font-semibold">Action</th> */}
                            </tr>
                        </thead>

                        <tbody className="bg-[#FFE9F2]">
                            {flashSales.length > 0 ? (
                                flashSales.map((sale) => (
                                    <tr
                                        key={sale._id}
                                        className="border-b border-[#F7DCE7] hover:bg-[#FFDDEE] transition"
                                    >
                                        <td className="px-6 py-4 text-[#0E0E0E] font-medium flex items-center gap-3">
                                            <img
                                                src={sale.flash_sale_image}
                                                alt={sale.flash_sale}
                                                className="w-10 h-10 rounded-md object-cover"
                                            />
                                            {sale.flash_sale}
                                        </td>
                                       
                                        <td className="px-6 py-4 text-[#0E0E0E]">
                                            {formatDate(sale.flash_sale_start_date)}{" "}
                                            {sale.flash_sale_start_time}
                                        </td>

                                        <td className="px-6 py-4 text-[#0E0E0E]">
                                            {formatDate(sale.flash_sale_end_date)}{" "}
                                            {sale.flash_sale_end_time}
                                        </td>

                                        <td className="px-6 py-4 text-[#0E0E0E]">
                                            {sale.flash_sale_products?.length || 0}
                                        </td>

                                        <td className="px-6 py-4">
                                            {sale.flash_saleActive ? (
                                                <span className="text-[#00A651] font-medium">Active</span>
                                            ) : (
                                                <span className="text-[#FF2E8B] font-medium">Inactive</span>
                                            )}
                                        </td>

                                        {/* <td className="px-6 py-4 flex items-center gap-4">
                                            <button
                                                className="text-[#00A651] hover:text-green-700 transition"
                                                title="Edit Sale"
                                            >
                                                <AiFillEdit size={17} />
                                            </button>
                                            <button
                                                className="text-[#FF2E2E] hover:text-red-700 transition"
                                                title="Delete Sale"
                                            >
                                                <FaTrash size={17} />
                                            </button>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No flash sales found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
