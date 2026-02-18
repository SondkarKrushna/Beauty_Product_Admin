import React, { useMemo, useState } from "react";
import { Icon } from '@iconify/react';
import { useGetAllCustomersQuery } from "../../redux/apis/customerApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Customers = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    //customers dynamically
    const {
        data: customerData,
        isLoading,
        isError,
        error,
    } = useGetAllCustomersQuery({ page, limit });

    // Safely extract list
    // const customers = customerData?.data || []; // assuming { success, data: [...] }
    // 🔹 Extract data safely
    const customers = customerData?.data || [];
    console.log("customers", customers);

    const totalPages = customerData?.totalPages || 1;
    const total = customerData?.total || 0;

    // Filter by name dynamically
    const filtered = useMemo(() => {
        return customers.filter((c) =>
            c.name?.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, customers]);

    console.log("filtered", filtered);


    // Error Handling
    if (isError) {
        console.error("Customer Fetch Error:", error);
        toast.error("Failed to load customers");
    }

    return (
        <div className="h-full w-full bg-[#FFF3F6] p-8 font-Outfit">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-medium text-[20px] text-[#000]">Customer Management</h1>

                <div className="relative w-[300px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00000080]">
                        <Icon icon="mynaui:search" width={24} height={24} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search By Name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-[40px] pl-10 pr-4 rounded-full bg-white text-[15px] placeholder:text-[#00000080] focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[13px] p-4 shadow-[0_0_4px_0_rgba(255,0,123,0.3)] min-h-[600px] flex flex-col">
                {/* Header Row */}
                <div className="bg-[#FF007B1A]/10 h-[50px] grid grid-cols-12 items-center px-6 text-md text-[#000]">
                    <div className="col-span-3 font-semibold text-[16px] px-8">Name</div>
                    <div className="col-span-3 font-semibold text-[16px]  px-8">Contact No</div>
                    <div className="col-span-3 font-semibold text-[16px]  px-8">Date / Time</div>
                    <div className="col-span-3 font-semibold text-[16px]  px-8">Detail</div>
                </div>

                {/* Data Rows */}
                <div className="bg-[#FFD7EA24] flex-1 px-2 py-3 overflow-y-auto divide-y divide-gray-100">
                    {isLoading ? (
                        // Skeleton Loader
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
                                {/* <div className="col-span-1 flex justify-end gap-4">
                                    <div className="h-5 w-5 bg-gray-300 rounded"></div>
                                    <div className="h-5 w-5 bg-gray-300 rounded"></div>
                                </div> */}
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
                                <div className="col-span-3 text-[15px] text-black px-8">{c.name}</div>
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

                {/* Pagination Controls */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 px-2">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold">{customers.length}</span> of{" "}
                            <span className="font-semibold">{total}</span> customers
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium ${page === 1
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
                                className={`px-3 py-1.5 rounded-md text-sm font-medium ${page === totalPages
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
    );
};

export default Customers;