import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddSubscription = () => {
  return (
    <div className="min-h-screen p-6  text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 py-5 px-2">
        <Link to={"/subscription"}>
          <button className="hover:bg-gray-700 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <h1 className="text-xl font-semibold">Add Subscription</h1>
      </div>

      <div className="w-full  mx-auto p-8 rounded-3xl bg-[#212121]">
        {/* Form Header */}
        <h1 className="text-2xl py-4 font-medium">Add Subscription Package</h1>
        <hr className="border-gray-600" />

        {/* Form */}
        <form className="space-y-6 py-8">
          {/* Package Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Package Name</label>
              <input
                type="text"
                placeholder="Monthly"
                className="w-full h-12 px-4 bg-[#212121] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Package Amount</label>
              <input
                type="text"
                placeholder="Package Amount"
                className="w-full h-12 px-4 bg-[#212121] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Package Duration</label>
              <input
                type="text"
                placeholder="Package Duration"
                className="w-full h-12 px-4 bg-[#212121] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Package Features */}
          <div>
            <label className="block mb-2 text-sm font-medium">Package Features</label>
            <input
              type="text"
              placeholder="Enter Features (comma separated)"
              className="w-full h-12 px-4 bg-[#212121] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
            />
          </div>

          {/* Create Button */}
          <div className="flex justify-center pt-12">
            <button
              type="submit"
              className="bg-[#CAEA31] text-black px-16 py-3 rounded-xl transition-colors font-medium hover:bg-[#b5d72c]"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;
