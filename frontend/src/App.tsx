import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Inventories from "./pages/Inventories";
import AddInventory from "./pages/AddInventory";
import AppHeader from "./components/AppHeader";
import Locations from "./pages/Locations";
import AddLocation from "./pages/AddLocation";
import EditLocation from "./pages/EditLocation";

function App() {
  // States for the queried inventories API call
  const [inventoriesQueried, setInventoriesQueried] = useState<any>([]);
  const [inventoriesQueriedError, setInventoriesQueriedError] =
    useState<any>(null);
  const [loadingInventoriesQueried, setLoadingInventoriesQueried] =
    useState<boolean>(false);

  // States for the all locations API call
  const [locationsAll, setLocationsAll] = useState<any>([]);
  const [locationsAllError, setLocationsAllError] = useState<any>(null);
  const [loadingLocationsAll, setLoadingLocationsAll] =
    useState<boolean>(false);

  // States for the queried locations API call
  const [locationsQueried, setLocationsQueried] = useState<any>([]);
  const [locationsQueriedError, setLocationsQueriedError] = useState<any>(null);
  const [loadingLocationsQueried, setLoadingLocationsQueried] =
    useState<boolean>(false);

  // Filter and Sort Inventories
  const [inventoryFilterByLocationId, setInventoryFilterByLocationId] =
    useState("all");
  const [inventorySortOption, setInventorySortOption] = useState("name_ASC");

  // Pagination of Inventories
  const [limitInventories, setLimitInventories] = useState(20);
  const [offsetInventories, setOffsetInventories] = useState(0);
  const [pageInventories, setPageInventories] = useState(1);

  // Sort Locations
  const [locationSortOption, setLocationSortOption] = useState("name_ASC");

  // Pagination of Locations
  const [limitLocations, setLimitLocations] = useState(20);
  const [offsetLocations, setOffsetLocations] = useState(0);
  const [pageLocations, setPageLocations] = useState(1);

  const fetchQueriedInventories = async () => {
    setLoadingInventoriesQueried(true);
    try {
      const response = await fetch(
        `http://localhost:5000/inventories?limit=${limitInventories}&offset=${offsetInventories}&count=${inventoryFilterByLocationId}&sortBy=${
          inventorySortOption.split("_")[0]
        }&order=${inventorySortOption.split("_")[1]}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setInventoriesQueried(jsonData);
    } catch (err) {
      setInventoriesQueriedError(err);
    } finally {
      setLoadingInventoriesQueried(false);
    }
  };

  const fetchAllLocations = async () => {
    setLoadingLocationsAll(true);
    try {
      const response = await fetch("http://localhost:5000/locations");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setLocationsAll(jsonData);
    } catch (err) {
      setLocationsAllError(err);
    } finally {
      setLoadingLocationsAll(false);
    }
  };

  const fetchQueriedLocations = async () => {
    setLoadingLocationsQueried(true);
    try {
      const response = await fetch(
        `http://localhost:5000/locations?limit=${limitLocations}&offset=${offsetLocations}&sortBy=${
          locationSortOption.split("_")[0]
        }&order=${locationSortOption.split("_")[1]}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setLocationsQueried(jsonData);
    } catch (err) {
      setLocationsQueriedError(err);
    } finally {
      setLoadingLocationsQueried(false);
    }
  };

  useEffect(() => {
    fetchQueriedInventories();
    fetchAllLocations();
    fetchQueriedLocations();
  }, [
    limitInventories,
    offsetInventories,
    inventoryFilterByLocationId,
    inventorySortOption,

    limitLocations,
    offsetLocations,
    locationSortOption,
  ]);

  useEffect(() => {
    setOffsetInventories((pageInventories - 1) * limitInventories);
  }, [pageInventories]);

  useEffect(() => {
    setOffsetLocations((pageLocations - 1) * limitLocations);
  }, [pageLocations]);

  const handleDeleteInventory = () => {
    fetchQueriedInventories()
      .then(() => {
        if (
          inventoriesQueried?.inventories?.length === 1 &&
          pageInventories > 1
        ) {
          setPageInventories((prevPage) => prevPage - 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteLocation = () => {
    fetchQueriedLocations()
      .then(() => {
        if (locationsQueried?.locations?.length === 1 && pageLocations > 1) {
          setPageLocations((prevPage) => prevPage - 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    fetchAllLocations();
    fetchQueriedInventories();
  };

  // console.log({ inventoriesQueried }, { locationsAll }, { locationsQueried });

  return (
    <div className="container">
      <AppHeader />
      <Routes>
        <Route
          path="/"
          element={
            <Inventories
              loadingInventories={loadingInventoriesQueried}
              loadingLocations={loadingLocationsAll}
              inventoriesError={inventoriesQueriedError}
              locationsError={locationsAllError}
              inventories={inventoriesQueried.inventories}
              locations={locationsAll.locations}
              total={inventoriesQueried.total}
              limitInventories={limitInventories}
              pageInventories={pageInventories}
              setPageInventories={setPageInventories}
              inventoryFilterByLocationId={inventoryFilterByLocationId}
              setInventoryFilterByLocationId={setInventoryFilterByLocationId}
              inventorySortOption={inventorySortOption}
              setInventorySortOption={setInventorySortOption}
              handleDeleteInventory={handleDeleteInventory}
            />
          }
        />
        <Route
          path="/add-inventory"
          element={<AddInventory locations={locationsAll.locations} />}
        />
        <Route
          path="/locations"
          element={
            <Locations
              locationsError={locationsQueriedError}
              loadingLocations={loadingLocationsQueried}
              locations={locationsQueried.locations}
              total={locationsQueried.total}
              limitLocations={limitLocations}
              pageLocations={pageLocations}
              locationSortOption={locationSortOption}
              setLocationSortOption={setLocationSortOption}
              setPageLocations={setPageLocations}
              handleDeleteLocation={handleDeleteLocation}
            />
          }
        />
        <Route path="/add-location" element={<AddLocation />} />
        <Route path="/edit-location/:locationId" element={<EditLocation />} />
      </Routes>
    </div>
  );
}

export default App;
