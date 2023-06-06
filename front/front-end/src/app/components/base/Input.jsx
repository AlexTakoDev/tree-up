import React from "react";

function Input({
  type,
  placeholder,
  description,
  name,
  value,
  onChange,
  onBlur,
}) {
  return (
    <div className="w-full flex flex-col items-center mt-4">
      <div className="flex p-0.5 btn-border rounded-lg w-full">
        <input
          className="w-full input"
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {description && <small className="w-full mt-1">{description}</small>}
    </div>
  );
}

export default Input;
