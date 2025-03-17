import { useState } from "react";
import { Space, Table } from "antd";

import DashboardModal from "../../../Components/DashboardModal";

import exlamIcon from "../../../assets/images/exclamation-circle.png";
import Search from "antd/es/transfer/search";
import { Input } from "antd";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "transIs",
      key: "transIs",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone Number",
      key: "Phone",
      dataIndex: "Phone",
    },
    {
      title: "Action",
      key: "Review",
      aligen: "center",
      render: (_, data) => (
        <div className="  items-center justify-around textcenter flex ">
          {/* Review Icon */}
          {/* <img
            src={exlamIcon}
            alt=""
            className="btn  px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          /> */}
          <svg
            onClick={() => showModal(data)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3889 17.5H12.6111V10.7778H11.3889V17.5ZM12 9.03855C12.2135 9.03855 12.3923 8.96644 12.5366 8.82222C12.6808 8.678 12.7525 8.49915 12.7517 8.28567C12.7509 8.07219 12.6787 7.89374 12.5353 7.75033C12.3919 7.60693 12.2135 7.53481 12 7.534C11.7865 7.53318 11.6081 7.6053 11.4647 7.75033C11.3213 7.89537 11.2491 8.07422 11.2483 8.28689C11.2475 8.49955 11.3196 8.678 11.4647 8.82222C11.6097 8.96644 11.7881 9.03855 12 9.03855ZM12.0037 23C10.4824 23 9.05241 22.7116 7.71367 22.1347C6.37493 21.557 5.21015 20.7731 4.21933 19.7831C3.22852 18.7931 2.44426 17.6296 1.86656 16.2924C1.28885 14.9553 1 13.5257 1 12.0037C1 10.4816 1.28885 9.05159 1.86656 7.71367C2.44344 6.37493 3.22607 5.21015 4.21444 4.21933C5.20282 3.22852 6.36678 2.44426 7.70633 1.86656C9.04589 1.28885 10.4759 1 11.9963 1C13.5168 1 14.9468 1.28885 16.2863 1.86656C17.6251 2.44344 18.7899 3.22648 19.7807 4.21567C20.7715 5.20485 21.5557 6.36881 22.1334 7.70755C22.7111 9.0463 23 10.4759 23 11.9963C23 13.5168 22.7116 14.9468 22.1347 16.2863C21.5578 17.6259 20.7739 18.7907 19.7831 19.7807C18.7923 20.7707 17.6287 21.5549 16.2924 22.1334C14.9561 22.712 13.5266 23.0008 12.0037 23ZM12 21.7778C14.7296 21.7778 17.0417 20.8306 18.9361 18.9361C20.8306 17.0417 21.7778 14.7296 21.7778 12C21.7778 9.27037 20.8306 6.95833 18.9361 5.06389C17.0417 3.16944 14.7296 2.22222 12 2.22222C9.27037 2.22222 6.95833 3.16944 5.06389 5.06389C3.16944 6.95833 2.22222 9.27037 2.22222 12C2.22222 14.7296 3.16944 17.0417 5.06389 18.9361C6.95833 20.8306 9.27037 21.7778 12 21.7778Z"
              fill="#BABABA"
            />
          </svg>
        </div>
      ),
    },
  ];

  const data = [];
  for (let index = 0; index < 20; index++) {
    data.push({
      transIs: `${index + 1}`,
      name: "Henry",
      Email: "sharif@gmail.com",
      Phone: "+12746478994",
      Review: "See Review",
      date: "16 Apr 2024",
      _id: index,
    });
  }

  const { Search } = Input;
  // const suffix = (
  //   <AudioOutlined
  //     style={{
  //       fontSize: 16,
  //       color: '#1677ff',
  //     }}
  //   />
  // );
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <div className="flex justify-between items-center py-6">
        <h3 className="text-2xl   pl-2 text-white">User List</h3>
        <Search
  placeholder="User Name"
  onSearch={onSearch}
  style={{
    width: 200,
    // backgroundColor: "#212121 !important", // Light gray background
  }}
/>

      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        className="rounded-lg"
      />

      {/* Dashboard Modal */}
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      >
        <div>
          <h2 className="text-lg text-center mb-4">User Details</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>#SL</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>User Name</p>
            <p>{modalData.name}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Email</p>
            <p>{modalData.Email}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Mobile Phone</p>
            <p>{modalData.Phone}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Service</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Date</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Time</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Amount</p>
            <p>{modalData.transIs}</p>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Users;
