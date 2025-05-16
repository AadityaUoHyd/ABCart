"use client";

import { Category, Product } from "@/sanity.types";
import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import Categories from "./Categories";
interface Props {
    products: Product[];
    categories: Category[];
    title?: boolean;
}
const ProductList = ({ products, categories, title }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Calculate products for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    // Pagination handlers
    const goToFirstPage = () => setCurrentPage(1);
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToPage = (page: number) => setCurrentPage(page);

    return (
        <div>
            <Categories categories={categories} />
            {title && (
                <div className="pb-5">
                    <h2 className="text-2xl font-semibold text-gray-600">
                        Seize the <span className=" text-pink-500">Deal</span>
                    </h2>
                    <p className="text-sm text-gray-500 font-thin">
                        Make It Happen. Act Without Delay.
                    </p>
                </div>
            )}

            <ProductGrid products={paginatedProducts} />

            {products.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                    <button
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        First
                    </button>
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1 text-sm rounded-md ${
                                currentPage === page
                                    ? "bg-pink-600 text-white"
                                    : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                    <button
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Last
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;