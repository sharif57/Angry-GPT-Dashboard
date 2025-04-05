// import { ArrowLeft } from "lucide-react";
// import { useState, useEffect } from "react";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import {
//   useSingleBookDetailsQuery,
//   useUpdateBookMutation,
// } from "../../../redux/features/BooksSlice";
// import Swal from "sweetalert2";

// export default function AddBookEdit() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { data: bookDetails, isLoading } = useSingleBookDetailsQuery(id);
//   const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

//   const [bookData, setBookData] = useState({
//     title: "",
//     price: "",
//     author: "",
//     description: "",
//     stock: "",
//     images: [],
//     imagePreviews: [],
//     existingImages: [],
//   });

//   // Load book details when available
//   useEffect(() => {
//     if (bookDetails?.data) {
//       const book = bookDetails.data;
//       setBookData({
//         title: book.title,
//         price: book.price,
//         author: book.author,
//         description: book.description,
//         stock: book.stock,
//         images: [],
//         imagePreviews: [],
//         existingImages: book.images || [],
//       });
//     }
//   }, [bookDetails]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBookData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     if (files.length > 0) {
//       const newImagePreviews = files.map(file => URL.createObjectURL(file));
      
//       setBookData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...files],
//         imagePreviews: [...prev.imagePreviews, ...newImagePreviews],
//       }));
//     }
//   };

//   const removeImage = (index, isExisting = false) => {
//     if (isExisting) {
//       setBookData(prev => ({
//         ...prev,
//         existingImages: prev.existingImages.filter((_, i) => i !== index)
//       }));
//     } else {
//       // Revoke the object URL to prevent memory leaks
//       URL.revokeObjectURL(bookData.imagePreviews[index]);
      
//       setBookData(prev => ({
//         ...prev,
//         images: prev.images.filter((_, i) => i !== index),
//         imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("title", bookData.title);
//       formData.append("author", bookData.author);
//       formData.append("description", bookData.description);
//       formData.append("price", bookData.price);
//       formData.append("stock", bookData.stock);

//       // Append existing images that haven't been removed
//       bookData.existingImages.forEach(image => {
//         formData.append("existingImages", image);
//       });

//       // Append new images
//       bookData.images.forEach(image => {
//         formData.append("images", image);
//       });

//       const response = await updateBook({ id: id, book: formData }).unwrap();

//       if (response?.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.message || "Book updated successfully",
//           confirmButtonColor: "#CAEA31",
//         });
//         navigate("/books");
//       } else {
//         throw new Error(response?.message || "Failed to update book");
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error?.data?.message || "Something went wrong. Please try again.",
//         confirmButtonColor: "#CAEA31",
//       });
//       console.error("Update error:", error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="text-center py-8 text-white">Loading book details...</div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center gap-4 py-4 px-3">
//         <Link to={"/books"}>
//           <button className="p-2 rounded-full transition-colors hover:bg-gray-700">
//             <ArrowLeft className="w-5 h-5 text-white" />
//           </button>
//         </Link>
//         <h1 className="text-xl font-semibold text-white">Books</h1>
//       </div>
//       <div className="flex items-center justify-center bg-[#212121] p-6">
//         <div className="w-full bg-[#212121] p-6 rounded-lg shadow-lg text-white">
//           <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
//           <hr className="border-gray-600 mb-4" />

//           <form onSubmit={handleSubmit}>
//             {/* Image Upload */}
//             <div className="mb-4">
//               <label
//                 htmlFor="imageUpload"
//                 className="inline-block mb-2 p-2 rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-700 transition-colors"
//               >
//                 <FaCloudUploadAlt size={20} className="inline mr-2" />
//                 <span>Upload Images</span>
//               </label>
//               <input
//                 type="file"
//                 id="imageUpload"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageUpload}
//                 multiple
//               />
              
//               <div className="flex flex-wrap gap-4 mt-4">
//                 {/* Existing Images */}
//                 {bookData.existingImages.map((image, index) => (
//                   <div key={`existing-${index}`} className="relative group">
//                     <img
//                       src={`${import.meta.env.VITE_IMAGE_API}${image}`}
//                       alt={`Book Preview ${index + 1}`}
//                       className="w-28 h-32 object-cover rounded-lg border border-gray-600"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index, true)}
//                       className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
                
//                 {/* Newly Uploaded Images */}
//                 {bookData.imagePreviews.map((preview, index) => (
//                   <div key={`new-${index}`} className="relative group">
//                     <img
//                       src={preview}
//                       alt={`New Preview ${index + 1}`}
//                       className="w-28 h-32 object-cover rounded-lg border border-gray-600"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Book Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//               <div>
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Book Title*"
//                   value={bookData.title}
//                   onChange={handleChange}
//                   className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="Price*"
//                   value={bookData.price}
//                   onChange={handleChange}
//                   className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
//                   min="0"
//                   step="0.01"
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="author"
//                   placeholder="Author Name*"
//                   value={bookData.author}
//                   onChange={handleChange}
//                   className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   name="stock"
//                   placeholder="Stock Quantity*"
//                   value={bookData.stock}
//                   onChange={handleChange}
//                   className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
//                   min="0"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mb-4">
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={bookData.description}
//                 onChange={handleChange}
//                 className="bg-[#212121] p-3 h-[200px] rounded-xl w-full outline-none border"
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-center pt-6">
//               <button
//                 type="submit"
//                 disabled={isUpdating}
//                 className="bg-[#CAEA31] text-black px-16 py-3 rounded-xl transition-colors font-medium hover:bg-[#b5d72c] disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {isUpdating ? "Updating..." : "Update"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useSingleBookDetailsQuery,
  useUpdateBookMutation,
} from "../../../redux/features/BooksSlice";
import Swal from "sweetalert2";

export default function AddBookEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: bookDetails, isLoading } = useSingleBookDetailsQuery(id);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [bookData, setBookData] = useState({
    title: "",
    price: "",
    author: "",
    description: "",
    stock: "",
    images: [], // New images to be uploaded
    imagePreviews: [], // Preview URLs for new images
    existingImages: [], // Existing images from server
    removedImages: [], // Track images to be removed
  });

  // Load book details when available
  useEffect(() => {
    if (bookDetails?.data) {
      const book = bookDetails.data;
      setBookData({
        title: book.title,
        price: book.price,
        author: book.author,
        description: book.description,
        stock: book.stock,
        images: [],
        imagePreviews: [],
        existingImages: book.images || [],
        removedImages: [],
      });
    }
  }, [bookDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newImagePreviews = files.map(file => URL.createObjectURL(file));
      
      setBookData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
        imagePreviews: [...prev.imagePreviews, ...newImagePreviews],
      }));
    }
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      // Add to removedImages array and remove from existingImages
      const removedImage = bookData.existingImages[index];
      setBookData(prev => ({
        ...prev,
        existingImages: prev.existingImages.filter((_, i) => i !== index),
        removedImages: [...prev.removedImages, removedImage]
      }));
    } else {
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(bookData.imagePreviews[index]);
      
      setBookData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
        imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", bookData.title);
      formData.append("author", bookData.author);
      formData.append("description", bookData.description);
      formData.append("price", bookData.price);
      formData.append("stock", bookData.stock);

      // Append existing images that haven't been removed
      bookData.existingImages.forEach(image => {
        formData.append("existingImages", image);
      });

      // Append new images
      bookData.images.forEach(image => {
        formData.append("images", image);
      });

      // Append removed images to be deleted from server
      bookData.removedImages.forEach(image => {
        formData.append("removedImages", image);
      });

      const response = await updateBook({ id: id, book: formData }).unwrap();

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.message || "Book updated successfully",
          confirmButtonColor: "#CAEA31",
        });
        navigate("/books");
      } else {
        throw new Error(response?.message || "Failed to update book");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#CAEA31",
      });
      console.error("Update error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-white">Loading book details...</div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 py-4 px-3">
        <Link to={"/books"}>
          <button className="p-2 rounded-full transition-colors hover:bg-gray-700">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <h1 className="text-xl font-semibold text-white">Books</h1>
      </div>
      <div className="flex items-center justify-center bg-[#212121] p-6">
        <div className="w-full bg-[#212121] p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
          <hr className="border-gray-600 mb-4" />

          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="mb-4">
              <label
                htmlFor="imageUpload"
                className="inline-block mb-2 p-2 rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <FaCloudUploadAlt size={20} className="inline mr-2" />
                <span>Upload Images</span>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                multiple
              />
              
              <div className="mt-2 text-sm text-gray-400">
                {bookData.existingImages.length + bookData.imagePreviews.length} images selected
                {bookData.removedImages.length > 0 && (
                  <span>, {bookData.removedImages.length} images removed</span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                {/* Existing Images */}
                {bookData.existingImages.map((image, index) => (
                  <div key={`existing-${index}`} className="relative group">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_API}${image}`}
                      alt={`Book Preview ${index + 1}`}
                      className="w-28 h-32 object-cover rounded-lg border border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, true)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {/* Newly Uploaded Images */}
                {bookData.imagePreviews.map((preview, index) => (
                  <div key={`new-${index}`} className="relative group">
                    <img
                      src={preview}
                      alt={`New Preview ${index + 1}`}
                      className="w-28 h-32 object-cover rounded-lg border border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Book Title*"
                  value={bookData.title}
                  onChange={handleChange}
                  className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="price"
                  placeholder="Price*"
                  value={bookData.price}
                  onChange={handleChange}
                  className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="author"
                  placeholder="Author Name*"
                  value={bookData.author}
                  onChange={handleChange}
                  className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock Quantity*"
                  value={bookData.stock}
                  onChange={handleChange}
                  className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <textarea
                name="description"
                placeholder="Description"
                value={bookData.description}
                onChange={handleChange}
                className="bg-[#212121] p-3 h-[200px] rounded-xl w-full outline-none border"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-[#CAEA31] text-black px-16 py-3 rounded-xl transition-colors font-medium hover:bg-[#b5d72c] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}