import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useGetAllOrdersQuery } from "../redux/apis/orderApi";

const Revenue = () => {
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("today");
    const [currentPage, setCurrentPage] = useState(1);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const { data, isLoading } = useGetAllOrdersQuery({
        page: currentPage,
        limit: 10
    });

    const orders = data?.data || [];

    if (isLoading) {
        return (
            <div className="p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>

                <div className="flex gap-6">
                    <div className="w-[345px] h-[103px] bg-gray-200 rounded-lg"></div>
                    <div className="w-[345px] h-[103px] bg-gray-200 rounded-lg"></div>
                </div>

                <div className="mt-6 bg-gray-200 h-64 rounded-xl"></div>
            </div>
        );
    }

    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const today = new Date().toISOString().split("T")[0];
    const todaysOrders = orders.filter(order => order.createdAt?.startsWith(today));
    const todaysRevenue = todaysOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const visibleOrders = activeTab === "today" ? todaysOrders : orders;

    const filteredOrders = visibleOrders.filter(o =>
        o.userId?.name?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-pink-50 min-h-screen p-6 font-sans">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h2>

            {/* CARDS */}
            <div className="flex flex-wrap gap-6">

                {/* TODAY CARD */}
                <div
                    onClick={() => handleTabChange("today")}
                    className={`w-[345px] h-[103px] rounded-[10px] shadow-lg p-4 flex items-center gap-4 cursor-pointer transition 
                    ${activeTab === "today" ? "ring-2 ring-[#FF007B]" : ""}`}
                    style={{
                        backgroundColor: activeTab === "today" ? "#FF007B" : "#FFD1E8",
                        boxShadow: "0px 4px 15.5px -1px rgba(255, 0, 123, 0.2)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
                        <Icon icon="healthicons:money-bag" className="text-2xl" color="#FF007B" />
                    </div>
                    <div>
                        <p className={`text-sm font-medium ${activeTab === "today" ? "text-white" : "text-black"}`}>Today's Revenue</p>
                        <p className={`text-3xl font-medium ${activeTab === "today" ? "text-white" : "text-black"}`}>₹{todaysRevenue}</p>
                    </div>
                </div>

                {/* TOTAL CARD */}
                <div
                    onClick={() => handleTabChange("total")}
                    className={`w-[345px] h-[103px] rounded-[10px] shadow-lg p-4 flex items-center gap-4 cursor-pointer transition 
                    ${activeTab === "total" ? "ring-2 ring-[#FF007B]" : ""}`}
                    style={{
                        backgroundColor: activeTab === "total" ? "#FF007B" : "#FFD1E8",
                        boxShadow: "0px 4px 15.5px -1px rgba(255, 0, 123, 0.2)",
                    }}

                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
                        <Icon icon="healthicons:money-bag" className="text-2xl" color="#FF007B" />
                    </div>
                    <div>
                        <p className={`text-sm font-medium ${activeTab === "total" ? "text-white" : "text-black"}`}>Total Revenue</p>
                        <p className={`text-3xl font-medium ${activeTab === "total" ? "text-white" : "text-black"}`}>₹{totalRevenue}</p>
                    </div>
                </div>
            </div>

            {/* RECENT TRANSACTIONS */}
            <div
                className="mt-8 bg-white rounded-[12px] border border-[#FFD7EA]"
                style={{ boxShadow: "0px 0px 4px 0px #FF007B4D" }}
            >
                <div className="overflow-x-auto max-h-[650px] overflow-y-scroll p-4">
                    <div className="pb-3 flex justify-between">
                        <h3 className="text-md font-semibold text-[#000000]">
                            {activeTab === "today" ? "Today's Transactions" : "All Transactions"}
                        </h3>

                        {/* SEARCH INPUT */}
                        <input
                            type="text"
                            placeholder="Search customer..."
                            className="border px-3 py-1 rounded-md text-sm"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <table className="w-full text-left">
                        <thead className="sticky top-0 z-10 bg-pink-700">
                            <tr className="bg-[#FF007B1A]">
                                <th className="py-3 pl-8 font-medium text-[#2B2B2B]">Customer</th>
                                <th className="py-3 font-medium text-[#2B2B2B]">Date / Time</th>
                                <th className="py-3 font-medium text-[#2B2B2B]">Amount</th>
                                <th className="py-3 font-medium text-[#2B2B2B]">Payment</th>
                                <th className="py-3 font-medium text-[#2B2B2B]">Status</th>
                            </tr>
                        </thead>

                        <tbody className="bg-[#FFD7EA24]">
                            {filteredOrders.map((order) => {
                                const date = new Date(order.createdAt);
                                const dateStr = date.toLocaleDateString("en-IN");
                                const timeStr = date.toLocaleTimeString("en-IN");

                                return (
                                    <tr key={order._id} className="border-[#EEE]">
                                        <td className="py-3 pl-8 text-sm text-[#2B2B2B]">
                                            {order.userId?.name || "Unknown"}
                                        </td>

                                        <td className="py-3 text-sm text-[#2B2B2B] whitespace-nowrap">
                                            {dateStr}<br />{timeStr}
                                        </td>

                                        <td className="py-3 text-sm text-[#2B2B2B]">
                                            ₹{order.totalAmount}
                                        </td>

                                        <td className="py-3 text-sm text-[#2B2B2B]">
                                            {order.order_type}
                                        </td>

                                        <td
                                            className={`py-3 text-sm font-medium ${order.payment_Status === "Paid"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {order.payment_Status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="flex justify-end items-center gap-4 p-4">
                <button
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>Page {data?.page || currentPage} / {data?.totalPages || 1}</span>
                <button
                    onClick={() => currentPage < (data?.totalPages || 1) && setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= (data?.totalPages || 1)}
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default Revenue;
