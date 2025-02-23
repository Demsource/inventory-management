import React, { useState } from "react";
interface GeorgianInputProps {
  name: any;
  setName: any;
}

const GeorgianInput: React.FC<GeorgianInputProps> = ({
  name,
  setName,
}: GeorgianInputProps) => {
  const [error, setError] = useState("");

  const handleChange = (event: any) => {
    const value = event.target.value;

    // Regular expression to match Georgian characters
    const georgianRegex = /^[\u10A0-\u10FF\s]*$/;

    if (georgianRegex.test(value) || value === "") {
      setError("");
      setName(value);
    } else {
      setError("Only Georgian characters are allowed");
    }
  };

  return (
    <>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Type Georgian letters only"
        required
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
};

export default GeorgianInput;
