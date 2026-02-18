import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

import ProductAdd from "./ProductAdd";
import productimage from "/productimage1.jpg";
import { useGetCategoriesQuery } from "../../redux/apis/categoryApi";
import { useGetAllProductsQuery } from "../../redux/apis/productApi";

const ProductsPage = () => {
    const [activeCategory, setActiveCategory] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add")
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [stockFilter, setStockFilter] = useState("in"); // "in" or "out"

    const navigate = useNavigate();

    // 🧠 API hooks
    const {
        data: productData,
        isLoading: productLoading,
        isError: productError,
    } = useGetAllProductsQuery();
    const { data: categoryData, isLoading: categoryLoading } = useGetCategoriesQuery();

    // Flatten all products across categories
    const allProducts =
        productData?.data?.flatMap((cat) =>
            cat.product_array.map((p) => ({
                ...p,
                categoryId: cat._id,
                categoryName: cat.product_catagory,
            }))
        ) || [];

    // Filter products based on stockFilter
    const filteredProducts = allProducts.filter((p) =>
        stockFilter === "in" ? p.product_availability : !p.product_availability
    );

    // Memoize available categories to avoid recalculation on every render
    const availableCategories = useMemo(() => {
        return Array.from(new Set(filteredProducts.map(p => p.categoryName)));
    }, [filteredProducts]);

    // Automatically select first available category if none is active
    useEffect(() => {
        if (!activeCategory && availableCategories.length) {
            setActiveCategory(availableCategories[0]);
        }
    }, [activeCategory, availableCategories]);


    // Filter by active category if selected
    const displayedProducts = activeCategory
        ? filteredProducts.filter((p) => p.categoryName === activeCategory)
        : filteredProducts;
    // const displayedProducts = activeCategory
    //     ? allProducts.filter((p) => p.categoryName === activeCategory)
    //     : allProducts;


    // 🩶 Skeleton Card for loading
    const SkeletonCard = () => (
        <div className="bg-gray-200 animate-pulse rounded-2xl w-full h-[210px]" />
    );

    return (
        <div
            className="h-screen p-3 flex flex-col overflow-hidden"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 flex-wrap">
                <h2 className="text-[#000] font-semibold text-m cursor-pointer">
                    Products
                </h2>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-3">
                <button
                    onClick={() => setStockFilter("in")}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg ${stockFilter === "in" ? "bg-[#FF007F] text-white" : "bg-[#FFE9F4] text-[#333]"
                        }`}
                >
                    In Stock
                </button>
                <button
                    onClick={() => setStockFilter("out")}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg ${stockFilter === "out" ? "bg-[#FF007F] text-white" : "bg-[#FFE9F4] text-[#333]"
                        }`}
                >
                    Out of Stock
                </button>

                <button
                    onClick={() => {
                        setModalMode("add");
                        setSelectedProduct(null);
                        setIsModalOpen(true);
                    }}
                    className="ms-auto btn rounded-full px-6 py-2 bg-[#FF007F] text-white border-none hover:opacity-90"
                >
                    + Add Product
                </button>
            </div>

            {/* Layout */}
            <div className="flex flex-1 flex-col lg:flex-row gap-6 overflow-hidden">
                {/* Sidebar: Categories */}
                <div className="w-full lg:w-1/6 bg-[#FFD7EA75] rounded-3xl p-3 flex flex-wrap lg:flex-col gap-2 justify-center lg:justify-start">
                    {categoryLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="bg-gray-200 h-8 w-24 rounded-full animate-pulse" />
                        ))
                    ) : (
                        categoryData?.data?.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() =>
                                    setActiveCategory(
                                        activeCategory === cat.product_catagory ? "" : cat.product_catagory
                                    )
                                }
                                className={`text-center px-4 py-2 rounded-full font-medium transition-all ${activeCategory === cat.product_catagory
                                    ? "bg-gradient-to-r from-[#280F22] to-[#8E3579] text-white"
                                    : "text-[#8E3579] hover:bg-[#FFD7EA]"
                                    }`}
                            >
                                {cat.product_catagory}
                            </button>
                        ))
                    )}
                </div>

                {/* Product Cards */}
                <div className="flex-1 bg-[#FFE9F4] rounded-2xl p-3 pe-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-y-auto">
                    {productLoading ? (
                        Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                    ) : productError ? (
                        <p className="text-red-600 text-sm">Failed to load products.</p>
                    ) : displayedProducts.length === 0 ? (
                        <p className="text-gray-600 text-sm col-span-full">No products found.</p>
                    ) : (
                        displayedProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all relative flex flex-col items-center overflow-hidden w-full h-[210px]"
                            >
                                <img
                                    src={product.product_images?.[0] || productimage}
                                    alt={product.product_name}
                                    className="w-full h-[120px] cursor-pointer object-cover rounded-t-2xl"
                                    onClick={() => navigate(`/productdetail/${product._id}`)}
                                />
                                <div className="text-center mt-2">
                                    <p className="text-sm text-gray-700 leading-tight">{product.product_name}</p>
                                    <p className="text-base font-semibold text-black mt-1">₹{product.price_online}</p>
                                </div>
                                <div className="absolute bottom-1 right-2 flex gap-2">
                                    <button className="btn btn-xs bg-[#FF007F] text-white rounded-t-lg border-none w-10 me-2 h-5 flex items-center justify-center hover:opacity-90 gap-2">
                                        <AiFillEdit onClick={() => {
                                            setSelectedProduct(product)

                                            // setSelectedProduct({ ...product, categoryId: cat._id });   // clicked product
                                            setModalMode("edit");          // mode for modal
                                            setIsModalOpen(true);          // open modal
                                        }}
                                            className="text-xs" />
                                        {/* <FaTrashAlt className="text-xs" /> */}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            <ProductAdd isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={modalMode} initialData={selectedProduct} />
        </div>
    );
};

export default ProductsPage;
