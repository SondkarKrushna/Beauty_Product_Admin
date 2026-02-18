import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useGetAllinvoiceQuery } from "../../redux/apis/invoiceApi";
import Bill from "./Invoicebill";

const Invoice = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data, isLoading, isError } = useGetAllinvoiceQuery({ page, limit });
    const invoices = data?.data ?? [];
    const pagination = data?.pagination;
    const stats = data?.stats;
    const [openModal, setOpenModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const totalInvoices = stats?.totalInvoices ?? 0;

    const SkeletonRow = () => (
        <tr className="animate-pulse border-b border-gray-200">
            {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="py-3 px-3">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                </td>
            ))}
        </tr>
    );

    if (isError) return <p className="text-red-600 p-4">Something went wrong!</p>;

    return (
        <div className="bg-[#FFF3F6] min-h-screen py-8 px-6">

            {/* HEADER CARD */}
            <div className="mb-5 flex flex-col">
                <div className="text-lg font-semibold text-black mb-2">Total Invoices</div>

                <div className="w-[355px] h-[104px] bg-white rounded-lg p-4 flex items-center shadow-[0_3.7px_14.35px_-0.93px_rgba(255,0,123,0.3)]">
                    <div className="p-3 rounded-full bg-gradient-to-t from-[#280F22] to-[#FF007B] flex items-center justify-center">
                        <Icon icon="material-symbols-light:docs-rounded" className="w-8 h-8 text-white" />
                    </div>

                    <div className="ml-4">
                        <p className="text-sm text-gray-500">Total Invoice</p>
                        <p className="text-lg font-semibold">{totalInvoices}</p>
                    </div>
                </div>
            </div>

            {/* TABLE WRAPPER */}
            <div className="bg-white h-[900px] rounded-[10px] mt-2 shadow-[0_2px_8px_rgba(255,0,123,0.07)]">
                <div className="pt-6 px-6">
                    <div className="flex justify-between mb-3">
                        <div className="text-xl font-Outfit font-semibold text-[#00000080] mb-0">Total Sales</div>
                        <Icon icon="solar:calendar-bold" className="w-6 h-6 text-[#FF007B]" />
                    </div>

                    <div className="overflow-x-auto max-h-[650px] overflow-y-scroll">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 z-10 bg-pink-700">
                                <tr className="bg-[#FF007B1A]">
                                    <th className="py-3 pl-8 font-medium text-[#2B2B2B]">Invoice No</th>
                                    <th className="py-3 font-medium text-[#2B2B2B]">Customer</th>
                                    <th className="py-3 font-medium text-[#2B2B2B]">Date / Time</th>
                                    <th className="py-3 font-medium text-[#2B2B2B]">Amount</th>
                                    <th className="py-3 font-medium text-[#2B2B2B]">Payment</th>
                                    <th className="py-3 font-medium text-[#2B2B2B]">Status</th>
                                    <th className="py-3 font-medium text-[#2B2B2B]">Invoice</th>
                                </tr>
                            </thead>

                            <tbody className="bg-[#FFD7EA24]">

                                {/* SKELETON LOADING */}
                                {isLoading &&
                                    Array.from({ length: 5 }).map((_, idx) => <SkeletonRow key={idx} />)
                                }

                                {/* INVOICE ROWS */}
                                {!isLoading && invoices.length > 0 &&
                                    invoices.map((invoice) => {
                                        const date = new Date(invoice.createdAt).toLocaleDateString();
                                        const time = new Date(invoice.createdAt).toLocaleTimeString();

                                        return (
                                            <tr key={invoice._id} className="border-b border-gray-200">
                                                <td className="py-3 pl-8 text-sm">{invoice.bill_number}</td>
                                                <td className="py-3 text-sm">{invoice.customer_name}</td>

                                                <td className="py-3 text-sm whitespace-nowrap">
                                                    {date}<br />{time}
                                                </td>

                                                <td className="py-3 text-sm">₹{invoice.total_amount}</td>
                                                <td className="py-3 text-sm capitalize">{invoice.payment_method}</td>
                                                <td className="py-3 text-sm text-green-600 font-medium">Paid</td>

                                                <td className="py-3 text-sm font-medium">
                                                    <span
                                                        className="text-[#FF007B] font-medium cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedInvoice(invoice);
                                                            setOpenModal(true);
                                                        }}
                                                    >
                                                        View
                                                    </span>

                                                </td>
                                            </tr>
                                        );
                                    })
                                }

                                {!isLoading && invoices.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-6 text-gray-500">
                                            No invoices found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PAGINATION */}
                <div className="pb-4 px-6 flex justify-between items-center mt-4">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className={`px-4 py-2 rounded-lg ${page === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#FF007B] text-white"
                            }`}
                    >
                        Previous
                    </button>

                    <p className="text-gray-500 text-sm">
                        Page {pagination?.currentPage} of {pagination?.totalPages}
                    </p>

                    <button
                        disabled={page === pagination?.totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className={`px-4 py-2 rounded-lg ${page === pagination?.totalPages
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#FF007B] text-white"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
            {openModal && (
                <Bill
                    invoiceId={selectedInvoice?._id}
                    onClose={() => setOpenModal(false)}
                />
            )}

        </div>
    );
};

export default Invoice;
