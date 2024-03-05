import { ReactElement, useState } from "react";
import { Column } from "react-table";
import TableHoc from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {

    const [rows] = useState<DataType[]>([
        {
            _id: "jhvbkhvh",
            amount: 5000,
            quantity: 2,
            discount: 300,
            status: <span>Processing</span>,
            action: <Link to={`/orders/jhvbkhvh`}>View</Link>
        }
    ])

  const table = TableHoc<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    true
  )();
  return (
    <>
      <div className='mx-auto max-w-[1367px] padding-x w-full overflow-auto padding-y'>
        <h1 className=' text-white font-outfit font-bold text-[30px]'>
          My Orders
        </h1>
        <div>{table}</div>
      </div>
    </>
  );
};

export default Orders;
