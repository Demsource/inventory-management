import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import "./Main.css";
import ModalStatistics from "../components/ModalStatistics";
import { Button } from "react-bootstrap";
import Filter from "../components/Filter";

interface MainProps {
  inventories: any;
  locations: any;
  total: any;
  limit: any;
  page: any;
  setPage: any;
  locationId: any;
  setLocationId: any;
}

const Main: React.FC<MainProps> = ({
  inventories,
  locations,
  total,
  limit,
  page,
  setPage,
  locationId,
  setLocationId,
}) => {
  const [showStatistics, setShowStatistics] = useState(false); // State to manage statistics modal visibility

  const paginate = (pageNum: number): void => {
    setPage(pageNum);
  };
  const nextPage = () => setPage((currentPage: any) => currentPage + 1);
  const prevPage = () => setPage((currentPage: any) => currentPage - 1);

  return (
    <div className="main">
      <div className="app-header">
        <div className="filter">
          <Filter
            locationId={locationId}
            setLocationId={setLocationId}
            locations={locations}
            setPage={setPage}
          />
        </div>
        <div className="statistics-and-addition">
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowStatistics(true)}
          >
            Statistics
          </Button>
          <Link to={"/add"}>
            <button type="button" className="btn btn-dark add-btn">
              Add Inventory
            </button>
          </Link>
        </div>
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
      <ModalStatistics
        show={showStatistics}
        setShow={setShowStatistics}
        locations={locations}
      />
    </div>
  );
};

export default Main;
