import React from "react";

interface FilterProps {
  locationId: any;
  setLocationId: any;
  locations: any;
  setPage: any;
}

const Filter: React.FC<FilterProps> = ({
  locationId,
  setLocationId,
  locations,
  setPage,
}) => {
  return (
    <div className="input-wrapper">
      <div className="form-floating">
        <select
          className="form-select"
          id="options"
          value={locationId}
          onChange={(e) => {
            setLocationId(e.target.value);
            setPage(1);
          }}
          required
        >
          <option value={"all"}>ყველა</option>
          {locations?.map((location: any) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
