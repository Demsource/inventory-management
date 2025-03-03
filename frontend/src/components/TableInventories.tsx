import React, { useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
interface TableInventoriesProps {
  inventories: any;
  locations: any;
  handleDeleteInventory: any;
}

const TableInventories: React.FC<TableInventoriesProps> = ({
  inventories,
  locations,
  handleDeleteInventory,
}: TableInventoriesProps) => {
  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`http://localhost:5000/inventories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        handleDeleteInventory();
      } else {
        console.error("Error deleting inventory");
      }
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  return (
    <table className="table table-dark table-striped text-center">
      <thead>
        <tr>
          <th>ნივთის სახელი</th>
          <th>ნივთის ადგილმდებარეობა</th>
          <th>ფასი (₾)</th>
          <th>ოპერაციები</th>
        </tr>
      </thead>
      <tbody>
        {inventories?.length > 0 ? (
          inventories.map((inventory: any, i: number) => {
            return (
              <tr key={i}>
                <th>{inventory?.name}</th>
                <td>
                  {
                    locations?.find(
                      (location: any) => location.id === inventory?.location_id
                    )?.name
                  }
                </td>
                <td>{inventory?.price}</td>
                <td onClick={() => handleDelete(inventory.id)}>
                  <DeleteIcon />
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

export default TableInventories;
