import React from "react";

interface SortLocationsProps {
  locationSortOption: any;
  setLocationSortOption: any;
  setPageLocations: any;
}

const SortLocations: React.FC<SortLocationsProps> = ({
  locationSortOption,
  setLocationSortOption,
  setPageLocations,
}) => {
  return (
    <div className="input-wrapper">
      <div className="form-floating">
        <select
          className="form-select"
          id="options"
          value={locationSortOption}
          onChange={(e) => {
            setLocationSortOption(e.target.value);
            setPageLocations(1);
          }}
          required
        >
          <option value={"name_ASC"}>სახელით (^)</option>
          <option value={"name_DESC"}>სახელით (v)</option>
        </select>
      </div>
    </div>
  );
};

export default SortLocations;
