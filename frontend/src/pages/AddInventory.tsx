import React, { useState } from "react";
import "./AddInventory.css";
import { Link, useNavigate } from "react-router-dom";

interface AddInventoryProps {
  locations: any;
}

const AddInventory: React.FC<AddInventoryProps> = ({
  locations,
}: AddInventoryProps) => {
  const [location, setLocation] = useState(locations?.[0]?.id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inventory = {
      location_id: location,
      name,
      price: Number.parseFloat(price).toFixed(2),
    };

    try {
      const response = await fetch("http://localhost:5000/inventories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inventory),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(0);
      } else {
        console.log("Error creating inventory");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-inventory-wrapper">
      <div className="add-inventory-header go-to-inventories">
        <Link to={"/"}>
          <button type="button" className="btn btn-dark add-btn">
            Back to Inventories Page
          </button>
        </Link>
      </div>
      <form action="#" onSubmit={handleSubmit} className="add-inventory">
        <div className="input-wrapper location-input">
          <label htmlFor="options">ადგილმდებარეობა:</label>
          <select
            className="form-select"
            id="options"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            {locations?.map((location: any) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-wrapper">
          <label htmlFor="name">სახელი:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="price">ფასი:</label>
          <input
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper add-btn">
          <button type="submit" className="btn btn-success">
            დამატება
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;
