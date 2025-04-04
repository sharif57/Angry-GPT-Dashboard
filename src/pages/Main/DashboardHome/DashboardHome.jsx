import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import { useAllTransactionGetQuery } from "../../../redux/features/transactionSlice";
import BarChartComponent from "./BarChart";

const DashboardHome = () => {
  const {data} =useAllTransactionGetQuery()
  console.log(data?.meta)
  return (
    <div className="space-y-[24px] ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10  gap-y-10 w-4/5">
        <div className=" flex items-center justify-center gap-6 border border-[#CAEA31] px-[24px] py-[20px] rounded-lg space-y-3 bg-[#212121] w-[381px] md:w-full">
          <div className="text-center">
            <h3 className="text-[20px] text-[#EFF8BF]">{"App Transaction"}</h3>
            <h3 className="text-[30px] font-extralight text-[#CAEA31]">
              {`${data?.meta?.byApp} `}
            </h3>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-6 border border-[#CAEA31] px-[24px] py-[20px] rounded-lg space-y-3 bg-[#212121]  md:w-full">
          <div className="text-center">
            <h3 className="text-[20px] text-[#EFF8BF]">{"Web Transaction"}</h3>
            <h3 className="text-[30px] font-extralight text-[#CAEA31]">
            {`${data?.meta?.byWeb} `}
            </h3>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-6 border border-[#CAEA31] px-[24px] py-[20px] rounded-lg space-y-3 bg-[#212121]  md:w-full">
          <div className="text-center">
            <h3 className="text-[20px] text-[#EFF8BF]">{"Total Transaction"}</h3>
            <h3 className="text-[30px] font-extralight text-[#CAEA31]">
            {`${data?.meta?.total} `}
            </h3>
          </div>
        </div>
      </div>
      {/* <BarChartComponent /> */}
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
