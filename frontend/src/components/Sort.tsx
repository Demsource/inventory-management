import React from "react";

interface SortProps {
  sortOption: any;
  setSortOption: any;
  setPage: any;
}

const Sort: React.FC<SortProps> = ({ sortOption, setSortOption, setPage }) => {
  return (
    <div className="input-wrapper">
      <div className="form-floating">
        <select
          className="form-select"
          id="options"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setPage(1);
          }}
          required
        >
          <option value={"name_ASC"}>სახელით ^</option>
          <option value={"name_DESC"}>სახელით v</option>
          <option value={"location_ASC"}>ადგილმდებარეობით ^</option>
          <option value={"location_DESC"}>ადგილმდებარეობით v</option>
          <option value={"price_ASC"}>ფასით ^</option>
          <option value={"price_DESC"}>ფასით v</option>
        </select>
      </div>
    </div>
  );
};

export default Sort;
