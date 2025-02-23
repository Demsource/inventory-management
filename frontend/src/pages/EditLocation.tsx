import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationForm from "../components/LocationForm";

const EditLocation = () => {
  const [name, setName] = useState("");

  const params = useParams();
  const locationId = params.locationId;

  const navigate = useNavigate();

  const fetchLocation = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/locations/${locationId}`
      );
      if (response.ok) {
        const data = await response.json();
        setName(data.name);
      } else {
        console.log("Error fetching location");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/locations/${locationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(0);
      } else {
        console.log("Error updating location");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LocationForm handleSubmit={handleSubmit} name={name} setName={setName} />
  );
};

export default EditLocation;
