import { Link, useLocation } from "react-router-dom";
import GeorgianInput from "./GeorgianInput";
import "./LocationForm.css";

interface LocationFormProps {
  handleSubmit: any;
  name: any;
  setName: any;
}

const LocationForm = ({ handleSubmit, name, setName }: LocationFormProps) => {
  const location = useLocation();
  const activePage = location.pathname;

  return (
    <div className="location-form-wrapper">
      <div className="location-form-header go-to-locations">
        <Link to={"/locations"}>
          <button type="button" className="btn btn-dark">
            Back to Locations Page
          </button>
        </Link>
      </div>
      <form action="#" onSubmit={handleSubmit} className="location-form">
        <div className="input-wrapper">
          <label htmlFor="name">ადგილმდებარეობის დასახელება:</label>
          <GeorgianInput name={name} setName={setName} />
        </div>
        <div className="input-wrapper action-btn">
          <button type="submit" className="btn btn-success">
            {activePage.includes("/edit-location") ? "შენახვა" : "დამატება"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationForm;
