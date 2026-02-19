import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/apis/orderApi";

const Order = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetAllOrdersQuery({ page, limit });

  const orders = orderData?.data || [];
  const totalPages = orderData?.totalPages || 1;
  const total = orderData?.total || 0;

  return (
  <div className="bg-[#FFF4F8] min-h-screen p-3 sm:p-6 md:p-9">
    <h2 className="text-lg font-semibold mb-5">Orders</h2>
<div className="max-w-7xl mx-auto p-4">

  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

    {/* ================= DESKTOP TABLE ================= */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-sm">

        <thead className="bg-[#FF007B1A] text-[#2B2B2B] uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Contact</th>
            <th className="px-6 py-4 text-left">Order</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Total</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {!isLoading && orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 transition">

              <td className="px-6 py-4 font-medium text-gray-800">
                {order.userId?.name || "—"}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {order.userId?.contact || "—"}
              </td>

              <td className="px-6 py-4">
                <Link
                  to={`/orderdetail/${order._id}`}
                  state={{ order }}
                  className="text-pink-600 font-medium hover:underline"
                >
                  View Details
                </Link>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "paid" || order.payment === "Paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </td>

              <td className="px-6 py-4 font-semibold">
                ₹{order.totalAmount || 0}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* ================= MOBILE CARD VIEW ================= */}
    <div className="md:hidden divide-y divide-gray-100">
      {!isLoading && orders.map((order) => (
        <div key={order._id} className="p-4 space-y-3">

          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">
              {order.userId?.name || "—"}
            </h3>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.status === "paid" || order.payment === "Paid"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {order.status || "Pending"}
            </span>
          </div>

          <div className="text-sm text-gray-500">
            📞 {order.userId?.contact || "—"}
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">
              ₹{order.totalAmount || 0}
            </span>

            <Link
              to={`/orderdetail/${order._id}`}
              state={{ order }}
              className="text-pink-600 text-sm font-medium hover:underline"
            >
              View Details →
            </Link>
          </div>

        </div>
      ))}
    </div>

    {/* ================= PAGINATION ================= */}
    {!isLoading && totalPages > 1 && (
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4 border-t bg-gray-50 gap-3">

        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-700"
          }`}
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-700"
          }`}
        >
          Next
        </button>

      </div>
    )}

  </div>
</div>

    {/* <div className="bg-white rounded-2xl shadow-sm max-w-7xl mx-auto">

      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse text-sm sm:text-base overflow-x-auto">

          <thead>
            <tr className="bg-[#FF007B] text-white text-left">
              <th className="py-3 px-4 whitespace-nowrap">Customer Name</th>
              <th className="py-3 px-4 whitespace-nowrap">Contact No</th>
              <th className="py-3 px-4 whitespace-nowrap">Product Detail</th>
              <th className="py-3 px-4 whitespace-nowrap">Payment Status</th>
              <th className="py-3 px-4 whitespace-nowrap">Total</th>
            </tr>
          </thead>

          <tbody>
            {isLoading &&
              [...Array(4)].map((_, i) => (
                <tr key={i} className="animate-pulse border-b">
                  {[...Array(5)].map((__, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))}

            {!isLoading && orders.length > 0
              ? orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b last:border-none text-gray-800 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      {order.userId?.name || "—"}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      {order.userId?.contact || "—"}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <Link
                        to={{
                          pathname: `/orderdetail/${order?._id}`,
                        }}
                        state={{ order }}
                        className="text-[#FF007B] font-medium hover:underline"
                      >
                        View Detail
                      </Link>
                    </td>

                    <td
                      className={`py-3 px-4 font-medium whitespace-nowrap ${
                        order.status === "paid" ||
                        order.payment === "Paid"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.status || "Pending"}
                    </td>

                    <td className="py-3 px-4 font-medium whitespace-nowrap">
                      ₹{order.totalAmount || 0}
                    </td>
                  </tr>
                ))
              : !isLoading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-6 text-center text-gray-500 italic"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="pb-3 sm:pb-4 px-3 sm:px-6 flex justify-between items-center mt-3 sm:mt-4">

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#FF007B] text-white"
            }`}
          >
            Previous
          </button>

          <p className="text-gray-500 text-sm">
            Page {page} of {totalPages}
          </p>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#FF007B] text-white"
            }`}
          >
            Next
          </button>

        </div>
      )}

    </div> */}
  </div>
);

};

export default Order;
