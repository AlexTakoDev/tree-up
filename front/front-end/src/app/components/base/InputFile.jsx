import React from "react";

export default function InputFile({
  className,
  type,
  placeholder,
  name,
  description,
  accept,
  multiple,
  onChange,
  onBlur,
  id,
}) {
  return (
    <>
      <input
        className={`border-2 border-gradient-v rounded-lg ${className}`}
        type={type ? type : "file"}
        placeholder={placeholder}
        name={name}
        accept={accept}
        multiple={multiple ? multiple : false}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
      />
      {description && <div className="text-xs">{description}</div>}
    </>
  );
}