import { Modal, Table } from "antd";
import { useState } from "react";

const TransactionHistoryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const showModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "#SI",
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
      title: "Subscription",
      key: "Subscription",
      dataIndex: "Subscription",
    },
    {
      title: "Amount",
      key: "Amount",
      dataIndex: "Amount",
    },
    {
      title: "Action",
      key: "Review",
      aligen: "center",
      render: (record, data) => (
        <div className="  items-center justify-around textcenter flex">
          {/* Review Icon */}
          {/* <img
            src={exlamIcon}
            alt=""
            className="btn  px-3 py-1 text-sm rounded-full "
          /> */}
          <svg
            onClick={() => showModal(record)}
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

          {/* <Link to={'/reviews'} className="btn bg-black text-white px-3 py-1 text-sm rounded-full">
           
            View
          </Link> */}
        </div>
      ),
    },
  ];

  const data = [];
  for (let index = 0; index < 6; index++) {
    data.push({
      transIs: `${index + 1}`,
      name: "Henry",
      Email: "sharif@gmail.com",
      Subscription: "Yearly",
      Amount: "99",
      Review: "See Review",
      date: "16 Apr 2024",
      _id: index,
    });
  }

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-white mb-4 pl-2">Recent Users</h3>
      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        className="rounded-lg bg-[#212121]"
      />
      <Modal
        title="Transaction Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedTransaction && (
          <div>
            <p>
              <strong>ID:</strong> {selectedTransaction.transIs}
            </p>
            <p>
              <strong>Name:</strong> {selectedTransaction.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedTransaction.Email}
            </p>
            <p>
              <strong>Subscription:</strong> {selectedTransaction.Subscription}
            </p>
            <p>
              <strong>Amount:</strong> ${selectedTransaction.Amount}
            </p>
            <p>
              <strong>Date:</strong> {selectedTransaction.date}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TransactionHistoryTable;
