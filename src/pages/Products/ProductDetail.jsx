import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/apis/productDetailsApi";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductDetailsQuery(id);
  const product = data?.data;

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (product?.product_images?.length) {
      setMainImage(product.product_images[0]);
    }
  }, [product]);

  // Skeleton loader
  const Skeleton = ({ width, height, className }) => (
    <div
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );

  if (isError)
    return (
      <div className="p-6 text-red-600 text-center">
        Failed to load product details.
      </div>
    );

  return (
    <div
      className="min-h-screen bg-[#f8f1f4] p-6 text-[#1a1a1a]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <h2 className="text-lg font-semibold mb-4">Product Details</h2>

      {/* MAIN SECTION */}
      <div className="flex flex-col lg:flex-row gap-6 items-start mb-6 ms-5">
        {/* LEFT IMAGE SECTION */}
        <div className="flex gap-4 w-full lg:w-1/2">
          {/* Main Image */}
          <div className="w-[70%]">
            {isLoading ? (
              <Skeleton width="100%" height="400px" className="rounded-xl" />
            ) : (
              <img
                src={mainImage || product?.product_images?.[0]}
                alt="Main"
                className="rounded-xl w-full h-[400px] object-contain bg-white shadow-md"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] w-[30%] scrollbar-hide">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    width="100%"
                    height="90px"
                    className="rounded-xl"
                  />
                ))
              : product?.product_images?.slice(0, 5)?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    className={`rounded-xl w-full h-[90px] object-cover cursor-pointer border transition-all duration-200 ${
                      mainImage === img
                        ? "border-2 border-[#FF007F] shadow-md scale-[1.02]"
                        : "border-gray-200 hover:border-[#FF007F]"
                    }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
          </div>
        </div>

        {/* RIGHT PRODUCT INFO */}
        <div className="bg-white rounded-2xl shadow-lg shadow-pink-200 p-6 w-full lg:w-[620px] min-h-[400px] flex flex-col justify-between">
          {isLoading ? (
            <>
              <Skeleton width="100px" height="14px" className="mb-2" />
              <Skeleton width="150px" height="20px" className="mb-4" />
              <Skeleton width="200px" height="28px" className="mb-4" />
              <Skeleton width="100%" height="40px" className="mb-2" />
              <Skeleton width="80%" height="20px" className="mb-1" />
              <Skeleton width="90%" height="20px" className="mb-1" />
            </>
          ) : (
            <>
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm text-gray-400">
                  Product ID: {product?._id}
                </p>
                <p className="text-lg font-medium text-black">
                  Quantity: {product?.product_Quantity}
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-black mb-4">
                {product?.product_name}
              </h3>

              <div className="flex items-center gap-12 mb-5">
                <div className="flex items-baseline gap-1">
                  <p className="text-[#FF007F] text-2xl font-bold">
                    ₹{product?.price_online}
                  </p>
                  <span className="text-sm text-black font-medium">Online</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <p className="text-[#FF007F] text-2xl font-bold">
                    ₹{product?.price_offline}
                  </p>
                  <span className="text-sm text-black font-medium">Offline</span>
                </div>
              </div>

              <div className="mb-6">
                {/* <p className="text-sm text-black mb-1">
                  Category -{" "}
                  <span className="font-medium">
                    {product?.product_catagory || "N/A"}
                  </span>
                </p> */}
                <p className="text-sm text-black">
                  Availability :{" "}
                  <span className="font-medium">
                    {product?.product_availability
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-end mt-auto">
                {product?.product_availability ? (
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    ✅ In Stock
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 font-medium">
                    ❌ Out of Stock
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* PRODUCT DETAILS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ps-5">
        {["product_Deatils", "product_Highlight", "product_description"].map(
          (key, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-[#FFD7EA] shadow-sm"
            >
              <h4 className="font-semibold mb-3 text-[#000]">
                {key === "product_Deatils"
                  ? "Product Detail"
                  : key === "product_Highlight"
                  ? "Highlights"
                  : "Description"}
              </h4>
              {isLoading ? (
                <Skeleton width="100%" height="60px" className="mb-2" />
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product?.[key] || "No information available."}
                </p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
