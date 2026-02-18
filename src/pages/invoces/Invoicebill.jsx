import React, { useMemo, useRef } from "react";
import { IoMdCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useGetInvoicebyIdQuery } from "../../redux/apis/invoiceApi";
import { useParams, useNavigate } from "react-router-dom";
import img from "../../../public/logo.jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Bill = ({ invoiceId: propInvoiceId, onClose }) => {
    const { id: routeId } = useParams();
    const navigate = useNavigate();
    const invoiceId = propInvoiceId || routeId;
    const printRef = useRef();
    const [isDownloading, setIsDownloading] = React.useState(false);

    const { data: result, isLoading } = useGetInvoicebyIdQuery(invoiceId, {
        skip: !invoiceId,
    });

    const handleClose = () => {
        if (onClose) onClose();
        else navigate(-1);
    };

    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        await new Promise((resolve) => setTimeout(resolve, 200));

        const input = printRef.current;
        input.style.height = `${input.scrollHeight}px`;
        input.style.maxHeight = "none";
        input.style.overflow = "visible";

        const canvas = await html2canvas(input, {
            scale: 3,
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollY: 0,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`Invoice-${invoice?.bill_number || "SonalCosmetics"}.pdf`);

        input.style.height = "";
        input.style.maxHeight = "";
        input.style.overflow = "";

        setIsDownloading(false);
    };

    const mapProducts = result?.data?.product_details || [];

    const taxTotal = useMemo(
        () => mapProducts.reduce((acc, pro) => acc + (Number(pro?.tax) || 0), 0),
        [mapProducts]
    );

    const unitAmount = useMemo(
        () => mapProducts.reduce((acc, pro) => acc + (Number(pro?.unit_price) || 0), 0),
        [mapProducts]
    );

    const amountTax = (taxTotal / 100) * unitAmount;
    const grandTotal = unitAmount + amountTax;

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 w-[700px] text-center">
                    <p className="text-pink-600 font-semibold text-lg">Loading Invoice...</p>
                </div>
            </div>
        );
    }

    if (!result?.data) return null;
    const invoice = result.data;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={handleClose}
        >
            <div
                className="relative bg-white w-[500px] rounded-lg shadow-xl font-sans flex flex-col"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: "90vh", overflow: "hidden" }}
            >
                {/* PRINTABLE AREA */}
                <div ref={printRef} className="flex flex-col overflow-y-auto">

                    <div
                        className="relative font-outfit h-28 text-white flex items-center justify-between px-8 bg-no-repeat bg-center"
                        style={{
                            backgroundImage: "url('/Group 4.png')",
                            backgroundSize: "cover",
                        }}
                    >
                        {/* Left: Logo + Text (Stacked) */}
                        <div className="flex flex-col items-center justify-center z-10 mb-0 text-center">
                            <img src={img} alt="logo" className="w-10 h-10 " />
                            <div className="mb-8">
                                <h1
                                    className="text-xl leading-none "
                                    style={{ fontFamily: '"Great Vibes", cursive' }}
                                >
                                    Sonal
                                </h1>
                                <p className="text-xs font-semibold tracking-wide">Cosmetics</p>
                            </div>
                        </div>

                        {/* Right: Invoice Label */}
                        <div className="z-10 text-right">
                            <p className="uppercase text-xl font-semibold tracking-wider">INVOICE</p>
                        </div>
                    </div>


                    {/* Invoice Body */}
                    <div className="px-8 py-6 min-h-[500px] overflow-y-auto flex-grow">
                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <p className="text-gray-800 text-sm font-semibold">Customer,</p>
                                <p className="text-[#FF007B] text-sm font-bold">{invoice.customer_name}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <IoMdCall className="text-[#FF007B]" size={18} />
                                    <p className="text-gray-700 mb-3 text-sm">{invoice.phone}</p>
                                </div>
                                <div className="flex items-start gap-2 mt-0">
                                    <FaLocationDot className="text-[#FF007B] mt-0 mr-1" size={16} />
                                    <p className="text-gray-700 -mt-1 text-sm">{invoice.address}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                {!isDownloading && (
                                    <button
                                        onClick={handleDownloadPDF}
                                        className=" bg-[#FF007B] text-white px-3  rounded-full hover:bg-[#c0005f] transition-all"
                                    >
                                        Download PDF
                                    </button>
                                )}
                                <p className="text-[#FF007B] text-md font-bold">Sonal Cosmetics</p>
                                <div className="mt-6 text-xs text-gray-700">
                                    <p>
                                        Invoice No -{" "}
                                        <span className="font-semibold">{invoice.bill_number}</span>
                                    </p>
                                    <p>Date - {new Date(invoice.createdAt).toDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Table */}
                        <div className="overflow-x-auto max-h-48 border border-pink-200 rounded-md">
                            <table className="w-full  border-collapse text-center text-xs">
                                <thead>
                                    <tr className="bg-gradient-to-r from-[#FF007B] to-[#99004A] text-white">
                                        <th className="py-1 px-3 text-xs font-semibold ">Sr No</th>
                                        <th className="py-1 px-3 text-xs font-semibold ">Product</th>
                                        <th className="py-1 px-3 text-xs font-semibold ">Quantity</th>
                                        <th className="py-1 px-3 text-xs font-semibold ">Price</th>
                                        <th className="py-1 px-3 text-xs font-semibold ">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mapProducts.map((item, index) => (
                                        <tr key={index} className="border-t text-gray-700">
                                            <td className="py-2 px-3 border-r border-[#FFCCE5]">{index + 1}</td>
                                            <td className="py-2 px-3 border-r border-[#FFCCE5]">{item.product_name}</td>
                                            <td className="py-2 px-3 border-r border-[#FFCCE5]">{item.product_quantity}</td>
                                            <td className="py-2 px-3 border-r border-[#FFCCE5]">₹{item.unit_price}</td>
                                            <td className="py-2 px-3 border-r border-[#FFCCE5]">₹{item.total_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Payment and Summary */}
                        <div className="grid grid-cols-2 mt-6 text-sm">
                            {/* Left side: Mode of Payment */}
                            <div>
                                <p className="text-[#FF007B] font-semibold">Mode of Payment</p>
                                <p className="text-gray-800">{invoice.payment_method}</p>
                            </div>

                            {/* Right side: Totals */}
                            <div className="text-gray-800 font-semibold flex flex-col items-end">
                                <div className="w-full max-w-[120px]">
                                    <div className="text-left">
                                        <p>Sub Total : ₹{unitAmount}</p>
                                        <p>Tax : ₹{amountTax}</p>
                                    </div>
                                    <div className="text-right mt-1 whitespace-nowrap">
                                        <p className="font-bold text-[#FF007B]">
                                            Grand Total : ₹{grandTotal}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Signature Section */}
                        <div className="mt-8 flex flex-col items-end">
                            <p
                                className="text-3xl text-black leading-none mb-4"
                                style={{ fontFamily: '"Great Vibes", cursive' }}
                            >
                                Sonal
                            </p>

                            <div className="w-32 border-t-2 border-[#FF007B] mb-2"></div>

                            <p className="text-gray-800 text-sm font-semibold tracking-wide">
                                Sonal Cosmetics
                            </p>
                        </div>
                    </div>

                    <div className="w-full bg-gradient-to-r from-[#FF007B] to-[#CC0063] border-t border-pink-200 text-center text-sm text-white py-2 mt-auto">
                        <p className="m-0">
                            Terms & Conditions: Payment due within 7 days. Returns accepted within 7 days if unopened. Seller not liable for misuse.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bill;