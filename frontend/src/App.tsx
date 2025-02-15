import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import AddInventory from "./pages/AddInventory";

function App() {
  // States for the inventories API call
  const [inventories, setInventories] = useState<any>([]);
  const [inventoriesError, setInventoriesError] = useState<any>(null);
  const [loadingInventories, setLoadingInventories] = useState<boolean>(false);

  // States for the locations API call
  const [locations, setLocations] = useState([]);
  const [locationsError, setLocationsError] = useState<any>(null);
  const [loadingLocations, setLoadingLocations] = useState<boolean>(false);

  const [locationId, setLocationId] = useState("all");
  const [sortOption, setSortOption] = useState("name_ASC");

  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  const fetchInventories = async () => {
    setLoadingInventories(true);
    try {
      const response = await fetch(
        `http://localhost:5000/inventories?limit=${limit}&offset=${offset}&count=${locationId}&sortBy=${
          sortOption.split("_")[0]
        }&order=${sortOption.split("_")[1]}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
        5;
      }
      const jsonData = await response.json();
      setInventories(jsonData);
    } catch (err) {
      setInventoriesError(err);
    } finally {
      setLoadingInventories(false);
    }
  };

  const fetchLocations = async () => {
    setLoadingLocations(true);
    try {
      const response = await fetch("http://localhost:5000/locations");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setLocations(jsonData);
    } catch (err) {
      setLocationsError(err);
    } finally {
      setLoadingLocations(false);
    }
  };

  useEffect(() => {
    fetchInventories();
    fetchLocations();
  }, [limit, offset, locationId, sortOption]);

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page]);

  // console.log({ inventories }, { locations });

  if (loadingInventories || loadingLocations) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (inventoriesError || locationsError) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Error occurred: {inventoriesError || locationsError}
      </h2>
    );
  }

  return (
    <div className="container">
      <h1>Hello World</h1>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              inventories={inventories.inventories}
              locations={locations}
              total={inventories.total}
              limit={limit}
              page={page}
              setPage={setPage}
              locationId={locationId}
              setLocationId={setLocationId}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          }
        />
        <Route path="/add" element={<AddInventory locations={locations} />} />
      </Routes>
    </div>
  );
}

export default App;
