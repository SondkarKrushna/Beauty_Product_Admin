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

  const Skeleton = ({ width, height }) => (
    <div
      className="bg-gray-200 animate-pulse rounded-xl"
      style={{ width, height }}
    />
  );

  if (isError) {
    return (
      <div className="p-6 text-red-600 text-center font-medium">
        Failed to load product details. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f1f4] px-4 py-5 sm:px-6 sm:py-8 text-[#1a1a1a]">
      <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
        Product Details
      </h2>

      {/* MAIN SECTION ─ stacked on mobile, side-by-side on lg+ */}
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 mb-8 lg:mb-10">
        {/* Images Section */}
        <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5">
          {/* Thumbnails - vertical on all sizes (good UX) */}
          <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[380px] lg:max-h-[460px] w-full sm:w-20 md:w-24 lg:w-28 shrink-0">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} width="100%" height="80px" />
                ))
              : product?.product_images?.slice(0, 5)?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className={`rounded-lg sm:rounded-xl w-20 sm:w-full h-20 sm:h-20 lg:h-24 object-cover cursor-pointer border-2 transition-all flex-shrink-0 ${
                      mainImage === img
                        ? "border-[#FF007F] shadow-sm"
                        : "border-gray-300 hover:border-[#FF007F]/60"
                    }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <Skeleton width="100%" height="320px sm:380px lg:460px" />
            ) : (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <img
                  src={mainImage || product?.product_images?.[0] || ""}
                  alt={product?.product_name || "Product"}
                  className="w-full h-[300px] sm:h-[380px] lg:h-[460px] object-contain p-2 sm:p-4"
                />
              </div>
            )}
          </div>
        </div>

        {/* Product Info Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 w-full lg:w-2/5 xl:w-1/3 flex flex-col min-h-[340px] sm:min-h-[380px] lg:min-h-[460px]">
          {isLoading ? (
            <>
              <Skeleton width="140px" height="24px" />
              <Skeleton width="240px" height="36px" className="mt-3" />
              <Skeleton width="180px" height="28px" className="mt-6" />
            </>
          ) : (
            <>
              <div className="flex flex-wrap justify-between items-start gap-3 mb-4 sm:mb-5">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Product ID: {product?._id || "—"}
                  </p>
                  <p className="text-base sm:text-lg font-medium mt-1">
                    Quantity: {product?.product_Quantity ?? "—"}
                  </p>
                </div>

                <button
                  type="button"
                  className="bg-[#FF007F] hover:bg-[#e60070] text-white text-sm sm:text-base font-medium px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg shadow-md transition-colors whitespace-nowrap"
                >
                  + Add Product
                </button>
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 line-clamp-2">
                {product?.product_name || "Loading..."}
              </h3>

              <div className="flex gap-6 sm:gap-10 mb-5 sm:mb-6">
                <div>
                  <p className="text-[#FF007F] text-xl sm:text-2xl font-bold">
                    ₹{product?.price_online ?? "—"}
                  </p>
                  <span className="text-xs sm:text-sm text-gray-600">Online</span>
                </div>
                <div>
                  <p className="text-[#FF007F] text-xl sm:text-2xl font-bold">
                    ₹{product?.price_offline ?? "—"}
                  </p>
                  <span className="text-xs sm:text-sm text-gray-600">Offline</span>
                </div>
              </div>

              <div className="mt-auto text-right">
                {product?.product_availability ? (
                  <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold text-base sm:text-lg">
                    <span className="text-xl">✅</span> In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-red-600 font-semibold text-base sm:text-lg">
                    <span className="text-xl">❌</span> Out of Stock
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="mt-6 sm:mt-8">
        {/* Mobile: Horizontal scroll cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:hidden snap-x snap-mandatory -mx-1 px-1">
          {["product_Deatils", "product_Highlight", "product_description"].map(
            (key, i) => (
              <div
                key={i}
                className="min-w-[85vw] sm:min-w-[320px] flex-shrink-0 bg-white rounded-xl p-5 shadow-sm snap-center"
              >
                <h4 className="font-semibold text-base sm:text-lg mb-3">
                  {key === "product_Deatils"
                    ? "Product Details"
                    : key === "product_Highlight"
                    ? "Highlights"
                    : "Description"}
                </h4>
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {product?.[key] || "No information available."}
                </p>
              </div>
            )
          )}
        </div>

        {/* Desktop / Tablet: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {["product_Deatils", "product_Highlight", "product_description"].map(
            (key, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 lg:p-6 shadow-sm"
              >
                <h4 className="font-semibold text-lg mb-3">
                  {key === "product_Deatils"
                    ? "Product Details"
                    : key === "product_Highlight"
                    ? "Highlights"
                    : "Description"}
                </h4>
                <p className="text-sm lg:text-base leading-relaxed whitespace-pre-line">
                  {product?.[key] || "No information available."}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;