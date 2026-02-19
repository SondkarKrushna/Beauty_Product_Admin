import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetAllSaleQuery } from "../../redux/apis/createSaleApi";

const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-[#F7DCE7]">
    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16" /></td>
  </tr>
);

export default function FlashSale() {
  const { data, isLoading, isError } = useGetAllSaleQuery();
  const flashSales = useMemo(() => data?.data || [], [data]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 font-semibold">
          ❌ Failed to load flash sales.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-9 bg-[#FFF7FA] min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="font-semibold text-2xl">
          Flash Sale Management
        </h2>

        <Link
          to="../addflashsale"
          className="w-full sm:w-auto text-center bg-[#FF2E8B] text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
        >
          + Add Flash Sale
        </Link>
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm">
        <h3 className="font-semibold text-[15px] text-[#0E0E0E] mb-3">
          Existing Flash Sale
        </h3>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-[#FFE3EE] text-[#0E0E0E]">
                <th className="py-3 px-6 font-semibold">Sale Name</th>
                <th className="py-3 px-6 font-semibold">Start Time</th>
                <th className="py-3 px-6 font-semibold">End Time</th>
                <th className="py-3 px-6 font-semibold">Products</th>
                <th className="py-3 px-6 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="bg-[#FFE9F2]">
              {flashSales.length > 0 ? (
                flashSales.map((sale) => (
                  <tr
                    key={sale._id}
                    className="border-b border-[#F7DCE7] hover:bg-[#FFDDEE] transition"
                  >
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <img
                        src={sale.flash_sale_image}
                        alt={sale.flash_sale}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      {sale.flash_sale}
                    </td>

                    <td className="px-6 py-4">
                      {formatDate(sale.flash_sale_start_date)}{" "}
                      {sale.flash_sale_start_time}
                    </td>

                    <td className="px-6 py-4">
                      {formatDate(sale.flash_sale_end_date)}{" "}
                      {sale.flash_sale_end_time}
                    </td>

                    <td className="px-6 py-4">
                      {sale.flash_sale_products?.length || 0}
                    </td>

                    <td className="px-6 py-4">
                      {sale.flash_saleActive ? (
                        <span className="text-[#00A651] font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="text-[#FF2E8B] font-medium">
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No flash sales found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARD VIEW ================= */}
        <div className="md:hidden space-y-4">
          {flashSales.length > 0 ? (
            flashSales.map((sale) => (
              <div
                key={sale._id}
                className="bg-[#FFE9F2] p-4 rounded-lg border border-[#F7DCE7]"
              >
                <div className="flex gap-3 items-center mb-3">
                  <img
                    src={sale.flash_sale_image}
                    alt=""
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#0E0E0E]">
                      {sale.flash_sale}
                    </p>
                    <p className="text-sm text-gray-600">
                      Products: {sale.flash_sale_products?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-[#0E0E0E] mb-1">
                  <span className="font-medium">Start:</span>{" "}
                  {formatDate(sale.flash_sale_start_date)}{" "}
                  {sale.flash_sale_start_time}
                </div>

                <div className="text-sm text-[#0E0E0E] mb-1">
                  <span className="font-medium">End:</span>{" "}
                  {formatDate(sale.flash_sale_end_date)}{" "}
                  {sale.flash_sale_end_time}
                </div>

                <div className="mt-2">
                  {sale.flash_saleActive ? (
                    <span className="text-[#00A651] font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="text-[#FF2E8B] font-medium">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No flash sales found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
