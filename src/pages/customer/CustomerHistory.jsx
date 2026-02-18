import React, { useState } from "react";
import { Icon } from "@iconify/react";
import OrderDetails from "./OrderDetails";

const CustomerHistory = () => {
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    return (
        <div className="min-h-screen bg-[#FFF3F6] overflow-hidden px-4 sm:px-6 md:px-8 py-4 sm:py-6 font-Outfit relative">

            {/* ---------------- Overlay ---------------- */}
            {showOrderDetails && (
                <div
                    className="fixed inset-0 bg-black/40 z-[999] overflow-y-auto flex justify-end items-start"
                    onClick={() => {
                        console.log("Overlay clicked");
                        setShowOrderDetails(false);
                    }}
                >

                    <div
                        className="relative h-auto w-[87%] mt-0 mr-[18%]"
                        onClick={(e) => {
                            console.log("Modal content clicked");
                            e.stopPropagation();
                        }}
                    >

                        <OrderDetails />
                    </div>
                </div>

            )}



            {/* ---------------- Main Content ---------------- */}
            <h1 className="text-[18px] sm:text-[20px] font-semibold text-black mb-3 sm:mb-4">
                Customer Management
            </h1>

            <div className="bg-white min-h-screen rounded-[13px] shadow-[0_0_4px_0_rgba(255,0,123,0.3)] p-4 sm:p-6 w-full max-w-[1139px] mx-auto">
                {/* Profile Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-[#FFF3F6] rounded-sm p-3 gap-4 mb-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Icon icon="mdi:users" className="text-[#FF007B]" width="45" height="45" />
                        <div>
                            <h2 className="text-[16px] sm:text-[18px] font-medium text-[#000]">Saniya Sharma</h2>
                            <p className="text-[#00000080] text-[13px] sm:text-[14px]">Cust ID : 1234</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-[#000] text-[13px] sm:text-[14px]">
                        <div className="flex items-center gap-2">
                            <Icon icon="material-symbols:call" width="20" height="20" className="text-[#FF007B]" />
                            <span className="font-medium">7985784744</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Icon icon="tdesign:location-filled" width="20" height="20" className="text-[#FF007B]" />
                            <span className="font-medium leading-tight">
                                Golden City Center, Chhatrapati<br />
                                Sambhajinagar 431001
                            </span>
                        </div>
                    </div>

                    <div className="lg:mr-16">
                        <p className="text-[14px] sm:text-[16px] font-medium text-[#000]">Total Purchases (10)</p>
                        <p className="text-2xl sm:text-3xl font-medium text-[#059500] leading-tight">₹799</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 sm:gap-6 mb-4">
                    <button className="text-[#FF007B] text-xs sm:text-sm font-medium border-b-2 border-[#FF007B]">Delivered</button>
                    <button className="text-[#00000080] text-xs sm:text-sm font-medium">Ongoing</button>
                </div>

                {/* Table */}
                <div className="overflow-hidden  w-full">
                    <div className="min-w-[800px] bg-[#FFD7EA] grid grid-cols-8 py-2 px-4 text-[13px] sm:text-[14px] font-semibold text-[#000]">
                        <div className="ml-4 text-left">Order ID</div>
                        <div className="ml-3 text-left">Items</div>
                        <div className="ml-3 text-left">Products</div>
                        <div className="ml-4 text-left">Date</div>
                        <div className="ml-3 text-left">Amount</div>
                        <div className="ml-3 text-left">Payment</div>
                        <div className="ml-3 text-left">Status</div>
                        <div className="ml-2 text-left">Action</div>
                    </div>

                    <div className="min-w-[800px] overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-8 py-2 px-4 bg-[#FFD7EA24] border-t border-[#FFD7EA]  text-[#000] text-left text-xs">
                            <div className="ml-4 font-semibold">#234</div>
                            <div className="ml-3 font-semibold">1</div>
                            <div className="ml-3 font-semibold">
                                <button
                                    onClick={() => setShowOrderDetails(true)}
                                    className="text-[#FF007B] underline"
                                >
                                    View
                                </button>
                            </div>
                            <div>18-09-2025</div>
                            <div className="ml-3 font-semibold text-[#00A000]">₹799</div>
                            <div className="ml-3 font-semibold text-[#059500]">UPI</div>
                            <div className="ml-3 font-semibold text-[#00A000]">Paid</div>
                            <div className="ml-2 text-right">
                                <Icon icon="material-symbols:delete" className="text-[#FF0000] hover:text-red-600 cursor-pointer" width="20" height="20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerHistory;
