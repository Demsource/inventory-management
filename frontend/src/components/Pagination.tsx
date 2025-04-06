import React from "react";
import "./Pagination.css";
interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  setPage: any;
}

// TEMPORARY SOLUTION

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  total,
  setPage,
}: PaginationProps) => {
  const paginate = (pageNum: number): void => {
    if (pageNum > 0 && pageNum <= total) {
      setPage(pageNum);
    }
  };

  const draw = (current: number, last: number) => {
    const html = [];
    for (let i = 1; i <= last; i++) {
      if (i === 1) {
        html.push(
          <>
            <li key={i} className="page-item">
              <span
                onClick={() => paginate(i)}
                className="page-link"
                style={
                  page === i ? { background: "black", color: "white" } : {}
                }
              >
                {i}
              </span>
            </li>
            <li className="page-item" key={`${i}-dot`}>
              ...
            </li>
          </>
        );
      } else if (i === last) {
        html.push(
          <>
            <li className="page-item" key={`${i}-dot`}>
              ...
            </li>
            <li key={i} className="page-item">
              <span
                onClick={() => paginate(i)}
                className="page-link"
                style={
                  page === i ? { background: "black", color: "white" } : {}
                }
              >
                {i}
              </span>
            </li>
          </>
        );
      } else if (current - 4 < i - 1 && current + 4 > i - 1) {
        html.push(
          <>
            <li key={i} className="page-item">
              <span
                onClick={() => paginate(i)}
                className="page-link"
                style={
                  page === i ? { background: "black", color: "white" } : {}
                }
              >
                {i}
              </span>
            </li>
          </>
        );
      }
    }
    return html;
  };

  return (
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <span
          onClick={() => page !== 1 && paginate(page - 1)}
          className="page-link"
        >
          &laquo;
        </span>
      </li>
      {draw(page, Math.ceil(total / limit))}
      <li className="page-item">
        <span
          onClick={() =>
            page !== Math.ceil(total / limit) && paginate(page + 1)
          }
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
