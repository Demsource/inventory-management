import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import "./Main.css";

interface MainProps {
  inventories: any;
  locations: any;
  total: any;
  limit: any;
  page: any;
  setPage: any;
}

const Main: React.FC<MainProps> = ({
  inventories,
  locations,
  total,
  limit,
  page,
  setPage,
}) => {
  const paginate = (pageNum: number): void => {
    setPage(pageNum);
  };
  const nextPage = () => setPage((currentPage: any) => currentPage + 1);
  const prevPage = () => setPage((currentPage: any) => currentPage - 1);

  return (
    <div className="main">
      <div className="app-header">
        <Link to={"/add"}>
          <button type="button" className="btn btn-dark add-btn">
            Add Inventory
          </button>
        </Link>
      </div>
      <Table pageInventories={inventories} locations={locations} />
      <Pagination
        page={page}
        limit={limit}
        total={total}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default Main;
