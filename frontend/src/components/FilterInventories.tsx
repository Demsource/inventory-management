import React from "react";

interface FilterInventoriesProps {
  inventoryFilterByLocationId: any;
  setInventoryFilterByLocationId: any;
  locations: any;
  setPageInventories: any;
}

const FilterInventories: React.FC<FilterInventoriesProps> = ({
  inventoryFilterByLocationId,
  setInventoryFilterByLocationId,
  locations,
  setPageInventories,
}) => {
  return (
    <div className="input-wrapper">
      <div className="form-floating">
        <select
          className="form-select"
          id="options"
          value={inventoryFilterByLocationId}
          onChange={(e) => {
            setInventoryFilterByLocationId(e.target.value);
            setPageInventories(1);
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

export default FilterInventories;
