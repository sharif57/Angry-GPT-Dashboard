import { ArrowLeft, Image } from "lucide-react";
import { Link } from "react-router-dom";

const AddSubscription = () => {
  return (
    <div className="min-h-screen  ">
      <div className="flex items-center gap-3 mb-8  py-5 px-2 rounded-t-xl">
        <Link to={"/subscription"}>
          <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <h1 className="text-xl font-semibold text-white">Add Subscription</h1>
      </div>
      <div className="w-full px-6 mx-start  rounded-3xl bg-[#212121]">
        {/* Header */}
        <h1 className="text-[24px] py-6 font-medium text-white">Add Subscription Package</h1>

        <hr />
        {/* Form */}
        <form className="space-y-4 py-8">
          {/* Package Amount and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Monthly"
                className="w-full h-12 px-4 bg-[#212121] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Package Amount"
                className="w-full h-12 px-4 bg-[#212121] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Package Duration"
                className="w-full h-12 px-4 bg-[#212121] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Add Features */}
          <div>
            <input
              type="text"
              placeholder="Package Features"
              className="w-full h-12 px-4 bg-[#212121] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
            />
          </div>

          {/* Create Button */}
          <div className="flex justify-center pt-12">
            <button
              type="submit"
              className="bg-[#CAEA31] text-black px-16  py-3 rounded-xl  transition-colors font-medium"
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
