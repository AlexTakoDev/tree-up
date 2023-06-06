import React from "react";

export default function InputBis({
  className,
  type,
  placeholder,
  name,
  value,
  description,
  onChange,
  onBlur,
  id,
}) {
  return (
    <>
      <input
        className={`bg-gray-1 text-gray-700 border-none py-1 rounded-2xl ${className}`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
      />
      {description && <div className="text-xs">{description}</div>}
    </>
  );
}
