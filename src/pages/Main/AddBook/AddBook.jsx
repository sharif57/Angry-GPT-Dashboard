// import { ArrowLeft } from "lucide-react";
// import { useState } from "react";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { usePostBookMutation } from "../../../redux/features/BooksSlice";
// import Swal from "sweetalert2";

// export default function AddBook() {
//   const navigate = useNavigate();
//   const [postBook, { isLoading }] = usePostBookMutation();
  
//   const [bookData, setBookData] = useState({
//     title: "",
//     price: "",
//     author: "",
//     description: "",
//     stock: "",
//     images: null,
//     imagePreview: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBookData({ ...bookData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setBookData({ ...bookData, images: file, imagePreview: imageUrl });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate required fields
//     if (!bookData.title || !bookData.author || !bookData.price || !bookData.images) {
//       Swal.fire({
//         icon: "error",
//         title: "Missing Fields",
//         text: "Please fill all required fields and upload an image",
//       });
//       return;
//     }

//     try {
//       // Create FormData for file upload
//       const formData = new FormData();
//       formData.append("title", bookData.title);
//       formData.append("author", bookData.author);
//       formData.append("description", bookData.description);
//       formData.append("price", bookData.price);
//       formData.append("stock", bookData.stock || "0"); // Default to 0 if not provided
//       formData.append("images", bookData.images);

//       // Make API call
//       const response = await postBook(formData).unwrap();

//       if (response?.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.message || "Book created successfully",
//         });
//         navigate("/books"); // Redirect to books list after success
//       } else {
//         throw new Error(response?.message || "Failed to create book");
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error?.data?.message || "Something went wrong. Please try again.",
//       });
//     }
//   };

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
//           <h2 className="text-xl font-semibold mb-4">Add a new book</h2>
//           <hr className="border-gray-600 mb-4" />

//           <form onSubmit={handleSubmit}>
//             {/* Image Upload */}
//             <div className="mb-4 flex items-center gap-4">
//               <label
//                 htmlFor="imageUpload"
//                 className="w-28 h-32 flex items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer overflow-hidden bg-[#4D4D4D]"
//               >
//                 {bookData.imagePreview ? (
//                   <img
//                     src={bookData.imagePreview}
//                     alt="Uploaded Preview"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex flex-col items-center">
//                     <FaCloudUploadAlt size={24} />
//                     <span className="text-sm">Upload Image</span>
//                   </div>
//                 )}
//               </label>
//               <input
//                 type="file"
//                 id="imageUpload"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageUpload}
//                 required
//               />
//             </div>

//             {/* Book Title, Price, Author, and Stock */}
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
//                   placeholder="Stock Quantity"
//                   value={bookData.stock}
//                   onChange={handleChange}
//                   className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
//                   min="0"
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
//                 disabled={isLoading}
//                 className="bg-[#CAEA31] text-black px-16 py-3 rounded-xl transition-colors font-medium hover:bg-[#b5d72c] disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { usePostBookMutation } from "../../../redux/features/BooksSlice";
import Swal from "sweetalert2";

export default function AddBook() {
  const navigate = useNavigate();
  const [postBook, { isLoading }] = usePostBookMutation();
  
  const [bookData, setBookData] = useState({
    title: "",
    price: "",
    author: "",
    description: "",
    stock: "",
    images: [],
    imagePreviews: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    const newImages = [...bookData.images];
    const newPreviews = [...bookData.imagePreviews];
    
    files.forEach(file => {
      newImages.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });
    
    setBookData({ 
      ...bookData, 
      images: newImages,
      imagePreviews: newPreviews 
    });
  };

  const removeImage = (index) => {
    const newImages = [...bookData.images];
    const newPreviews = [...bookData.imagePreviews];
    
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setBookData({
      ...bookData,
      images: newImages,
      imagePreviews: newPreviews
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!bookData.title || !bookData.author || !bookData.price || bookData.images.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all required fields and upload at least one image",
      });
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("title", bookData.title);
      formData.append("author", bookData.author);
      formData.append("description", bookData.description);
      formData.append("price", bookData.price);
      formData.append("stock", bookData.stock || "0");
      
      // Append each image file
      bookData.images.forEach((image, index) => {
        formData.append("images", image);
      });

      // Make API call
      const response = await postBook(formData).unwrap();

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.message || "Book created successfully",
        });
        navigate("/books");
      } else {
        throw new Error(response?.message || "Failed to create book");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

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
          <h2 className="text-xl font-semibold mb-4">Add a new book</h2>
          <hr className="border-gray-600 mb-4" />

          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="mb-4">
              <label
                htmlFor="imageUpload"
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer p-4 bg-[#4D4D4D]"
              >
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt size={24} className="mb-2" />
                  <span className="text-sm">Click to upload images (multiple allowed)</span>
                </div>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                multiple
                required={bookData.imagePreviews.length === 0}
              />
              
              {/* Preview uploaded images */}
              <div className="flex flex-wrap gap-4 mt-4">
                {bookData.imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-28 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Title, Price, Author, and Stock */}
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
                  placeholder="Stock Quantity"
                  value={bookData.stock}
                  onChange={handleChange}
                  className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
                  min="0"
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
                disabled={isLoading}
                className="bg-[#CAEA31] text-black px-16 py-3 rounded-xl transition-colors font-medium hover:bg-[#b5d72c] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}