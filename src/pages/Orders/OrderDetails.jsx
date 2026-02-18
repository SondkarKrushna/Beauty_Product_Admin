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
    <div className="bg-[#FFF9FB] min-h-screen w-full py-8 px-5 md:px-10 font-inter">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-8 border-b border-pink-200 pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <img
            src="https://img.icons8.com/material-outlined/24/ff0080/invoice.png"
            alt="icon"
            className="mr-2"
          />
          Order Details — <span className="ml-1 text-[#FF0080]">#{order._id}</span>
        </h2>

        <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
          <button className="bg-[#FF0080] text-white px-5 py-2 rounded-lg font-medium text-sm shadow hover:opacity-90">
            View Invoice
          </button>
          <button className="border border-[#FF0080] text-[#FF0080] px-5 py-2 rounded-lg font-medium text-sm hover:bg-[#FF0080] hover:text-white transition">
            Download Invoice
          </button>
        </div>
      </div>

      {/* CUSTOMER DETAILS CARD */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-pink-100">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <FaUser className="text-[#FF0080] text-3xl" />
            <div>
              <h3 className="font-semibold text-gray-800">
                {order?.userId?.name || "Customer"}
              </h3>
              <p className="text-sm text-gray-600">
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

              <p className="text-sm">
                {order?.Address ? (
                  <>
                    {/* Name */}
                    {order?.Address?.Name && (
                      <>
                        {order.Address.Name}
                        <br />
                      </>
                    )}

                    {/* Home / Flat */}
                    {order?.Address?.homeOrFlat && (
                      <>
                        {order.Address.homeOrFlat}
                        <br />
                      </>
                    )}

                    {/* Area / Locality */}
                    {order?.Address?.areaOrLocality && (
                      <>
                        {order.Address.areaOrLocality}
                        <br />
                      </>
                    )}

                    {/* Pincode */}
                    {order?.Address?.pincode && (
                      <>
                        {order.Address.pincode}
                        <br />
                      </>
                    )}

                    {/* Landmark */}
                    {order?.Address?.landmark && (
                      <>{order.Address.landmark}</>
                    )}
                  </>
                ) : (
                  <span className="text-gray-500 italic">No address available</span>
                )}
              </p>
            </div>

          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{order?.totalAmount || 0}
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="bg-white border border-pink-100 rounded-2xl shadow-sm overflow-hidden mb-8">
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
            {order?.products?.length > 0 ? (
              order.products.map((item, i) => {
                const p = item?.productData || {};
                return (
                  <tr key={i} className="border-t border-pink-100 hover:bg-pink-50/50">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3 flex items-center space-x-3">
                      <img
                        src={p?.product_images?.[0]}
                        alt={p?.product_name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                      <span className="font-medium">{p?.product_name || "N/A"}</span>
                    </td>
                    <td className="p-3">{item?.quantity}</td>
                    <td className="p-3">₹{p?.price_online || "N/A"}</td>
                    <td className="p-3 font-semibold text-gray-900">
                      ₹
                      {p?.price_online
                        ? p.price_online * item.quantity
                        : "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500">
                  No products found in this order
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white border border-pink-100 rounded-2xl shadow-sm p-5 flex flex-wrap justify-between items-center">
        <div>
          <p className="font-semibold text-gray-700 text-lg">
            Grand Total:{" "}
            <span className="text-black">₹{order?.totalAmount || 0}</span>
          </p>
        </div>
        <div className="text-right text-sm space-y-1 text-gray-600">
          <p>Order Date: {formattedDate}</p>
          <p>
            Status:{" "}
            <span
              className={`font-semibold ${order?.status === "delivered"
                ? "text-green-600"
                : order?.status === "pending"
                  ? "text-yellow-600"
                  : "text-gray-700"
                }`}
            >
              {order?.status || "N/A"}
            </span>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gradient-to-r from-[#ffe1f0] to-[#fff6fa] rounded-2xl p-5 mt-6 flex flex-wrap justify-between items-center shadow-sm">
        <div>
          <p className="text-gray-800 font-semibold">Order Status</p>
          <p
            className={`text-lg font-bold ${order?.status === "delivered"
              ? "text-green-600"
              : order?.status === "pending"
                ? "text-yellow-600"
                : "text-gray-700"
              }`}
          >
            {order?.status || "N/A"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-800 font-semibold">Payment Mode</p>
          <p className="text-[#FF0080] text-lg font-bold">
            {order?.paymentMode || "Online"}
          </p>
        </div>
      </div>
    </div>
  );
}
