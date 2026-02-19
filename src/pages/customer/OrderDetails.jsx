import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Bill from "../invoces/Invoicebill";

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
    paymentMode,
  } = order;

  return (
    <div className="ml-0 sm:ml-60 rounded-xl min-h-screen bg-white shadow-lg p-4 sm:p-6 font-lato">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-5">
        <div className="font-medium text-black text-sm sm:text-base">
          🧾 Order Details -{" "}
          <span className="font-medium">#{_id || "N/A"}</span>
        </div>
      </div>

      {/* ================= CUSTOMER INFO ================= */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-[#FFF3F6] rounded-sm p-3 gap-4 mb-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Icon icon="mdi:users" className="text-[#FF007B]" width="45" height="45" />
          <div>
            <h2 className="text-[15px] sm:text-[18px] font-medium break-words">
              {customer?.name || "N/A"}
            </h2>
            <p className="text-[#00000080] text-[12px] sm:text-[14px] break-all">
              Cust ID : {customer?._id || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-[12px] sm:text-[14px]">
          <div className="flex items-center gap-2">
            <Icon icon="material-symbols:call" width="20" height="20" className="text-[#FF007B]" />
            <span className="break-all">
              {customer?.contact || "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Icon icon="tdesign:location-filled" width="20" height="20" className="text-[#FF007B]" />
            <span className="leading-tight break-words">
              {order?.Address?.homeOrFlat}, {order?.Address?.areaOrLocality}
              <br />
              {order?.Address?.pincode}
            </span>
          </div>
        </div>

        <div className="lg:mr-16">
          <p className="text-[13px] sm:text-[16px] font-medium">
            Total Items ({items?.length || 0})
          </p>
          <p className="text-xl sm:text-3xl font-medium text-[#059500]">
            ₹{totalAmount || 0}
          </p>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white shadow-[0_0_4px_0_rgba(255,0,123,0.3)] rounded-lg px-2 pt-3 pb-2">

        <div className="grid grid-cols-6 gap-3 pb-2 border-b bg-[#FF007B1A]/10 p-3 text-sm font-semibold">
          <div className="ml-4">Image</div>
          <div>Category</div>
          <div>Product</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Total</div>
        </div>

        <div className="bg-[#FFF3F6] rounded-md mb-4">
          {items?.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-6 gap-3 items-center py-2 border-b border-gray-200 text-sm"
              >
                <div>
                  <img
                    className="w-10 h-8 object-cover ml-7 rounded border"
                    src={item?.product?.image || "/placeholder.png"}
                    alt={item?.product?.name || ""}
                  />
                </div>

                <div>{item?.product?.category || "N/A"}</div>
                <div>{item?.product?.name || "N/A"}</div>
                <div className="ml-6">{item?.quantity || 0}</div>
                <div>₹{item?.price || 0}</div>
                <div>
                  ₹{(item?.price || 0) * (item?.quantity || 0)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No products found.
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">

        {items?.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className="bg-[#FFF3F6] rounded-lg p-4 shadow-sm"
            >
              <div className="flex gap-3 items-center mb-3">
                <img
                  className="w-14 h-12 object-cover rounded border"
                  src={item?.product?.image || "/placeholder.png"}
                  alt={item?.product?.name || ""}
                />

                <div>
                  <p className="font-semibold text-sm">
                    {item?.product?.name || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item?.product?.category || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span>Quantity</span>
                <span>{item?.quantity || 0}</span>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span>Price</span>
                <span>₹{item?.price || 0}</span>
              </div>

              <div className="flex justify-between font-semibold text-sm text-green-600">
                <span>Total</span>
                <span>
                  ₹{(item?.price || 0) * (item?.quantity || 0)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 text-sm">
            No products found.
          </div>
        )}
      </div>

      {/* ================= GRAND TOTAL ================= */}
      <div className="flex flex-col md:flex-row mt-6 justify-between items-center gap-3">
        <div className="text-lg sm:text-xl font-medium">
          Grand Total{" "}
          <span className="font-medium text-black">
            ₹{totalAmount || 0}
          </span>
        </div>
      </div>

      {/* ================= STATUS + PAYMENT ================= */}
      <div
        className="flex flex-col md:flex-row justify-between items-center rounded-lg bg-white px-4 py-3 gap-4 mt-4"
        style={{ border: "1.11px solid #FF007B30" }}
      >
        <div>
          <div className="text-sm sm:text-base">
            Order Status
          </div>
          <div className="text-[#059500] font-bold text-lg capitalize">
            {order?.status || "Pending"}
          </div>
        </div>

        <div className="md:text-right">
          <div className="text-sm sm:text-base">
            Payment Mode
          </div>
          <div className="text-[#059500] font-medium text-lg">
            {paymentMode || "Online"} · {order?.payment_Status || "Unpaid"}
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrderDetails;
