import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Bill from '../invoces/Invoicebill';

const OrderDetails = ({ order, customer, onClose }) => {
    const [showInvoice, setShowInvoice] = useState(false);
    if (showInvoice) {
        return (
            <Bill invoiceId={order?._id} onClose={() => setShowInvoice(false)} />
        );
    }

    if (!order || !customer) return null;
    const {
        _id,
        items = [],
        totalAmount,
        subTotal,
        taxAmount,
        deliveryCharge,
        paymentMode,
        paymentStatus,
        orderStatus,
    } = order;
    console.log("items",items);
    

    
    return (
        <div className="ml-60 rounded-xl h-screen bg-white shadow-lg p-6 font-lato">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div className="font-medium text-black font-outfit">
                    🧾 Order Details -{" "}
                    <span className="font-outfit font-medium">#{_id || "N/A"}</span>
                </div>

                {/* <div className="space-x-2 flex">
                    <button
                        onClick={() => setShowInvoice(true)}
                        className="bg-[#FF007B] rounded-[7.66px] text-white flex items-center justify-center font-outfit w-48 h-10 p-4 hover:bg-[#e6006f] transition"
                    >
                        View Invoice
                    </button>

                    <button className="bg-[#FF007B] rounded-[7.66px] text-white flex items-center justify-center font-outfit w-48 h-10 p-4 hover:bg-[#e6006f] transition">
                        Download Invoice
                    </button>
                </div> */}
            </div>

            {/* Customer Info */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-[#FFF3F6] rounded-sm p-3 gap-4 mb-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <Icon icon="mdi:users" className="text-[#FF007B]" width="45" height="45" />
                    <div>
                        <h2 className="text-[16px] sm:text-[18px] font-medium text-[#000]">
                            {customer?.name || "N/A"}
                        </h2>
                        <p className="text-[#00000080] text-[13px] sm:text-[14px]">
                            Cust ID : {customer?._id || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-[#000] text-[13px] sm:text-[14px]">
                    <div className="flex items-center gap-2">
                        <Icon icon="material-symbols:call" width="20" height="20" className="text-[#FF007B]" />
                        <span className="font-outfit">{customer?.contact || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon icon="tdesign:location-filled" width="20" height="20" className="text-[#FF007B]" />
                        <span className="font-outfit leading-tight">
                            {order?.Address?.homeOrFlat}, {order?.Address?.areaOrLocality}
                            <br />
                            {order?.Address?.pincode}
                        </span>
                    </div>
                </div>

                <div className="lg:mr-16">
                    <p className="text-[14px] sm:text-[16px] font-medium text-[#000]">
                        Total Purchases ({items?.length || 0})
                    </p>
                    <p className="text-2xl sm:text-3xl font-medium text-[#059500] leading-tight">
                        ₹{totalAmount || 0}
                    </p>
                </div>
            </div>

            {/* Order Table */}
            <div className="bg-white shadow-[0_0_4px_0_rgba(255,0,123,0.3)] h-[41%] rounded-lg px-2 pt-3 pb-2">
                <div className="grid grid-cols-6 gap-3 pb-2 border-b bg-[#FF007B1A]/10 p-3 text-gray-700 font-semibold text-sm">
                    <div className="col-span-1 ml-4 font-semibold text-[13px] font-Outfit text-[#000000]">Image</div>
                    <div className="font-semibold text-[13px] font-Outfit text-[#000000]">Category</div>
                    <div className="font-semibold text-[13px] font-Outfit text-[#000000]">Product</div>
                    <div className="font-semibold text-[13px] font-Outfit text-[#000000]">Quantity</div>
                    <div className="font-semibold text-[13px] font-Outfit text-[#000000]">Price</div>
                    <div className="font-semibold text-[13px] font-Outfit text-[#000000]">Total</div>
                </div>

                <div className="bg-[#FFF3F6] h-[78%] rounded-md mb-4 overflow-y-auto">
                    {items?.length > 0 ? (
                        items.map((item) => (
                            <div key={item._id} className="grid grid-cols-6 gap-3 items-center py-2 border-b border-gray-200">
                                <div className="col-span-1">
                                    <img
                                        className="w-[36.47px] h-[32.05px] object-cover ml-7 rounded-[2.21px] border"
                                        src={item?.product?.image || "/placeholder.png"}
                                        alt={item?.product?.name || ""}
                                    />
                                </div>
                                <div className="text-[12px] font-Outfit text-[#000000]">
                                    {item?.product?.category|| "N/A"}
                                </div>
                                <div className="text-[12px] font-Outfit text-[#000000]">
                                    {item?.product?.name || "N/A"}
                                </div>
                                <div className="ml-6 text-[13px] font-Outfit text-[#000000]">
                                    {item?.quantity || 0}
                                </div>
                                <div className="text-[13px] font-Outfit text-[#000000]">
                                    ₹{item?.price || 0}
                                </div>
                                <div className="text-[13px] font-Outfit text-[#000000]">
                                    ₹{(item?.price || 0) * (item?.quantity || 0)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-500 text-sm">No products found.</div>
                    )}
                </div>
            </div>

            {/* Grand Total / Breakdown */}
            <div className="flex flex-col md:flex-row mt-4 justify-between items-center md:items-start gap-3 md:gap-6">
                <div className="text-xl font-Outfit font-medium text-gray-900">
                    Grand Total{" "}
                    <span className="font-Outfit font-medium text-black">₹{totalAmount || 0}</span>
                </div>
                {/* <div className="text-sm text-[#00000080] mb-5 space-y-1 text-right">
                    <div>Subtotal: ₹{subTotal || 0}</div>
                    <div>Taxes: ₹{taxAmount || 0}</div>
                    <div>Delivery Charges: ₹{deliveryCharge || 0}</div>
                </div> */}
            </div>

            {/* Order Status and Payment */}
            <div
                className="flex flex-col md:flex-row justify-between items-center rounded-lg bg-white px-4 py-2  gap-4 mt-4"
                style={{ border: "1.11px solid #FF007B30" }}
            >
                <div>
                    <div className="text-gray-800 font-Outfit font-Regular">Order Status</div>
                    <div className="text-[#059500] font-bold text-lg">
                        {order?.status || "Pending"}
                    </div>
                </div>
                <div className="md:text-right">
                    <div className="text-gray-800 font-Outfit font-Regular">Payment Mode</div>
                    <div className="text-[#059500] font-Outfit font-Medium text-lg">
                        {paymentMode || "Online"} · {order?.payment_Status || "Unpaid"}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrderDetails;

