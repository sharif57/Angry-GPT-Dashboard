import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSingleBookDetailsMutation } from "../../../redux/features/BooksSlice";

export default function AddBookEdit() {
  const [bookData, setBookData] = useState({
    name: "",
    price: "",
    author: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  const {data}= useSingleBookDetailsMutation()
  console.log(data)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBookData({ ...bookData, image: file, imagePreview: imageUrl });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book Data:", bookData);
  };

  return (
    <div>
      <div className="flex items-center gap-4  py-4 px-3">
        <Link to={"/books"}>
          <button className="p-2 rounded-full transition-colors hover:bg-gray-700">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <h1 className="text-xl font-semibold text-white">Books</h1>
      </div>
      <div className=" flex items-center justify-center bg-[#212121] p-6">
        <div className="w-full  bg-[#212121] p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-xl font-semibold mb-4">Edit your books</h2>
          <hr className="border-gray-600 mb-4" />

          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="mb-4 flex items-center gap-4">
              <label
                htmlFor="imageUpload"
                className="w-28 h-32 flex items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer overflow-hidden bg-[#4D4D4D]"
              >
                {bookData.imagePreview ? (
                  <img
                    src={bookData.imagePreview}
                    alt="Uploaded Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <FaCloudUploadAlt size={24} />
                    <span className="text-sm">Upload Image</span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Book Name, Price, and Author */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Book Name"
                value={bookData.name}
                onChange={handleChange}
                className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={bookData.price}
                onChange={handleChange}
                className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
              />
              <input
                type="text"
                name="author"
                placeholder="Author Name"
                value={bookData.author}
                onChange={handleChange}
                className="bg-[#212121] p-3 rounded-xl w-full outline-none border"
              />
            </div>

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              value={bookData.description}
              onChange={handleChange}
              className="bg-[#212121] p-3 h-[200px] rounded-xl w-full outline-none border"
            ></textarea>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-[#CAEA31] text-black px-16 py-3 rounded-xl transition-colors font-medium hover:bg-[#b5d72c]"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
