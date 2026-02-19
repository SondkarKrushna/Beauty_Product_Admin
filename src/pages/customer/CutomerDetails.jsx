import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { FaTrash } from "react-icons/fa";
import { useGetCustomerOrderDetailsQuery } from "../../redux/apis/customerApi";
import OrderDetails from "./OrderDetails";

const CustomerDetails = () => {
    const { customerId } = useParams();
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // 🔹 Fetch API
    const { data, isLoading, isError } = useGetCustomerOrderDetailsQuery(customerId);

    // 🔹 Derived Data (Memoized for performance)
    const customer = useMemo(() => data?.data || {}, [data]);
    const orders = useMemo(() => data?.orders || [], [data]);
    const products = useMemo(() => data?.products || [], [data]);

    if (isError) {
        return <p className="text-center text-red-600 mt-6">Failed to load customer details.</p>;
    }

    return (
        <div className="min-h-screen bg-[#FFF3F6] overflow-hidden px-4 sm:px-6 md:px-8 py-4 sm:py-6 font-Outfit relative">

            {/* ---------------- Overlay Modal ---------------- */}
            {showOrderDetails && selectedOrder && (
                <div
                    className="fixed inset-0 bg-black/40 z-[999] overflow-y-auto flex justify-end items-start"
                    onClick={() => setShowOrderDetails(false)}
                >
                    <div
                        className="relative h-auto w-[87%] mt-0 mr-[18%]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <OrderDetails
                            order={selectedOrder}
                            customer={customer}
                            onClose={() => setShowOrderDetails(false)}
                        />
                    </div>
                </div>
            )}

            {/* ---------------- Header ---------------- */}
            <h1 className="text-[18px] sm:text-[20px] font-semibold text-black mb-3 sm:mb-4">
                Customer Management
            </h1>

            {/* ---------------- Main Card ---------------- */}
            <div className="bg-white rounded-[13px] shadow-[0_0_4px_0_rgba(255,0,123,0.3)] p-4 sm:p-6 w-full max-w-[1139px] mx-auto">
                {/* Skeleton Loading */}
                {isLoading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-pink-100 rounded w-1/3"></div>
                        <div className="h-4 bg-pink-100 rounded w-1/2"></div>
                        <div className="h-80 bg-pink-100 rounded w-full"></div>
                    </div>
                ) : (
                    <>
                        {/* Profile Section */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-[#FFF3F6] rounded-sm p-3 gap-4 mb-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <Icon icon="mdi:users" className="text-[#FF007B]" width="45" height="45" />
                                <div>
                                    <h2 className="text-[16px] sm:text-[18px] font-medium text-[#000]">
                                        {customer.name || "—"}
                                    </h2>
                                    <p className="text-[#00000080] text-[13px] sm:text-[14px]">
                                        Cust ID : {customer._id?.slice(-6).toUpperCase() || "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 text-[#000] text-[13px] sm:text-[14px]">
                                <div className="flex items-center gap-2">
                                    <Icon icon="material-symbols:call" width="20" height="20" className="text-[#FF007B]" />
                                    <span className="font-medium">{customer.contact || "—"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon="tdesign:location-filled" width="20" height="20" className="text-[#FF007B]" />
                                    <span className="font-medium leading-tight">
                                        {orders[0]?.Address?.homeOrFlat || "—"}, {orders[0]?.Address?.pincode || ""}
                                    </span>
                                </div>
                            </div>

                            <div className="lg:mr-16 text-right">
                                <p className="text-[14px] sm:text-[16px] font-medium text-[#000]">
                                    Total Purchases ({orders.length})
                                </p>
                                <p className="text-2xl sm:text-3xl font-medium text-[#059500] leading-tight">
                                    ₹{orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)}
                                </p>
                            </div>
                        </div>

                        {/* ✅ Added Horizontal Scroll Wrapper */}
                        <div className="w-full overflow-x-auto">

                            {/* Table Header */}
                            <div className="min-w-[800px] bg-[#FFD7EA] grid grid-cols-7 py-2 px-4 text-[13px] sm:text-[14px] font-semibold text-[#000]">
                                <div className="ml-4 text-left">Order ID</div>
                                <div className="ml-3 text-left">Items</div>
                                <div className="ml-3 text-left">Products</div>
                                <div className="ml-4 text-left">Date</div>
                                <div className="ml-3 text-left">Amount</div>
                                <div className="ml-3 text-left">Payment</div>
                                <div className="ml-3 text-left">Status</div>
                            </div>

                            {/* Orders List */}
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <div
                                        key={order._id}
                                        className="min-w-[800px] grid grid-cols-7 py-2 px-4 bg-[#FFD7EA24] border-t border-[#FFD7EA] text-[#000] text-xs"
                                    >
                                        <div className="ml-4 font-semibold">#{order._id.slice(-4)}</div>
                                        <div className="ml-3 font-semibold">{order.products.length}</div>
                                        <div className="ml-3 font-semibold">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);

                                                    const orderItems = order.products.map((p) => {
                                                        let matchedProduct = null;
                                                        let matchedCategory = "N/A";

                                                        data?.products?.forEach((cat) => {
                                                            const prod = cat.product_array.find(
                                                                (item) => item._id === p.productId
                                                            );

                                                            if (prod) {
                                                                matchedProduct = prod;
                                                                matchedCategory = cat.product_catagory;
                                                            }
                                                        });

                                                        return {
                                                            _id: p._id,
                                                            quantity: p.quantity,
                                                            price: matchedProduct?.price_online || 0,
                                                            product: {
                                                                name: matchedProduct?.product_name || "N/A",
                                                                image:
                                                                    matchedProduct?.product_images?.[0] || "/placeholder.png",
                                                                category: matchedCategory,
                                                            },
                                                        };
                                                    });

                                                    setSelectedOrder({
                                                        ...order,
                                                        items: orderItems,
                                                    });

                                                    setShowOrderDetails(true);
                                                }}
                                                className="text-[#FF007B] underline"
                                            >
                                                View
                                            </button>
                                        </div>
                                        <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                                        <div className="ml-3 font-semibold text-[#00A000]">₹{order.totalAmount}</div>
                                        <div className="ml-3 font-semibold text-[#059500]">{order.order_type}</div>
                                        <div className="ml-3 font-semibold text-[#00A000] capitalize">{order.status}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-6 text-gray-500 italic">No orders found</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CustomerDetails;
