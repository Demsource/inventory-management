import React, { useState } from "react";
import TableInventories from "../components/TableInventories";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import "./Inventories.css";
import ModalStatistics from "../components/ModalStatistics";
import { Button } from "react-bootstrap";
import FilterInventories from "../components/FilterInventories";
import SortInventories from "../components/SortInventories";

interface InventoriesProps {
  loadingInventories: any;
  loadingLocations: any;
  inventoriesError: any;
  locationsError: any;
  inventories: any;
  locations: any;
  total: any;
  limitInventories: any;
  pageInventories: any;
  setPageInventories: any;
  inventoryFilterByLocationId: any;
  setInventoryFilterByLocationId: any;
  inventorySortOption: any;
  setInventorySortOption: any;
  handleDeleteInventory: any;
}

const Inventories: React.FC<InventoriesProps> = ({
  loadingInventories,
  loadingLocations,
  inventoriesError,
  locationsError,
  inventories,
  locations,
  total,
  limitInventories,
  pageInventories,
  setPageInventories,
  inventoryFilterByLocationId,
  setInventoryFilterByLocationId,
  inventorySortOption,
  setInventorySortOption,
  handleDeleteInventory,
}) => {
  const [showStatistics, setShowStatistics] = useState(false); // State to manage statistics modal visibility

  if (loadingInventories || loadingLocations) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (inventoriesError || locationsError) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Error occurred: {inventoriesError.message || locationsError.message}
      </h2>
    );
  }

  return (
    <div className="inventories">
      <div className="inventories-header">
        <div className="filter-and-sort">
          <FilterInventories
            inventoryFilterByLocationId={inventoryFilterByLocationId}
            setInventoryFilterByLocationId={setInventoryFilterByLocationId}
            locations={locations}
            setPageInventories={setPageInventories}
          />
          <SortInventories
            inventorySortOption={inventorySortOption}
            setInventorySortOption={setInventorySortOption}
            setPageInventories={setPageInventories}
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
          <Link to={"/add-inventory"}>
            <button type="button" className="btn btn-dark add-btn">
              Add Inventory
            </button>
          </Link>
        </div>
      </div>
      <TableInventories
        inventories={inventories}
        locations={locations}
        handleDeleteInventory={handleDeleteInventory}
      />
      <Pagination
        page={pageInventories}
        limit={limitInventories}
        total={total}
        setPage={setPageInventories}
      />
      <ModalStatistics
        show={showStatistics}
        setShow={setShowStatistics}
        locations={locations}
      />
    </div>
  );
};

export default Inventories;
