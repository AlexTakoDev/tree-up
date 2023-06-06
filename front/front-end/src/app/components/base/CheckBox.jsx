import React from "react";

const CheckBox = ({ type = "checkbox", text = "", id = "", value, checked = false, onChange, defaultChecked }) => {
	return (
		<div>
			<input className="checked:bg-gradient-v border-gradient-v border-2" type={type} name={`checkbox_${id}`} id={`checkbox_${id}`} value={value} onChange={onChange} defaultChecked={defaultChecked} />
			<span className="ml-1">{text}</span>
		</div>
	);
};

export default CheckBox;
