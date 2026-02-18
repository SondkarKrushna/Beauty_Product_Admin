import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import productimage4 from "/productimage4.jpg";
import productimage3 from "/productimage3.jpg";
import AddCategories from "./AddCategories"; // Import modal component
import { useGetCategoriesQuery } from "../../redux/apis/categoryApi";

const Categories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [mode, setMode] = useState("add");

    const { data, isLoading, isError } = useGetCategoriesQuery();

    const openAddModal = () => {
        setMode("add");
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const openEditModal = (cat) => {
        setMode("edit");
        setSelectedCategory(cat);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // Skeleton same as before
    const SkeletonCard = () => (
        <div className="flex flex-col items-center animate-pulse">
            <div className="bg-gray-200 rounded-2xl w-[180px] h-[140px]" />
            <div className="flex justify-center gap-4 mt-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
            </div>
            <div className="w-24 h-3 bg-gray-200 rounded mt-2"></div>
        </div>
    );

    return (
        <div className="p-6 bg-[#FFF7FA] min-h-screen relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-[#000]">Categories</h2>
                <button
                    onClick={openAddModal}
                    className="bg-[#FF0080] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#e60073] transition"
                >
                    + Add Categories
                </button>
            </div>

            {/* Cards */}
            <div className="flex flex-wrap gap-8">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                ) : isError ? (
                    <p className="text-red-600 text-sm">Failed to load categories.</p>
                ) : data?.data?.length > 0 ? (
                    data.data.map((cat) => (
                        <div key={cat._id} className="flex flex-col items-center">
                            <div className="bg-white rounded-2xl shadow-sm border border-[#FFD7EA] hover:shadow-md transition">
                                <img
                                    src={cat.product_catagory_image}
                                    alt={cat.product_catagory}
                                    className="w-[180px] h-[140px] object-cover rounded-2xl"
                                />
                            </div>
                            <div className="flex justify-center gap-4 mt-2">
                                <button
                                    onClick={() => openEditModal(cat)}
                                    className="text-green-600 hover:text-green-700 transition"
                                >
                                    <FaEdit size={18} />
                                </button>
                                {/* <button className="text-red-600 hover:text-red-700 transition">
                                    <FaTrash size={18} />
                                </button> */}
                            </div>
                            <p className="text-sm font-medium text-black mt-1">
                                {cat.product_catagory}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-sm">No categories found.</p>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative">
                        <AddCategories
                            mode={mode}
                            initialData={selectedCategory}
                            onClose={closeModal}
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>


    );
};

export default Categories;
