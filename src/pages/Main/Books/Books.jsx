// import { useState } from "react";

// import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";

// // Book data
// const books = [
//   {
//     id: 1,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 2,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 3,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 4,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 5,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 6,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 7,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 8,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 9,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 10,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
//   {
//     id: 11,
//     title: "Killing Stalking Lola Season 1",
//     price: 22,
//     image: "/books.png",
//   },
// ];

// const ITEMS_PER_PAGE = 8;

// export default function AllBookStore() {
//   const [currentPage, setCurrentPage] = useState(1);

//   // Calculate total pages
//   const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

//   // Get books for the current page
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentBooks = books.slice(startIndex, endIndex);

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       <section className="py-8 sm:py-12 md:py-16 lg:py-24">
//         <div className="w-full container mx-auto px-4 sm:px-6">
//           <div>
//             <div className="relative w-[292px] mb-4"></div>
//           </div>

//           {/* Book Grid */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
//             {currentBooks.map((book) => (
//               <div
//                 href={`allBook/${book.id}`}
//                 key={book.id}
//                 className="bg-card rounded-[20px] p-3 sm:p-4 transition-all hover:shadow-lg hover:translate-y-[-4px] bg-white dark:bg-white duration-300 border border-border/40"
//               >
//                 {/* Book Image */}
//                 <div className="relative aspect-[5/4] mb-3 sm:mb-4 rounded-md overflow-hidden">
//                   <img
//                     src={book.image || "/placeholder.svg"}
//                     alt={book.title}
//                     className="object-cover object-center"
//                     sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                   />
//                 </div>

//                 {/* Book Details */}
//                 <div className="space-y-2 sm:space-y-3">
//                   <h3 className="font-medium text-lg sm:text-xl md:text-[24px] line-clamp-2 text-[#4D4D4D] dark:text-[#4D4D4D]">
//                     {book.title}
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-1">
//                       <h1 className="text-black text-base sm:text-[20px]">$</h1>
//                       <span className="text-xl sm:text-2xl md:text-[32px] font-medium dark:text-black">
//                         {book.price}
//                       </span>
//                     </div>
//                     <button
//                       size="sm"
//                       className="rounded-full  text-[#1E1E1E] font-medium px-2 sm:px-4 h-8 sm:h-10 text-xs sm:text-sm transition-colors"
//                     >
//                       <EllipsisVertical />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex items-center justify-center gap-2 mt-[100px]">
//             {/* Previous Button */}
//             <button
//               size="icon"
//               className="h-12 w-12 rounded-none text-white"
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               aria-label="Previous page"
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </button>

// {/* Page Number Buttons */}
// {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//   <button
//     key={page}
//     size="icon"
//     className={`h-12 w-12 text-sm rounded-none ${
//       page === currentPage
//         ? "bg-[#CAEA31] text-black" // Selected page style
//         : " text-black bg-[#FAFDEA]" // Unselected page style
//     }`}
//     onClick={() => handlePageChange(page)}
//     aria-current={page === currentPage ? "page" : undefined}
//   >
//     {page}
//   </button>
// ))}

// {/* Next Button */}
// <button
//   size="icon"
//   className="h-12 w-12 rounded-none text-white"
//   onClick={() => handlePageChange(currentPage + 1)}
//   disabled={currentPage >= totalPages}
//   aria-label="Next page"
// >
//   <ChevronRight className="h-6 w-6" />
// </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  const [menuOpen, setMenuOpen] = useState(null);

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);
  const toggleMenu = (id) => setMenuOpen(menuOpen === id ? null : id);
  // const handleEdit = (id) => alert(`Edit book ID: ${id}`);
  const handleDelete = (id) => alert(`Delete book ID: ${id}`);

  return (
    <div>
      <section className="">
        <div className="p-4">
          {/* Header Section */}
         

          {/* Add Subscription Button */}
          <div className="flex justify-between items-center">
          <div className="flex items-center gap-4  py-4 px-3">
            <Link to={"/"}>
              <button className="p-2 rounded-full transition-colors hover:bg-gray-700">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </Link>
            <h1 className="text-xl font-semibold text-white">Books</h1>
          </div>
            <Link to={"/addBook"}>
              <button className="flex items-center gap-2 bg-[#CAEA31] text-black px-4 py-2 rounded-lg shadow-md transition-all hover:bg-[#b6d42e]">
                {/* <Plus size={16} /> */}
                <span>Add New Book</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {currentBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-[20px] p-3 sm:p-4 transition-all hover:shadow-lg border border-gray-300 relative"
              >
                <div className="relative aspect-[5/4] mb-3 sm:mb-4 rounded-md overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="font-medium text-lg sm:text-xl md:text-[24px] text-gray-800">
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
                        onClick={() => toggleMenu(book.id)}
                        className="rounded-full p-2 text-gray-600 hover:bg-gray-200"
                      >
                        <EllipsisVertical />
                      </button>
                      {menuOpen === book.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-2 border border-gray-200 z-10">
                          <Link to={'/addBookEdit'}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            // onClick={() => handleEdit(book.id)}
                          >
                            Edit
                          </Link>
                          <button
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            onClick={() => handleDelete(book.id)}
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
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              size="icon"
              className="h-12 w-12 rounded-none text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
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
              size="icon"
              className="h-12 w-12 rounded-none text-white"
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
