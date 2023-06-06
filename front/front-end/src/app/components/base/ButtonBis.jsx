import React from "react";

function Button({ title, className, type = "button", disabled, onClick}) {
	return (
		<button 
		type={type} 
		disabled={disabled} 
		className={`border-gradient-v border-4 rounded-3xl text-primary hover:text-white px-3 py-2 ${className ? className : ""}`} onClick={onClick}> 
			{title}
		</button>
	);
}

export default Button;