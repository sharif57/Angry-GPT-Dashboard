import {  Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Subscription = () => {
  return (
    <div className="min-h-screen -8">
      <Link to={"/addsubscription"}>
        <div className="flex justify-end ">
          <button className="  bg-[#CAEA31] text-black px-4 py-2 rounded-lg  shadow-md  transition-colors">
            <div className="flex items-center gap-1">
              <Plus size={16} />
              <span>Add New Subscription</span>
            </div>
          </button>
        </div>
      </Link>

      <div className="max-w-7xl  relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-white">
          {/* Basic Plan */}
          <div className="bg-[#3A3A3A] rounded-xl shadow-md p-6 flex flex-col  border border-[#D5EE5A]">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-baseline">
                <h3 className="font-semibold text-[36px]">$9.99</h3>
                <p className="font-medium text-[14px] text-[#BABABA]">/month</p>
              </div>
            </div>

            <div className="mb-6 flex-grow">
              <ul className="space-y-3 list-disc pl-5">
                <li className="text-[16px] font-normal text-[#E0E0E0]">Unlimited AI Conversations </li>
                <li className="text-[16px] font-normal text-[#E0E0E0]">Access to Exclusive AI Personas Mimi & Lola. </li>
                <li className="text-[16px] font-normal text-[#E0E0E0]">Early Access to New Features</li>
                <li className="text-[16px] font-normal text-[#E0E0E0]">Priority AI Processing</li>
                <li className="text-[16px] font-normal text-[#E0E0E0]">Ad-Free Experience</li>
              </ul>
            </div>

            <button className="w-full py-2  bg-[#CAEA31] rounded-full text-black transition-colors">
              Delete
            </button>
          </div>
          <div className="bg-[#3A3A3A] rounded-xl shadow-md p-6 flex flex-col  border border-[#D5EE5A]">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-baseline">
                <h3 className="font-semibold text-[36px]">$79.99</h3>
                <p className="font-medium text-[14px] text-[#BABABA]">/yr</p>
              </div>
            </div>

            <div className="mb-6 flex-grow">
              <ul className="space-y-3 list-disc pl-5">
                <li className="text-[16px] font-normal text-[#E0E0E0]">Unlimited AI Conversations </li>
                <li className="text-[16px] font-normal text-[#E0E0E0]">Access to Exclusive AI Personas Mimi & Lola. </li>
                <li className="text-[16px] font-normal text-[#E0E0E0]">Early Access to New Features</li>
                <li className="text-[16px] font-normal text-[#E0E0E0]">Priority AI Processing</li>
                <li className="text-[16px] font-normal text-[#E0E0E0]">Ad-Free Experience</li>
              </ul>
            </div>

            <button className="w-full py-2  bg-[#CAEA31] rounded-full text-black transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
