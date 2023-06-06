import React, { useState } from "react";
import eyeOff from "../../assets/img/icons/eye_off.svg";
import eye from "../../assets/img/icons/eye.svg";

function InputPassword({
  placeholder,
  description,
  name,
  value,
  onChange,
  onBlur,
}) {
  const [visible, setVisible] = useState("");

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <div className="flex p-0.5 btn-border rounded-lg w-full relative">
        <input
          className="w-full input"
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button
          className="absolute right-4 top-2.5"
          type="button"
          onClick={() => setVisible(!visible)}
        >
          <img className="w-6 h-6" src={visible ? eyeOff : eye} alt="" />
        </button>
      </div>
      {description && <small className="w-full mt-1">{description}</small>}
    </div>
  );
}

export default InputPassword;
