
// import { useState } from "react";
// import { useAllOrderGetQuery } from "../../../redux/features/orderSlice";

// const ordersData = Array.from({ length: 42 }, (_, index) => ({
//   id: index + 1,
//   product: {
//     name: "Book Name",
//     date: "8 Sep, 2020",
//     time: "01:40 am",
//     image: "/books.png", // Replace with actual image URL
//   },
//   customer: "Darrell Steward",
//   transactionId: "TXN-93A7CD58",
//   price: "$202.87",
//   stock: "40/200",
//   status: index % 2 === 0 ? "Success" : "Pending",
// }));

// const statusColors = {
//   Success: "bg-green-500",
//   Pending: "bg-blue-500",
// };

// export default function ManageOrders() {
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const {data} =  useAllOrderGetQuery()
//   console.log(data)
//   const ordersPerPage = 7;

//   const filteredOrders =
//     statusFilter === "All"
//       ? ordersData
//       : ordersData.filter((order) => order.status === statusFilter);

//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
//   const displayedOrders = filteredOrders.slice(
//     (currentPage - 1) * ordersPerPage,
//     currentPage * ordersPerPage
//   );

//   return (
//     <div className="min-h-screen  text-white ">
//       <div className="w-full mx-auto bg-[#212121] p-6 rounded-lg shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Order List</h2>
//           <span className="text-gray-400">Total: {filteredOrders.length}</span>
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex space-x-3 mb-4">
//           {["All", "Pending", "Success"].map((status) => (
//             <button
//               key={status}
//               className={`px-4 py-2 rounded-full text-sm font-medium ${
//                 statusFilter === status
//                   ? "bg-[#CAEA31] text-gray-900"
//                   : "bg-gray-700"
//               }`}
//               onClick={() => {
//                 setStatusFilter(status);
//                 setCurrentPage(1);
//               }}
//             >
//               {status}
//             </button>
//           ))}
//         </div>

//         {/* Orders Table */}
//         <div className="w-full overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-gray-400 border-b border-gray-600">
//                 <th className="p-3">Product</th>
//                 <th className="p-3">Customer</th>
//                 <th className="p-3">Transaction ID</th>
//                 <th className="p-3">Price</th>
//                 <th className="p-3">Stock</th>
//                 <th className="p-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayedOrders.map((order) => (
//                 <tr key={order.id} className="border-b border-gray-700 ">
//                   <td className="p-3 flex items-center space-x-3 ">
//                     <img
//                       src={order.product.image}
//                       alt="Book"
//                       className="w-12 h-12 rounded-lg"
//                     />
//                     <div>
//                       <p className="font-medium">{order.product.name}</p>
//                       <p className="text-sm text-gray-400">
//                         {order.product.date} | {order.product.time}
//                       </p>
//                     </div>
//                   </td>
//                   <td className="p-3">{order.customer}</td>
//                   <td className="p-3">{order.transactionId}</td>
//                   <td className="p-3">{order.price}</td>
//                   <td className="p-3">{order.stock}</td>
//                   <td className="p-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         statusColors[order.status]
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-6">
//           <button
//             className={`px-4 py-2 rounded-lg text-gray-900 ${
//               currentPage > 1 ? "bg-lime-500" : "bg-gray-600 cursor-not-allowed"
//             }`}
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             &larr; Previous
//           </button>

//           <div className="flex items-center space-x-2">
//             <span>{currentPage}</span>
//             <span className="text-gray-400">/</span>
//             <span>{totalPages}</span>
//           </div>

//           <button
//             className={`px-4 py-2 rounded-lg text-gray-900 ${
//               currentPage < totalPages
//                 ? "bg-lime-500"
//                 : "bg-gray-600 cursor-not-allowed"
//             }`}
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useGetAllOrdersQuery } from "../../../redux/features/orderSlice";

const statusColors = {
  success: "bg-green-500",
  pending: "bg-blue-500",
  cancel: "bg-red-500",
  shipped: "bg-yellow-500",
};

export default function ManageOrders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const { data: ordersResponse, isLoading } = useGetAllOrdersQuery({
    state: statusFilter === "all" ? undefined : statusFilter,
    limit: ordersPerPage,
    page: currentPage,
  });

  const ordersData = ordersResponse?.data || [];
  const totalOrders = ordersResponse?.meta?.pagination?.total || 0;
  const totalPages = ordersResponse?.meta?.pagination?.totalPage || 1;

  const IMAGE = import.meta.env.VITE_IMAGE_API

  return (
    <div className="min-h-screen text-white">
      <div className="w-full mx-auto bg-[#212121] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order List</h2>
          <span className="text-gray-400">Total: {totalOrders}</span>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-3 mb-4">
          {["all", "pending", "shipped", "success", "cancel"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                statusFilter === status
                  ? "bg-[#CAEA31] text-gray-900"
                  : "bg-gray-700"
              }`}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 border-b border-gray-600">
                <th className="p-3">Product</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-3 text-center">Loading...</td>
                </tr>
              ) : ordersData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-3 text-center">No orders found</td>
                </tr>
              ) : (
                ordersData.map((order) => (
                  <tr key={order._id} className="border-b border-gray-700">
                    <td className="p-3 flex items-center space-x-3">
                      {order.details[0]?.book?.images?.[0] && (
                        <img
                        src={`${IMAGE}${order.details[0].book.images[0]}`}
                          alt="Book"
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">
                          {order.details[0]?.book?.title || "Unknown Book"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()} |{" "}
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      {order.customer?.name || "Unknown Customer"}
                    </td>
                    <td className="p-3">
                      {order.transaction?.transaction_id || "N/A"}
                    </td>
                    <td className="p-3">${order.amount.toFixed(2)}</td>
                    <td className="p-3">
                      {order.details.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          statusColors[order.state.toLowerCase()] || "bg-gray-500"
                        }`}
                      >
                        {order.state.charAt(0).toUpperCase() +
                          order.state.slice(1).toLowerCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            className={`px-4 py-2 rounded-lg text-gray-900 ${
              currentPage > 1 ? "bg-lime-500" : "bg-gray-600 cursor-not-allowed"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &larr; Previous
          </button>

          <div className="flex items-center space-x-2">
            <span>{currentPage}</span>
            <span className="text-gray-400">/</span>
            <span>{totalPages}</span>
          </div>

          <button
            className={`px-4 py-2 rounded-lg text-gray-900 ${
              currentPage < totalPages
                ? "bg-lime-500"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
