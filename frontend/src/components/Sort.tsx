import React from "react";

interface SortProps {
  sortBy: any;
  setSortBy: any;
  setPage: any;
}

const Sort: React.FC<SortProps> = ({ sortBy, setSortBy, setPage }) => {
  return (
    <div className="input-wrapper">
      <div className="form-floating">
        <select
          className="form-select"
          id="options"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          required
        >
          <option value={"byName"}>სახელით</option>
          <option value={"byLocation"}>ადგილმდებარეობით</option>
          <option value={"byPrice"}>ფასით</option>
        </select>
      </div>
    </div>
  );
};

export default Sort;
