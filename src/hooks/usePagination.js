import { useState } from "react";

export function usePagination(initialPage = 1, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber < 1) return; //처음 (검증로직)
    if (pageNumber > totalPages) return; //끝
    setCurrentPage(pageNumber);
  };

  const next = () => {
    goToPage(currentPage + 1);
  };

  const prev = () => {
    goToPage(currentPage - 1);
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    setTotalItems,
    goToPage,
    next,
    prev,
    setCurrentPage,
  };
}
