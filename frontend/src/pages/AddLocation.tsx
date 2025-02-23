import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationForm from "../components/LocationForm";

const AddLocation = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(0);
      } else {
        console.log("Error creating location");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LocationForm handleSubmit={handleSubmit} name={name} setName={setName} />
  );
};

export default AddLocation;
