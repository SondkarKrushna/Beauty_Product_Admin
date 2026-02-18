import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { useAddProductMutation, useEditProductMutation } from "../../redux/apis/productApi";
import { useGetCategoriesQuery } from "../../redux/apis/categoryApi";

const ProductAdd = ({ isOpen, onClose, mode, initialData }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const { data: categories, isLoading: categoryLoading } = useGetCategoriesQuery();
    const [addProduct, { isLoading: adding }] = useAddProductMutation();
    const [editProduct, { isLoading: editing }] = useEditProductMutation();

    // console.log("initialData", initialData);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (mode === "edit" && initialData) {
            console.log("🟢 Edit Mode Initial Data:", initialData);
            console.log("📦 Category ID:", initialData.categoryId || initialData.category_id);
            // Prefill for edit mode
            reset({
                product_catagory: initialData.categoryName || "",
                product_name: initialData.product_name || "",
                product_Deatils: initialData.product_Deatils || "",
                product_description: initialData.product_description || "",
                product_Highlight: initialData.product_Highlight || "",
                product_Quantity: initialData.product_Quantity || "",
                price_online: initialData.price_online || "",
                price_offline: initialData.price_offline || "",
            });
            setSelectedImages(initialData.product_images || []);
        } else if (mode === "add") {
            // 👇 Clear all form values for fresh add mode
            reset({
                product_catagory: "",
                product_name: "",
                product_Deatils: "",
                product_description: "",
                product_Highlight: "",
                product_Quantity: "",
                price_online: "",
                price_offline: "",
            });
            setSelectedImages([]);
        }
    }, [mode, initialData, reset]);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        setSelectedImages([...e.target.files]);
    };

    const onSubmit = async (data) => {
        if (selectedImages.length === 0 && mode === "add") {
            alert("⚠️ Please upload at least one image.");
            return;
        }

        const productObj = {
            product_name: data.product_name,
            product_Deatils: data.product_Deatils,
            product_description: data.product_description,
            product_Highlight: data.product_Highlight,
            product_Quantity: Number(data.product_Quantity),
            price_online: Number(data.price_online),
            price_offline: Number(data.price_offline),
        };

        const formData = new FormData();
        formData.append("product_catagory", data.product_catagory);

        // 🟩 Wrap inside updated_data for PUT request
        if (mode === "edit") {
            formData.append("updated_data", JSON.stringify(productObj));
        } else {
            // For add request (POST)
            formData.append("product_array", JSON.stringify([productObj]));
        }

        // Only append new images (if user uploaded new ones)
        // selectedImages.forEach((file, i) => {
        //     if (file instanceof File) {
        //         formData.append(`product_images[0]`, file);
        //     }
        // });

        selectedImages.forEach((file) => {
            if (file instanceof File) {
                formData.append("product_images", file);
            }
        });
        if (mode === "edit" && !selectedImages.some((img) => img instanceof File)) {
            formData.append("existing_images", JSON.stringify(initialData.product_images));
        }

        try {
            if (mode === "edit" && initialData?._id) {
                // ✅ EDIT Product (PUT)
                await editProduct({
                    categoryId: initialData.categoryId || initialData.category_id,
                    productId: initialData._id,
                    formData,
                }).unwrap();

                alert("✅ Product updated successfully!");
            } else {
                // ✅ ADD Product (POST)
                await addProduct(formData).unwrap();
                alert("✅ Product added successfully!");
            }

            reset();
            setSelectedImages([]);
            onClose();
        } catch (error) {
            console.error("❌ Error submitting product:", error);
            alert("Something went wrong!");
        }
    };


    const isSubmitting = adding || editing;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-[24px] p-4 w-full max-w-5xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
                >
                    ✕
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2">
                    {/* Category */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 text-black">Select Category</label>
                        <select
                            {...register("product_catagory", { required: "Category is required" })}
                            className="border-2 border-[#00A2FF] rounded-lg h-12 px-3 text-gray-700 focus:outline-none"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Choose
                            </option>
                            {categoryLoading
                                ? null
                                : categories?.data?.map((cat) => (
                                    <option key={cat._id} value={cat.product_catagory}>
                                        {cat.product_catagory}
                                    </option>
                                ))}
                        </select>
                        {errors.product_catagory && (
                            <span className="text-red-600 text-sm mt-1">{errors.product_catagory.message}</span>
                        )}
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 text-black">Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter Here"
                            {...register("product_name", { required: "Product name is required" })}
                            className="bg-[#E8E8E8] h-12 px-3 rounded-lg focus:outline-none"
                        />
                        {errors.product_name && (
                            <span className="text-red-600 text-sm mt-1">{errors.product_name.message}</span>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 text-black">Product Details</label>
                        <input
                            type="text"
                            placeholder="Enter Here"
                            {...register("product_Deatils", { required: "Product details required" })}
                            className="bg-[#E8E8E8] h-12 px-3 rounded-lg focus:outline-none"
                        />
                        {errors.product_Deatils && (
                            <span className="text-red-600 text-sm mt-1">{errors.product_Deatils.message}</span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 text-black">Description</label>
                        <input
                            type="text"
                            placeholder="Enter Here"
                            {...register("product_description", { required: "Description required" })}
                            className="bg-[#E8E8E8] h-12 px-3 rounded-lg focus:outline-none"
                        />
                        {errors.product_description && (
                            <span className="text-red-600 text-sm mt-1">{errors.product_description.message}</span>
                        )}
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 text-black">Product Highlights</label>
                        <input
                            type="text"
                            placeholder="Enter Here"
                            {...register("product_Highlight", { required: "Highlight required" })}
                            className="bg-[#E8E8E8] h-12 px-3 rounded-lg focus:outline-none"
                        />
                        {errors.product_Highlight && (
                            <span className="text-red-600 text-sm mt-1">{errors.product_Highlight.message}</span>
                        )}
                    </div>

                    {/* Quantity */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 text-black">Quantity</label>
                        <input
                            type="number"
                            placeholder="Enter Here"
                            {...register("product_Quantity", { required: "Quantity required", min: 1 })}
                            className="bg-[#E8E8E8] h-12 px-3 rounded-lg focus:outline-none"
                        />
                        {errors.product_Quantity && (
                            <span className="text-red-600 text-sm mt-1">{errors.product_Quantity.message}</span>
                        )}
                    </div>

                    {/* Online Price */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 text-black">Online Price</label>
                        <input
                            type="number"
                            placeholder="Enter Here"
                            {...register("price_online", { required: "Online price required", min: 1 })}
                            className="bg-[#E8E8E8] h-12 px-3 rounded-lg focus:outline-none"
                        />
                        {errors.price_online && (
                            <span className="text-red-600 text-sm mt-1">{errors.price_online.message}</span>
                        )}
                    </div>

                    {/* Offline Price */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 text-black">Offline Price</label>
                        <input
                            type="number"
                            placeholder="Enter Here"
                            {...register("price_offline", { required: "Offline price required", min: 1 })}
                            className="bg-[#E8E8E8] h-12 px-3 rounded-lg focus:outline-none"
                        />
                        {errors.price_offline && (
                            <span className="text-red-600 text-sm mt-1">{errors.price_offline.message}</span>
                        )}
                    </div>

                    {/* Upload Images */}
                    <div className="flex flex-col col-span-2">
                        <label className="font-semibold mb-1 text-black">Upload Images</label>

                        {/* Upload box */}
                        <div className="bg-[#E8E8E8] h-12 rounded-lg flex items-center justify-center relative">
                            <AiOutlineUpload className="text-[#FF007F] text-2xl" />
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>

                        {/* Preview section */}
                        {selectedImages.length > 0 && (
                            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {selectedImages.map((img, idx) => (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={img instanceof File ? URL.createObjectURL(img) : img}
                                            alt={`preview-${idx}`}
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedImages((prev) => prev.filter((_, i) => i !== idx));
                                            }}
                                            className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded hidden group-hover:block"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedImages.length === 0 && (
                            <span className="text-red-600 text-sm mt-1">
                                Please select at least one image
                            </span>
                        )}
                    </div>


                    {/* Submit Button */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting} // disabled while adding/updating
                            className="bg-[#FF007F] text-white px-8 py-2 rounded-md hover:opacity-90 font-medium"
                        >
                            {isSubmitting
                                ? (mode === "edit" ? "Updating..." : "Adding...")
                                : (mode === "edit" ? "Update Product" : "+ Add Product")}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};


export default ProductAdd;
