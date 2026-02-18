import React from "react";
import { useContactUsQuery } from "../redux/apis/contactUs";

export default function ContactUsTable() {
  const { data, isLoading, isError } = useContactUsQuery();

  if (isLoading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load data.</p>;
  
  const contactList = data?.data || [];
   
  return (
    <div className="max-w-5xl h-screen mx-auto p-4 bg-[#FFF4F8]">
      <h1 className="text-2xl font-semibold mb-4">Contact Enquiries</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border-collapse text-sm font-medium">
          <thead className="bg-[#FFD7EA75] text-gray-700">
            <tr>
              <th className="border p-3 text-center">User Name</th>
              <th className="border p-3 text-center">Mobile Number</th>
              <th className="border p-3 text-center">Message / Enquiry</th>
              <th className="border p-3 text-center">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {contactList.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No enquiries available
                </td>
              </tr>
            ) : (
              contactList.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 text-center">
                  <td className="border p-3">{item.name}</td>
                  <td className="border p-3">{item.contact}</td>
                  <td className="border p-3">{item.message}</td>
                  <td className="border p-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
