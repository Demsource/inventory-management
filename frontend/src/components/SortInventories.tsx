import React from "react";

interface SortInventoriesProps {
  inventorySortOption: any;
  setInventorySortOption: any;
  setPageInventories: any;
}

const SortInventories: React.FC<SortInventoriesProps> = ({
  inventorySortOption,
  setInventorySortOption,
  setPageInventories,
}) => {
  return (
    <div className="input-wrapper">
      <div className="form-floating">
        <select
          className="form-select"
          id="options"
          value={inventorySortOption}
          onChange={(e) => {
            setInventorySortOption(e.target.value);
            setPageInventories(1);
          }}
          required
        >
          <option value={"name_ASC"}>სახელით (^)</option>
          <option value={"name_DESC"}>სახელით (v)</option>
          <option value={"location_ASC"}>ადგილმდებარეობით (^)</option>
          <option value={"location_DESC"}>ადგილმდებარეობით (v)</option>
          <option value={"price_ASC"}>ფასით (^)</option>
          <option value={"price_DESC"}>ფასით (v)</option>
        </select>
      </div>
    </div>
  );
};

export default SortInventories;
