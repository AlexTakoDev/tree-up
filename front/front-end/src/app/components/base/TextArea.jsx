import React, { useEffect, useRef } from "react";

export default function TextArea({
	className,
	name,
	placeholder,
	value,
	description,
	cols,
	rows,
	id,
	onChange,
}) {
	const ref = useRef();
  
    useEffect(() => {
      if (value) {
        ref.current.style.height = "64px";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    }, [ref, value]);
  
	return (
		<>
			<textarea
				ref={ref}
				name={name}
				className={`bg-gray-1 text-gray-700 border-none rounded-2xl min-h-fit ${className}`}
				placeholder={placeholder}
				value={value}
				cols={cols}
				rows={rows}
				id={id}
				onChange={onChange}
				style={{ resize: "none" }}
			></textarea>
			{description && <div className="text-xs">{description}</div>}
		</>
	);
}
