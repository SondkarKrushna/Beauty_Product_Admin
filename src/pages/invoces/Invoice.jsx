import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useGetAllinvoiceQuery } from "../../redux/apis/invoiceApi";
import Bill from "./Invoicebill";

const Invoice = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } =
    useGetAllinvoiceQuery({ page, limit });

  const invoices = data?.data ?? [];
  const pagination = data?.pagination;
  const stats = data?.stats;

  const [openModal, setOpenModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const totalInvoices = stats?.totalInvoices ?? 0;

  if (isError)
    return (
      <p className="text-red-600 p-4">
        Something went wrong!
      </p>
    );

  return (
    <div className="bg-[#FFF3F6] min-h-screen py-6 px-4 sm:px-6">

      {/* ================= HEADER CARD ================= */}
      <div className="mb-5 flex flex-col">
        <div className="text-lg font-semibold text-black mb-2">
          Total Invoices
        </div>

        <div className="w-full sm:w-[355px] h-[104px] bg-white rounded-lg p-4 flex items-center shadow-[0_3.7px_14.35px_-0.93px_rgba(255,0,123,0.3)]">

          <div className="p-3 rounded-full bg-gradient-to-t from-[#280F22] to-[#FF007B] flex items-center justify-center">
            <Icon
              icon="material-symbols-light:docs-rounded"
              width="32"
              height="32"
              className="text-white"
            />
          </div>

          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Invoice</p>
            <p className="text-lg font-semibold">{totalInvoices}</p>
          </div>
        </div>
      </div>


      {/* ================= TABLE CARD ================= */}
      <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(255,0,123,0.07)] overflow-hidden">

        <div className="p-4 sm:p-6">

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#00000080]">
              Total Sales
            </h3>
            <Icon
              icon="solar:calendar-bold"
              className="w-6 h-6 text-[#FF007B]"
            />
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-[#FF007B1A] text-[#2B2B2B]">
                <tr>
                  <th className="px-6 py-4 text-left">Invoice No</th>
                  <th className="px-6 py-4 text-left">Customer</th>
                  <th className="px-6 py-4 text-left">Date / Time</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Payment</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Invoice</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({ length: 7 }).map((__, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : invoices.length > 0 ? (
                  invoices.map((invoice) => {
                    const date = new Date(invoice.createdAt).toLocaleDateString();
                    const time = new Date(invoice.createdAt).toLocaleTimeString();

                    return (
                      <tr
                        key={invoice._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {invoice.bill_number}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {invoice.customer_name}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {date}
                          <br />
                          <span className="text-xs text-gray-400">
                            {time}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-semibold whitespace-nowrap">
                          ₹{invoice.total_amount}
                        </td>

                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {invoice.payment_method}
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                            Paid
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className="text-[#FF007B] font-medium cursor-pointer hover:underline"
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
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARD VIEW ================= */}
          <div className="md:hidden divide-y divide-gray-100">
            {isLoading ? (
              <div className="p-4 text-center text-gray-400">
                Loading...
              </div>
            ) : invoices.length > 0 ? (
              invoices.map((invoice) => {
                const date = new Date(invoice.createdAt).toLocaleDateString();
                const time = new Date(invoice.createdAt).toLocaleTimeString();

                return (
                  <div key={invoice._id} className="p-4 space-y-4">

                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        {invoice.bill_number}
                      </h3>

                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                        Paid
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon icon="mdi:account-outline" className="w-4 h-4 text-[#FF007B]" />
                      {invoice.customer_name}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Icon icon="solar:calendar-outline" className="w-4 h-4 text-[#FF007B]" />
                      {date} | {time}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 capitalize">
                      <Icon icon="mdi:credit-card-outline" className="w-4 h-4 text-[#FF007B]" />
                      {invoice.payment_method}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2 font-semibold text-gray-800">
                        <Icon icon="mdi:currency-inr" className="w-4 h-4 text-[#FF007B]" />
                        {invoice.total_amount}
                      </div>

                      <span
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setOpenModal(true);
                        }}
                        className="text-[#FF007B] text-sm font-medium cursor-pointer hover:underline flex items-center gap-1"
                      >
                        View
                        <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                      </span>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-gray-500">
                No invoices found.
              </div>
            )}
          </div>
        </div>

        {/* ================= PAGINATION ================= */}
        {pagination?.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 border-t bg-gray-50 gap-3">

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium ${page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#FF007B] text-white"
                }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </span>

            <button
              disabled={page === pagination?.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium ${page === pagination?.totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#FF007B] text-white"
                }`}
            >
              Next
            </button>

          </div>
        )}
      </div>

      {/* ================= BILL MODAL ================= */}
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
