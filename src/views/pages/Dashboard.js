import WrapperPages from "../../components/Wrapper";
import { TransactionService } from "../../network/transactionService";
import { useEffect, useState } from "react";

function Dashboard() {
  // const [dataTransaction, setDataTransaction] = useState([]);

  // const getDataTransaction = async () => {
  //   try {
  //     await TransactionService.getData().then((res) => {
  //       if (res.length > 0) {
  //         setDataTransaction(res);

  //         let dataSort = [];
  //       }
  //     });
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   getDataTransaction();
  // }, []);

  return <WrapperPages>Dashboard</WrapperPages>;
}

export default Dashboard;
