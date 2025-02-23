import { useNavigate } from "react-router-dom";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

interface LocationsProps {
  locations: any;
  handleDeleteLocation: any;
}

const TableLocations = ({
  locations,
  handleDeleteLocation,
}: LocationsProps) => {
  const navigate = useNavigate();

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`http://localhost:5000/locations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        handleDeleteLocation();
      } else {
        console.error("Error deleting location");
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  const handleEdit = (id: any) => {
    navigate(`/edit-location/${id}`);
  };

  return (
    <table className="table table-dark table-striped text-center">
      <thead>
        <tr>
          <th>ადგილმდებარეობა</th>
          <th>ოპერაციები</th>
        </tr>
      </thead>
      <tbody>
        {locations?.length > 0 ? (
          locations.map((location: any, i: number) => {
            return (
              <tr key={i}>
                <th>{location?.name}</th>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <div onClick={() => handleDelete(location.id)}>
                    <DeleteIcon />
                  </div>
                  <div onClick={() => handleEdit(location.id)}>
                    <EditIcon />
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4}>No inventory found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableLocations;
