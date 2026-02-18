import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useGetAllOrdersQuery } from "../../redux/apis/orderApi";
import { toast } from "react-toastify";

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
  //   console.log("orders", orders);

  return (
    <div className="bg-[#FFF4F8] min-h-screen p-3 sm:p-6 md:p-9">
      <h2 className="text-lg font-semibold mb-5">Orders</h2>

      <div className="bg-white rounded-2xl shadow-sm max-w-7xl mx-auto overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-[#FF007B] text-white text-left">
                <th className="py-3 px-2 sm:px-4">Customer Name</th>
                <th className="py-3 px-2 sm:px-4">Contact No</th>
                <th className="py-3 px-2 sm:px-4">Product Detail</th>
                {/* <th className="py-3 px-2 sm:px-4">Address</th> */}
                <th className="py-3 px-2 sm:px-4">Payment Status</th>
                <th className="py-3 px-2 sm:px-4">Total</th>
                {/* <th className="py-3 px-2 sm:px-4">Action</th> */}
              </tr>
            </thead>

            <tbody>
              {/* Loading Skeletons */}
              {isLoading &&
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse border-b">
                    {[...Array(7)].map((__, j) => (
                      <td key={j} className="py-3 px-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    ))}
                  </tr>
                ))}

              {/* Orders Data */}
              {!isLoading && orders.length > 0
                ? orders.map((order) => {
                    const address = order.Address
                      ? `${order.Address.homeOrFlat}, ${order.Address.areaOrLocality}, ${order.Address.pincode}`
                      : "—";

                    return (
                      <tr
                        key={order._id}
                        className="border-b last:border-none text-gray-800 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-2 sm:px-4">
                          {order.userId?.name || "—"}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          {order.userId?.contact || "—"}
                        </td>
                        <td className="py-3 px-2 sm:px-4">
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
                        {/* <td className="py-3 px-2 sm:px-4 max-w-[250px] break-words">
                                                {address}
                                            </td> */}
                        <td
                          className={`py-3 px-2 sm:px-4 font-medium ${
                            order.status === "paid" || order.payment === "Paid"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {order.status || "Pending"}
                        </td>
                        <td className="py-3 px-2 sm:px-4 font-medium">
                          ₹{order.totalAmount || 0}
                        </td>
                       
                      </tr>
                    );
                  })
                : !isLoading && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-6 text-center text-gray-500 italic"
                      >
                        No orders found
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>

          {/* <div className="flex justify-end items-center mt-4 gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="px-3 py-1">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div> */}

          {/* Pagination Controls */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-2">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{orders.length}</span>{" "}
                of <span className="font-semibold">{total}</span> Orders
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    page === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#FF007B] text-white hover:bg-[#e0006d]"
                  }`}
                >
                  Prev
                </button>

                <span className="text-sm text-gray-700">
                  Page <strong>{page}</strong> of {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    page === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#FF007B] text-white hover:bg-[#e0006d]"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
