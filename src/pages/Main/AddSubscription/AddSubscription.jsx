import { ArrowLeft, Plus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSubscriptionCreateMutation } from "../../../redux/features/subscriptionSlice";
import { useState } from "react";
import toast from "react-hot-toast";

const AddSubscription = () => {
  const [subscriptionCreate] = useSubscriptionCreateMutation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [interval, setInterval] = useState("");
  const [features, setFeatures] = useState([""]); // Start with one empty feature
  const [interval_count, setIntervalCount] = useState("");

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   subscriptionCreate({
  //     name,
  //     price: Number(price),
  //     interval,
  //     features: features.filter((f) => f.trim() !== ""),
  //     interval_count: Number(interval_count),
  //   });
  //   navigate("/subscription");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await subscriptionCreate({
        name,
        price: Number(price),
        interval,
        features: features.filter((f) => f.trim() !== ""),
        interval_count: Number(interval_count),
      }).unwrap();
      console.log(result)

      toast.success( result?.message || 'Subscription created successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      navigate("/subscription");
    } catch (error) {
      toast.error( error.data?.message || 'Failed to create subscription', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  return (
    <div className="min-h-screen p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 py-5 px-2">
        <Link to={"/subscription"}>
          <button className="hover:bg-gray-700 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <h1 className="text-xl font-semibold">Add Subscription</h1>
      </div>

      <div className="w-full mx-auto p-8 rounded-3xl bg-[#212121]">
        {/* Form Header */}
        <h1 className="text-2xl py-4 font-medium">Add Subscription Package</h1>
        <hr className="border-gray-600" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 py-8">
          {/* Package Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Package Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Monthly"
                className="w-full h-12 px-4 bg-[#212121] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Package Amount
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Package Amount"
                className="w-full h-12 px-4 bg-[#212121] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Package Duration
              </label>
              <select
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                className="w-full h-12 px-4 bg-[#212121] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                required
              >
                <option value="">Select Interval</option>
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Interval Count
              </label>
              <input
                type="number"
                value={interval_count}
                onChange={(e) => setIntervalCount(e.target.value)}
                placeholder="e.g., 3 for 3 months"
                className="w-full h-12 px-4 bg-[#212121] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Package Features */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Package Features
            </label>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 h-12 px-4 bg-[#212121] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="p-2 text-red-500 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="flex items-center gap-2 mt-2 text-sm text-[#CAEA31] hover:text-[#b5d72c] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Another Feature
              </button>
            </div>
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
