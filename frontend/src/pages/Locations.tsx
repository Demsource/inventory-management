import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import SortLocations from "../components/SortLocations";
import TableLocations from "../components/TableLocations";
import "./Locations.css";

interface LocationsProps {
  locationsError: any;
  loadingLocations: any;
  locations: any;
  handleDeleteLocation: any;
  total: any;
  limitLocations: any;
  pageLocations: any;
  setPageLocations: any;
  locationSortOption: any;
  setLocationSortOption: any;
}

const Locations = ({
  locationsError,
  loadingLocations,
  locations,
  handleDeleteLocation,
  total,
  limitLocations,
  pageLocations,
  setPageLocations,
  locationSortOption,
  setLocationSortOption,
}: LocationsProps) => {
  if (loadingLocations) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (locationsError) {
    return (
      <h2 style={{ textAlign: "center" }}>Error occurred: {locationsError.message}</h2>
    );
  }

  return (
    <div className="locations">
      <div className="locations-header">
        <div className="sort">
          <SortLocations
            locationSortOption={locationSortOption}
            setLocationSortOption={setLocationSortOption}
            setPageLocations={setPageLocations}
          />
        </div>
        <div className="addition">
          <Link to={"/add-location"}>
            <button type="button" className="btn btn-dark add-btn">
              Add Location
            </button>
          </Link>
        </div>
      </div>
      <TableLocations
        locations={locations}
        handleDeleteLocation={handleDeleteLocation}
      />
      <Pagination
        page={pageLocations}
        limit={limitLocations}
        total={total}
        setPage={setPageLocations}
      />
    </div>
  );
};

export default Locations;
