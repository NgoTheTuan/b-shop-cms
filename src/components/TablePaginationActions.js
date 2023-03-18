import { useState } from "react";
import Pagination from "@mui/material/Pagination";

export default function MyPagination(props) {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    props.onChangePage(value);
  };

  return (
    <Pagination count={props.totalPages} page={page} onChange={handleChange} />
  );
}
