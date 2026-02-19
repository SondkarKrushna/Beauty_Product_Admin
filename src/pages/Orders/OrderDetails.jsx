import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaUser, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useGetOrderDetailsQuery } from "../../redux/apis/orderApi";

const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

export default function OrderDetails() {
  const { orderId } = useParams();
  const { data, isLoading, isError } = useGetOrderDetailsQuery(orderId);
  const location = useLocation();
  const { order } = location.state || {};
  const productList = useMemo(() => data?.data1 || [], [data]);

  const formattedDate = useMemo(() => {
    if (!order?.createdAt) return "";
    return new Date(order.createdAt).toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [order?.createdAt]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <SkeletonBox className="h-8 w-1/3" />
        <SkeletonBox className="h-24 w-full" />
        <SkeletonBox className="h-48 w-full" />
      </div>
    );
  }

  if (isError || !order?._id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 font-medium">
          ❌ Failed to load order details. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9FB] min-h-screen w-full py-6 px-4 sm:px-6 md:px-10 font-inter">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-pink-200 pb-4 gap-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center flex-wrap">
          <img
            src="https://img.icons8.com/material-outlined/24/ff0080/invoice.png"
            alt="icon"
            className="mr-2"
          />
          Order Details —
          <span className="ml-1 text-[#FF0080] break-all">
            #{order._id}
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button className="w-full sm:w-auto bg-[#FF0080] text-white px-5 py-2 rounded-lg font-medium text-sm shadow hover:opacity-90">
            View Invoice
          </button>
          <button className="w-full sm:w-auto border border-[#FF0080] text-[#FF0080] px-5 py-2 rounded-lg font-medium text-sm hover:bg-[#FF0080] hover:text-white transition">
            Download Invoice
          </button>
        </div>
      </div>

      {/* CUSTOMER DETAILS CARD */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6 border border-pink-100">
        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div className="flex items-center space-x-3">
            <FaUser className="text-[#FF0080] text-3xl" />
            <div>
              <h3 className="font-semibold text-gray-800">
                {order?.userId?.name || "Customer"}
              </h3>
              <p className="text-sm text-gray-600 break-all">
                Cust ID: {order?.userId?._id || "N/A"}
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-700">
            <div className="flex items-center mb-1">
              <FaPhoneAlt className="text-[#FF0080] mr-2" />
              {order?.userId?.contact || "N/A"}
            </div>

            <div className="flex items-start mb-1">
              <FaMapMarkerAlt className="text-[#FF0080] mr-2 mt-1" />
              <p className="break-words">
                {order?.Address?.homeOrFlat}
                <br />
                {order?.Address?.areaOrLocality}
                <br />
                {order?.Address?.pincode}
              </p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl md:text-3xl font-bold text-green-600">
              ₹{order?.totalAmount || 0}
            </p>
          </div>

        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white border border-pink-100 rounded-2xl shadow-sm overflow-hidden mb-8">
        <table className="min-w-full text-sm text-gray-800 border-collapse">
          <thead className="bg-pink-50 text-left">
            <tr>
              <th className="p-3 font-semibold">#</th>
              <th className="p-3 font-semibold">Product</th>
              <th className="p-3 font-semibold">Qty</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {order?.products?.map((item, i) => {
              const p = item?.productData || {};
              return (
                <tr key={i} className="border-t border-pink-100 hover:bg-pink-50/50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 flex items-center space-x-3">
                    <img
                      src={p?.product_images?.[0]}
                      alt=""
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                    <span className="font-medium">
                      {p?.product_name}
                    </span>
                  </td>
                  <td className="p-3">{item?.quantity}</td>
                  <td className="p-3">₹{p?.price_online}</td>
                  <td className="p-3 font-semibold">
                    ₹{p?.price_online * item.quantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4 mb-8">
        {order?.products?.map((item, i) => {
          const p = item?.productData || {};
          return (
            <div
              key={i}
              className="bg-white border border-pink-100 rounded-xl p-4 shadow-sm"
            >
              <div className="flex gap-3 items-center mb-3">
                <img
                  src={p?.product_images?.[0]}
                  alt=""
                  className="w-14 h-14 object-cover rounded-md border"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {p?.product_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item?.quantity}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span>Price</span>
                <span>₹{p?.price_online}</span>
              </div>

              <div className="flex justify-between font-semibold text-sm text-gray-900">
                <span>Total</span>
                <span>
                  ₹{p?.price_online * item.quantity}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white border border-pink-100 rounded-2xl shadow-sm p-5 flex flex-col md:flex-row justify-between gap-4">
        <p className="font-semibold text-gray-700 text-lg">
          Grand Total:
          <span className="text-black ml-1">
            ₹{order?.totalAmount || 0}
          </span>
        </p>

        <div className="text-sm space-y-1 text-gray-600">
          <p>Order Date: {formattedDate}</p>
          <p>
            Status:
            <span className="ml-1 font-semibold">
              {order?.status}
            </span>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gradient-to-r from-[#ffe1f0] to-[#fff6fa] rounded-2xl p-5 mt-6 flex flex-col md:flex-row justify-between gap-4 shadow-sm">
        <div>
          <p className="text-gray-800 font-semibold">
            Order Status
          </p>
          <p className="text-lg font-bold">
            {order?.status}
          </p>
        </div>

        <div className="text-left md:text-right">
          <p className="text-gray-800 font-semibold">
            Payment Mode
          </p>
          <p className="text-[#FF0080] text-lg font-bold">
            {order?.paymentMode || "Online"}
          </p>
        </div>
      </div>

    </div>
  );
}
