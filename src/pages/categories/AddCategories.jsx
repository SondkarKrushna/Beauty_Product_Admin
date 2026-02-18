import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useAddCategoryMutation, useEditCategoryMutation } from "../../redux/apis/categoryApi";


const AddCategories = ({ mode = "add", initialData = {}, onClose }) => {
    const [categoryName, setCategoryName] = useState("");
    const [image, setImage] = useState(null);

    const [addCategory, { isLoading: adding }] = useAddCategoryMutation();
    const [editCategory, { isLoading: editing }] = useEditCategoryMutation();

    // 🧠 Pre-fill data when editing
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setCategoryName(initialData.product_catagory || "");
        }
    }, [mode, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (mode === "add") {
            if (!categoryName.trim()) {
                alert("⚠️ Please enter a category name.");
                return;
            }
            if (!image) {
                alert("⚠️ Please upload a category image.");
                return;
            }
        }

        const formData = new FormData();
        formData.append("product_catagory", categoryName);
        if (image) formData.append("product_catagory_image", image);

        try {
            if (mode === "edit") {
                // ✅ Send category ID as param in new API format
                await editCategory({
                    id: initialData._id,
                    formData,
                }).unwrap();
                alert("Category updated successfully!");
            } else {
                await addCategory(formData).unwrap();
                alert("Category added successfully!");
            }

            // ✅ Reset and close modal
            onClose?.();
            setCategoryName("");
            setImage(null);
        } catch (error) {
            console.error("❌ Error:", error);
            alert("Something went wrong!");
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md w-[320px] h-[346px] flex flex-col items-center"
        >
            <div className="w-full mb-3">
                <label className="block text-sm font-semibold mb-1 text-black">
                    Category Name
                </label>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter Here"
                    className="w-full bg-[#F3F3F3] rounded-md px-3 py-2 text-xs outline-none placeholder:text-gray-500"
                />
            </div>

            <div className="w-full mb-4">
                <label className="block text-sm font-semibold mb-2 text-black">
                    Upload Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                    id="upload-img"
                />
                <label
                    htmlFor="upload-img"
                    className="w-full h-36 bg-[#F3F3F3] rounded-md flex items-center justify-center cursor-pointer"
                >
                    {image || initialData?.product_catagory_image ? (
                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : initialData?.product_catagory_image
                            }
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <FiUpload className="text-[#FF0080] text-2xl" />
                    )}

                </label>
            </div>

            <button
                type="submit"
                disabled={adding || editing}
                className="bg-[#FF0080] text-white text-sm font-medium py-2 px-6 rounded-md disabled:opacity-50"
            >
                {mode === "edit"
                    ? editing
                        ? "Updating..."
                        : "Update Category"
                    : adding
                        ? "Adding..."
                        : "Add Category"}
            </button>
        </form>
    );
};

export default AddCategories;
