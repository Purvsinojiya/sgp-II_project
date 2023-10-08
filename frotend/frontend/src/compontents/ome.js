import bannerImage from "./banner.jpg";
import productImage from "./sopari.jpeg";
import React, { useState } from "react";

const ProductCard = ({ title, description, price, image }) => (
  <div className="w-1/4 p-6 flex justify-center">
    <div className="w-[220px] h-[340px] overflow-hidden bg-[#F6DCB4] rounded-[20px] shadow-md shadow-gray-400  flex flex-col justify-center items-center">
      <img
        src={image}
        alt={title}
        className="object-cover rounded-[20px] w-[185px] h-[136px] mt-3"
      />
      <div className="p-4">
        <h2 className="text-gray-800 font-semibold text-lg">{title}</h2>
        <p className="text-gray-600 overflow-hidden line-clamp-2">
          {description}
        </p>
        <p className="text-gray-600">₹{price}</p>
        <div class="flex justify-center">
          <button className="mt-2 bg-[#FBA557] text-white px-7 py-1 rounded-[10px] shadow-xl hover:bg-[#fb8c24] focus:outline-none focus:ring-1 focus:ring-orange-500">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ProductList = ({ products }) => {
  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
  ];
  const itemsToShow = 4;
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsToShow);
    }
  };

  const handleNextClick = () => {
    if (startIndex + itemsToShow < categories.length) {
      setStartIndex(startIndex + itemsToShow);
    }
  };

  return (
    <>
      <div>
        <div className="w-full h-[250px] flex justify-center">
          <img
            src={bannerImage}
            alt="Banner"
            className="object-cover w-[100%]"
          />
        </div>

        <div className="flex flex-wrap justify-center container mx-auto py-8">
          <div className=" p-1 mb-1">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevClick}
                className={`px-5 py-1 rounded-[20px] bg-[#F1F1F1] hover:bg-gray-400 text-gray-600 focus:outline-none ${
                  startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {"<"}
              </button>
              <div className="flex space-x-20 px-20 overflow-x-auto">
                {categories
                  .slice(startIndex, startIndex + itemsToShow)
                  .map((category, index) => (
                    <button
                      key={index}
                      className="px-10 py-1 rounded-[22px] bg-[#F1F1F1] text-gray-600 hover:bg-gray-400 focus:outline-none"
                    >
                      {category}
                    </button>
                  ))}
              </div>
              <button
                onClick={handleNextClick}
                className={`px-5 py-1 rounded-[20px]  bg-[#F1F1F1] hover:bg-gray-400 text-gray-600 focus:outline-none ${
                  startIndex + itemsToShow >= categories.length
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {">"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mx-20">
            {/* Product Cards */}
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ome = () => {
  const products = [
    {
      title: "Product 1",
      price: 19.99,
      description: "Short description about product.",
      image: productImage,
    },
    {
      title: "Product 2",
      price: 24.99,
      description: "Short description about product.",
      image: productImage,
    },
    {
      title: "Product 3",
      price: 14.99,
      description: "Short description about product.",
      image: productImage,
    },
    {
      title: "Product 4",
      price: 29.99,
      description: "Short description about product.",
      image: productImage,
    },
    {
      title: "Product 5",
      price: 29.99,
      description: "Short description about product.",
      image: productImage,
    },
    {
      title: "Product 6",
      price: 29.99,
      description: "Short description about product.",
      image: productImage,
    },
    {
      title: "Product 7",
      price: 29.99,
      description: "Short description about product.",
      image: productImage,
    },
    {
      title: "Product 8",
      price: 29.99,
      description: "Short description about product.",
      image: productImage,
    },
    // Add more products as needed
  ];

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default ome;
