import React, { useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { FaCalendarAlt, FaClock, FaTrash, FaPlus } from "react-icons/fa";
import { useGetAllProductsQuery } from "../../redux/apis/productApi";
import { useAddFlashSaleMutation } from "../../redux/apis/createSaleApi";

const AddFlashSale = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            flashSaleName: "",
            date: "",
            startTime: "",
            endTime: "",
            discountMode: "same",
            products: [{ product: "", discount: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });


    const { data: productData, isLoading, isError } = useGetAllProductsQuery();
    const [AddFlashSale, { isLoading: addingSale }] = useAddFlashSaleMutation();

    const [selectedProduct, setSelectedProduct] = useState(null);

    // 🧩 Flatten all category-wise products
    const allProducts = useMemo(() => {
        if (!productData?.data) return [];
        return productData.data.flatMap((cat) =>
            cat.product_array.map((p) => ({
                ...p,
                category: cat.product_catagory,
            }))
        );
    }, [productData]);

    // 🏷️ Convert to react-select options
    const productOptions = allProducts.map((p) => ({
        value: p._id,
        label: `${p.product_name} (${p.category}) — ₹${p.price_online}`,
    }));

    // 💾 When user selects product
    const handleSelectChange = (selected) => {
        setSelectedProduct(selected);
    };

    // Skeleton while loading
    if (isLoading) {
        return (
            <div className="w-full mt-20  px-6 py-6">
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                </div>
            </div>
        );
    }

    // ⚠️ Error state
    if (isError) {
        return (
            <p className="text-red-500 text-sm">
                Failed to load products. Please try again.
            </p>
        );
    }

    // const onSubmit = async (data) => {
    //     try {
    //         console.log("📦 Final Flash Sale Data:", data);
    //         // Example API:
    //         // await axios.post(`${BASE_URL}/flash-sale`, data);
    //         alert("✅ Flash sale created successfully!");
    //         reset();
    //     } catch (error) {
    //         console.error("❌ Error:", error);
    //         alert("Something went wrong!");
    //     }
    // };

    const onSubmit = async (data) => {
        try {
            // 🧩 Determine discountType
            const discountType = data.discountMode === "same" ? "percentage" : "fixed";

            // 🧾 Construct FormData
            const formData = new FormData();
            const formatDate = (d) => new Date(d).toISOString().split("T")[0];

            formData.append("flash_sale", data.flashSaleName);
            formData.append("flash_sale_start_date", formatDate(data.date));
            formData.append("flash_sale_end_date", formatDate(data.dateEnd))
            formData.append("flash_sale_start_time", data.startTime);
            formData.append("flash_sale_end_time", data.endTime);

            // 🧮 Prepare product array (map each)
            const formattedProducts = data.products.map((p) => ({
                product: p.product,
                discountType: discountType,
                discountValue: parseFloat(p.discount),
                flash_sale_quantity: Number(p.flash_sale_quantity) || 0,
                // flash_sale_quantytity: 10,
            }));

            formData.append("flash_sale_products", JSON.stringify(formattedProducts));

            // 🖼️ If you have image upload
            if (data.image && data.image[0]) {
                formData.append("flash_sale_image", data.image[0]);
            }

            // 🚀 API call
            const res = await AddFlashSale(formData).unwrap();

            console.log("✅ Flash Sale Created:", res.data);
            alert("🎉 Flash sale created successfully!");
            reset();
        } catch (error) {
            console.error("❌ Error creating sale:", error);
            alert("Failed to create sale. Please try again!");
        }
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-h-screen bg-[#FFF7FA] px-6 py-6"
        >
            <h2 className="text-[16px] font-semibold mb-4 text-black">
                Add Flash Sale
            </h2>

            <div className="bg-white border border-[#F8D6E0] rounded-2xl p-6 shadow-sm">
                {/* Flash Sale Name + Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Flash Sale Name
                        </label>
                        <input
                            {...register("flashSaleName", { required: "Name is required" })}
                            type="text"
                            placeholder="Enter"
                            className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.flashSaleName && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.flashSaleName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Select Start Date
                        </label>
                        <div className="relative">
                            <input
                                {...register("date", { required: "Date is required" })}
                                type="date"
                                className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
                            />
                            {/* <FaCalendarAlt className="absolute right-4 top-3.5 text-pink-400 text-[16px]" /> */}
                        </div>
                        {errors.date && (
                            <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
                        )}
                    </div>
                </div>


                {/* 🖼️ Flash Sale Banner Image & Sale Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    {/* Flash Sale Image */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-black">
                            Flash Sale Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: "Flash sale image is required",
                            })}
                            className="block w-full text-sm text-gray-700 border border-pink-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-[#FF0080] hover:file:bg-pink-200"
                        />
                        {errors.image && (
                            <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Select End Date
                        </label>
                        <div className="relative">
                            <input
                                {...register("dateEnd", { required: "End date is required" })}
                                type="date"
                                className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
                            />
                            {/* <FaCalendarAlt className="absolute right-4 top-3.5 text-pink-400 text-[16px]" /> */}
                        </div>
                        {errors.date && (
                            <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
                        )}
                    </div>

                </div>


                {/* Start + End Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            Start Time
                        </label>
                        <input
                            {...register("startTime", { required: "Start time required" })}
                            type="time"
                            className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.startTime && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.startTime.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">
                            End Time
                        </label>
                        <input
                            {...register("endTime", { required: "End time required" })}
                            type="time"
                            className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.endTime && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.endTime.message}
                            </p>
                        )}
                    </div>
                </div>



                {/* Dynamic Product Section */}
                {fields.map((item, index) => (
                    <div key={item.id} className="relative grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">

                        {/* 🧩 Product Select */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-black">
                                Select Product
                            </label>
                            <Controller
                                control={control}
                                name={`products.${index}.product`}
                                rules={{ required: "Select a product" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={productOptions}
                                        isSearchable
                                        placeholder="Search and select product..."
                                        onChange={(selectedOption) =>
                                            field.onChange(selectedOption?.value)
                                        }
                                        value={
                                            productOptions.find((opt) => opt.value === field.value) || null
                                        }
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                borderRadius: "0.5rem",
                                                borderColor: "#fbcfe8",
                                                boxShadow: "none",
                                                "&:hover": { borderColor: "#f472b6" },
                                            }),
                                        }}
                                    />
                                )}
                            />
                            {errors.products?.[index]?.product && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.products[index].product.message}
                                </p>
                            )}
                        </div>

                        {/* 💸 Discount Input */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-black">
                                Discount Value
                            </label>
                            <input
                                {...register(`products.${index}.discount`, {
                                    required: "Discount required",
                                    min: { value: 1, message: "Min 1" },
                                })}
                                type="number"
                                placeholder="Enter"
                                className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            {errors.products?.[index]?.discount && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.products[index].discount.message}
                                </p>
                            )}
                        </div>

                        {/* 🔹 Discount Type */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-black">
                                Discount Type
                            </label>
                            <select
                                {...register(`products.${index}.discountType`, {
                                    required: "Select discount type",
                                })}
                                className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            >
                                <option value="">Select</option>
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                            </select>
                            {errors.products?.[index]?.discountType && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.products[index].discountType.message}
                                </p>
                            )}
                        </div>

                        {/* 🔢 Quantity Input */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-black">
                                Sale Quantity
                            </label>
                            <input
                                {...register(`products.${index}.flash_sale_quantity`, {
                                    required: "Quantity required",
                                    min: { value: 1, message: "Min quantity 1" },
                                })}
                                type="number"
                                placeholder="Enter quantity"
                                className="w-full border border-pink-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            {errors.products?.[index]?.flash_sale_quantity && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.products[index].flash_sale_quantity.message}
                                </p>
                            )}
                        </div>

                        {/* ❌ Remove Button */}
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute right-3 top-[38px] text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>
                ))}

                {/* ➕ Add More Button */}
                <div className="flex justify-start mb-6">
                    <button
                        type="button"
                        onClick={() =>
                            append({
                                product: "",
                                discount: "",
                                discountType: "",
                                flash_sale_quantity: "",
                            })
                        }
                        className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-[#FF0080] font-medium px-4 py-2 rounded-lg text-sm transition-all"
                    >
                        <FaPlus /> Add More
                    </button>
                </div>





                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#FF0080] hover:bg-[#e60073]"
                            } text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-all duration-200`}
                    >
                        {isSubmitting ? "Saving..." : "Apply Discount"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddFlashSale;
