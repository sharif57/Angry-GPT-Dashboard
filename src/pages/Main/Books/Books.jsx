// import { useState } from "react";
// import { MoreHorizontal, ArrowLeft, ArrowRight } from "lucide-react";

// const books = [
//   { id: 1, title: "Big Deal", price: "$22", image: "https://via.placeholder.com/100" },
//   { id: 2, title: "Welcome to the Jungle", price: "$22", image: "https://via.placeholder.com/100" },
//   { id: 3, title: "Shadow and Steel", price: "$22", image: "https://via.placeholder.com/100" },
//   { id: 4, title: "The Art of How to Talk to Anyone", price: "$22", image: "https://via.placeholder.com/100" },
//   { id: 5, title: "YES!", price: "$22", image: "https://via.placeholder.com/100" },
//   { id: 6, title: "From These Dark Abodes", price: "$22", image: "https://via.placeholder.com/100" },
//   { id: 7, title: "What the Investing?", price: "$22", image: "https://via.placeholder.com/100" },
//   { id: 8, title: "Your Adult ADHD", price: "$22", image: "https://via.placeholder.com/100" },
// ];

// const Books = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 12;

//   return (
//     <div className="min-h-screen bg-[#111] text-white p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">📚 Books</h1>
//         <button className="bg-[#CAEA31] text-black px-4 py-2 rounded-lg text-sm font-medium">
//           Add New Book
//         </button>
//       </div>

//       {/* Book Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {books.map((book) => (
//           <div key={book.id} className="bg-white p-4 rounded-2xl shadow-lg">
//             <img src={book.image} alt={book.title} className="w-full h-40 object-cover rounded-lg mb-3" />
//             <h2 className="text-gray-900 font-semibold">{book.title}</h2>
//             <p className="text-gray-700">{book.price}</p>
//             <button className="absolute top-2 right-2 p-1">
//               <MoreHorizontal className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-2 mt-8">
//         <button className="bg-[#CAEA31] text-black px-4 py-2 rounded-lg text-sm flex items-center">
//           <ArrowLeft className="w-4 h-4 mr-1" /> Previous
//         </button>
//         <span className="px-3 py-2 border border-gray-500 rounded-lg">{currentPage}</span>
//         <span className="px-3 py-2">...</span>
//         <span className="px-3 py-2 border border-gray-500 rounded-lg">{totalPages}</span>
//         <button className="bg-[#CAEA31] text-black px-4 py-2 rounded-lg text-sm flex items-center">
//           Next <ArrowRight className="w-4 h-4 ml-1" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Books;




import { useState } from "react";

import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";

// Book data
const books = [
  {
    id: 1,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 2,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 3,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 4,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 5,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 6,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 7,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 8,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 9,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 10,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
  {
    id: 11,
    title: "Killing Stalking Lola Season 1",
    price: 22,
    image: "/books.png",
  },
];

const ITEMS_PER_PAGE = 8; 

export default function AllBookStore() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

  // Get books for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <section className="py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="w-full container mx-auto px-4 sm:px-6">
          <div>
            <div className="relative w-[292px] mb-4">
              
            </div>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {currentBooks.map((book) => (
              <Link
                href={`allBook/${book.id}`}
                key={book.id}
                className="bg-card rounded-[20px] p-3 sm:p-4 transition-all hover:shadow-lg hover:translate-y-[-4px] bg-white dark:bg-white duration-300 border border-border/40"
              >
                {/* Book Image */}
                <div className="relative aspect-[5/4] mb-3 sm:mb-4 rounded-md overflow-hidden">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Book Details */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="font-medium text-lg sm:text-xl md:text-[24px] line-clamp-2 text-[#4D4D4D] dark:text-[#4D4D4D]">
                    {book.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <h1 className="text-black text-base sm:text-[20px]">$</h1>
                      <span className="text-xl sm:text-2xl md:text-[32px] font-medium dark:text-black">
                        {book.price}
                      </span>
                    </div>
                    <button
                      size="sm"
                      className="rounded-full  text-[#1E1E1E] font-medium px-2 sm:px-4 h-8 sm:h-10 text-xs sm:text-sm transition-colors"
                    >
                      <EllipsisVertical />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-2 mt-[100px]">
            {/* Previous Button */}
            <button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-none"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                variant="ghost"
                size="icon"
                className={`h-12 w-12 text-sm rounded-none ${
                  page === currentPage
                    ? "bg-[#CAEA31] text-black" // Selected page style
                    : " text-black bg-[#FAFDEA]" // Unselected page style
                }`}
                onClick={() => handlePageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-none"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
