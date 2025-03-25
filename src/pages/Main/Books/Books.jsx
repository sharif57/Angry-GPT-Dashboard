import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../../../redux/features/BooksSlice";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 8;

export default function AllBookStore() {
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);

  const { data, isLoading } = useGetAllBooksQuery({ limit: 100 });
  const books = data?.data || [];

  const [deleteBook] = useDeleteBookMutation();

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);
  const toggleMenu = (id) => setMenuOpen(menuOpen === id ? null : id);
  const handleDelete = async (_id) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#CAEA31",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // Call delete API
        const response = await deleteBook(_id).unwrap();

        // Show success message
        await Swal.fire({
          title: "Deleted!",
          text: response?.message || "Book has been deleted.",
          icon: "success",
          confirmButtonColor: "#CAEA31",
        });

        // Close menu and refresh data if needed
        setMenuOpen(null);
        // You might want to add: refetch(); if using RTK Query
      }
    } catch (error) {
      // Show error message
      await Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to delete book",
        icon: "error",
        confirmButtonColor: "#CAEA31",
      });
      console.error("Delete error:", error);
    }
  };

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API;

  if (isLoading) {
    return <div className="text-center py-8">Loading books...</div>;
  }

  return (
    <div>
      <section className="">
        <div className="p-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 py-4 px-3">
              <Link to={"/"}>
                <button className="p-2 rounded-full transition-colors hover:bg-gray-700">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
              </Link>
              <h1 className="text-xl font-semibold text-white">Books</h1>
            </div>
            <Link to={"/addBook"}>
              <button className="flex items-center gap-2 bg-[#CAEA31] text-black px-4 py-2 rounded-lg shadow-md transition-all hover:bg-[#b6d42e]">
                <span>Add New Book</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full  mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {currentBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-[20px] p-3 sm:p-4 transition-all hover:shadow-lg border border-gray-300 relative"
              >
                <div className="relative aspect-[5/4] mb-3 sm:mb-4 rounded-md overflow-hidden">
                  {book.images?.length > 0 ? (
                    <img
                      src={`${IMAGE_BASE_URL}${book.images[0]}`}
                      alt={book.title}
                      className="object-cover object-center w-full h-full"
                      // onError={(e) => {
                      //   e.target.onerror = null;
                      //   e.target.src = "/placeholder-book.png"; // Fallback image
                      // }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="font-medium text-lg sm:text-xl md:text-[24px] text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <h1 className="text-black text-base sm:text-[20px]">$</h1>
                      <span className="text-xl sm:text-2xl md:text-[32px] font-medium text-black">
                        {book.price}
                      </span>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(book._id)}
                        className="rounded-full p-2 text-gray-600 hover:bg-gray-200"
                      >
                        <EllipsisVertical />
                      </button>
                      {menuOpen === book._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-2 border border-gray-200 z-10">
                          <Link
                            to={`/addBookEdit/${book._id}`}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Edit
                          </Link>
                          <button
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            onClick={() => handleDelete(book._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                className="h-12 w-12 rounded-none text-white"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`h-12 w-12 text-sm rounded-none ${
                      page === currentPage
                        ? "bg-[#CAEA31] text-black"
                        : "text-black bg-[#FAFDEA]"
                    }`}
                    onClick={() => handlePageChange(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="h-12 w-12 rounded-none text-white"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
