import React from "react";

const Input = ({
  label,
  error,
  required = false,
  fullWidth = true,
  ...props
}) => {
  return (
    <div style={{ marginBottom: "16px", width: fullWidth ? "100%" : "auto" }}>
      {label && (
        <label style={{ display: "block", marginBottom: "5px" }}>
          {label} {required && "*"}
        </label>
      )}

      <input
        {...props}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: error ? "1px solid red" : "1px solid #ccc",
          outline: "none",
        }}
      />

      {error && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;