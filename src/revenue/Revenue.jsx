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
        limit: 10,
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

    const totalRevenue = orders.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
    );

    const today = new Date().toISOString().split("T")[0];
    const todaysOrders = orders.filter((order) =>
        order.createdAt?.startsWith(today)
    );
    const todaysRevenue = todaysOrders.reduce(
        (sum, o) => sum + (o.totalAmount || 0),
        0
    );

    const visibleOrders = activeTab === "today" ? todaysOrders : orders;

    const filteredOrders = visibleOrders.filter((o) =>
        o.userId?.name?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-pink-50 min-h-screen p-4 sm:p-6 font-sans">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h2>

            {/* ================= CARDS ================= */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">

                {/* TODAY CARD */}
                <div
                    onClick={() => handleTabChange("today")}
                    className={`w-full sm:w-[345px] h-[103px] rounded-[10px] shadow-lg p-4 flex items-center gap-4 cursor-pointer transition
          ${activeTab === "today" ? "ring-2 ring-[#FF007B]" : ""}`}
                    style={{
                        backgroundColor:
                            activeTab === "today" ? "#FF007B" : "#FFD1E8",
                        boxShadow: "0px 4px 15.5px -1px rgba(255, 0, 123, 0.2)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
                        <Icon icon="healthicons:money-bag" className="text-2xl" color="#FF007B" />
                    </div>
                    <div>
                        <p className={`text-sm font-medium ${activeTab === "today" ? "text-white" : "text-black"}`}>
                            Today's Revenue
                        </p>
                        <p className={`text-2xl sm:text-3xl font-medium ${activeTab === "today" ? "text-white" : "text-black"}`}>
                            ₹{todaysRevenue}
                        </p>
                    </div>
                </div>

                {/* TOTAL CARD */}
                <div
                    onClick={() => handleTabChange("total")}
                    className={`w-full sm:w-[345px] h-[103px] rounded-[10px] shadow-lg p-4 flex items-center gap-4 cursor-pointer transition
          ${activeTab === "total" ? "ring-2 ring-[#FF007B]" : ""}`}
                    style={{
                        backgroundColor:
                            activeTab === "total" ? "#FF007B" : "#FFD1E8",
                        boxShadow: "0px 4px 15.5px -1px rgba(255, 0, 123, 0.2)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
                        <Icon icon="healthicons:money-bag" className="text-2xl" color="#FF007B" />
                    </div>
                    <div>
                        <p className={`text-sm font-medium ${activeTab === "total" ? "text-white" : "text-black"}`}>
                            Total Revenue
                        </p>
                        <p className={`text-2xl sm:text-3xl font-medium ${activeTab === "total" ? "text-white" : "text-black"}`}>
                            ₹{totalRevenue}
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= TRANSACTIONS ================= */}
            <div
                className="mt-8 bg-white rounded-[12px] border border-[#FFD7EA]"
                style={{ boxShadow: "0px 0px 4px 0px #FF007B4D" }}
            >
                <div className="p-4">

                    <div className="pb-3 flex flex-col sm:flex-row justify-between gap-3">
                        <h3 className="text-md font-semibold">
                            {activeTab === "today"
                                ? "Today's Transactions"
                                : "All Transactions"}
                        </h3>

                        <input
                            type="text"
                            placeholder="Search customer..."
                            className="border px-3 py-1 rounded-md text-sm w-full sm:w-64"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    {/* ================= DESKTOP TABLE ================= */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#FF007B1A]">
                                    <th className="py-3 pl-8">Customer</th>
                                    <th className="py-3">Date / Time</th>
                                    <th className="py-3">Amount</th>
                                    <th className="py-3">Payment</th>
                                    <th className="py-3">Status</th>
                                </tr>
                            </thead>

                            <tbody className="bg-[#FFD7EA24]">
                                {filteredOrders.map((order) => {
                                    const date = new Date(order.createdAt);
                                    return (
                                        <tr key={order._id}>
                                            <td className="py-3 pl-8 text-sm">
                                                {order.userId?.name || "Unknown"}
                                            </td>
                                            <td className="py-3 text-sm whitespace-nowrap">
                                                {date.toLocaleDateString("en-IN")}
                                                <br />
                                                {date.toLocaleTimeString("en-IN")}
                                            </td>
                                            <td className="py-3 text-sm">
                                                ₹{order.totalAmount}
                                            </td>
                                            <td className="py-3 text-sm">
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

                    {/* ================= MOBILE CARD VIEW ================= */}
                    <div className="md:hidden space-y-4">
                        {filteredOrders.map((order) => {
                            const date = new Date(order.createdAt);
                            return (
                                <div
                                    key={order._id}
                                    className="bg-[#FFD7EA24] p-4 rounded-lg shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-sm">
                                            {order.userId?.name || "Unknown"}
                                        </h4>
                                        <span
                                            className={`text-xs font-medium ${order.payment_Status === "Paid"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {order.payment_Status}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-600 mb-1">
                                        🗓 {date.toLocaleDateString("en-IN")} ·{" "}
                                        {date.toLocaleTimeString("en-IN")}
                                    </div>

                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Amount</span>
                                        <span className="font-semibold">
                                            ₹{order.totalAmount}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span>Payment</span>
                                        <span>{order.order_type}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* ================= PAGINATION ================= */}
            {(data?.totalPages || 1) > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4 border-t bg-gray-50 gap-3">

                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition ${currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-pink-600 text-white hover:bg-pink-700"
                            }`}
                    >
                        Previous
                    </button>

                    <span className="text-sm text-gray-500">
                        Page {data?.page || currentPage} of {data?.totalPages || 1}
                    </span>

                    <button
                        disabled={currentPage >= (data?.totalPages || 1)}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition ${currentPage >= (data?.totalPages || 1)
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-pink-600 text-white hover:bg-pink-700"
                            }`}
                    >
                        Next
                    </button>

                </div>
            )}

        </div>
    );
};

export default Revenue;
