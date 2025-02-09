import React from "react";
import "./Pagination.css";
interface PaginationProps {
  page: any;
  limit: any;
  total: any;
  paginate: any;
  nextPage: any;
  prevPage: any;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  total,
  paginate,
  nextPage,
  prevPage,
}: PaginationProps) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <span onClick={() => page !== 1 && prevPage()} className="page-link">
          &laquo;
        </span>
      </li>
      {pageNumbers.map((num) => (
        <li key={num} className="page-item">
          <span
            onClick={() => paginate(num)}
            className="page-link"
            style={page === num ? { background: "black", color: "white" } : {}}
          >
            {num}
          </span>
        </li>
      ))}
      <li className="page-item">
        <span
          onClick={() => page !== Math.ceil(total / limit) && nextPage()}
          className="page-link"
        >
          &raquo;
        </span>
      </li>
      <li className="total">
        <span>{total}</span>
      </li>
    </ul>
  );
};

export default Pagination;
