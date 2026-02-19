import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useGetAllCustomersQuery } from "../../redux/apis/customerApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Customers = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: customerData,
    isLoading,
    isError,
    error,
  } = useGetAllCustomersQuery({ page, limit });

  const customers = customerData?.data || [];
  const totalPages = customerData?.totalPages || 1;
  const total = customerData?.total || 0;

  const filtered = useMemo(() => {
    return customers.filter((c) =>
      c.name?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, customers]);

  if (isError) {
    console.error("Customer Fetch Error:", error);
    toast.error("Failed to load customers");
  }

  return (
    <div className="h-full w-full bg-[#FFF3F6] p-4 sm:p-8 font-Outfit">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-medium text-[18px] sm:text-[20px] text-[#000]">
          Customer Management
        </h1>

        <div className="relative w-full sm:w-[300px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00000080]">
            <Icon icon="mynaui:search" width={20} height={20} />
          </span>

          <input
            type="text"
            placeholder="Search By Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-[38px] sm:h-[40px] pl-10 pr-4 rounded-full bg-white text-[14px] sm:text-[15px] placeholder:text-[#00000080] focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[13px] p-4 shadow-[0_0_4px_0_rgba(255,0,123,0.3)] min-h-[500px] sm:min-h-[600px] flex flex-col">

        {/* ================= DESKTOP TABLE (UNCHANGED) ================= */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[900px]">

            {/* Header Row */}
            <div className="bg-[#FF007B1A]/10 h-[50px] grid grid-cols-12 items-center px-6 text-md text-[#000]">
              <div className="col-span-3 font-semibold text-[16px] px-8">Name</div>
              <div className="col-span-3 font-semibold text-[16px] px-8">Contact No</div>
              <div className="col-span-3 font-semibold text-[16px] px-8">Date / Time</div>
              <div className="col-span-3 font-semibold text-[16px] px-8">Detail</div>
            </div>

            {/* Data Rows */}
            <div className="bg-[#FFD7EA24] px-2 py-3 divide-y divide-gray-100">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 items-center py-3 px-6 animate-pulse"
                  >
                    <div className="col-span-3 px-8 h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="col-span-3 px-8 h-5 bg-gray-300 rounded w-1/2"></div>
                    <div className="col-span-3 px-8 flex flex-col gap-2">
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="col-span-3 px-8 h-5 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))
              ) : filtered.length === 0 ? (
                <div className="text-center text-sm text-gray-500 py-20">
                  No customers found
                </div>
              ) : (
                filtered.map((c) => (
                  <div
                    key={c._id}
                    className="grid grid-cols-12 items-center py-3 px-6"
                  >
                    <div className="col-span-3 text-[15px] text-black px-8">
                      {c.name}
                    </div>

                    <div className="col-span-3 text-[15px] text-black px-8">
                      {c.phone || c.contact || "—"}
                    </div>

                    <div className="col-span-3 text-[15px] text-[#121212] px-8">
                      <div>
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleDateString()
                          : "—"}
                      </div>
                      <div className="text-[13px] text-gray-600">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleTimeString()
                          : ""}
                      </div>
                    </div>

                    <div className="col-span-3 px-8">
                      <Link
                        to={`/customerDetails/${c._id}`}
                        className="text-[#FF007B] underline text-[15px]"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

        {/* ================= MOBILE CARD VIEW ================= */}
        <div className="md:hidden divide-y divide-gray-100 bg-[#FFD7EA24] rounded-lg">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 space-y-3 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-10">
              No customers found
            </div>
          ) : (
            filtered.map((c) => (
              <div key={c._id} className="p-4 space-y-3">

                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {c.name}
                  </h3>

                  <Link
                    to={`/customerDetails/${c._id}`}
                    className="text-pink-600 text-sm font-medium hover:underline"
                  >
                    View →
                  </Link>
                </div>

                <div className="text-sm text-gray-500">
                  📞 {c.phone || c.contact || "—"}
                </div>

                <div className="text-sm text-gray-600">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleDateString()
                    : "—"}
                  <br />
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleTimeString()
                    : ""}
                </div>

              </div>
            ))
          )}
        </div>

        {/* ================= PAGINATION ================= */}
        {!isLoading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4 border-t bg-gray-50 gap-3 mt-4">

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition ${page === 1
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
              className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition ${page === totalPages
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
  );
};

export default Customers;
