import React from "react";

export default function Select({className, name, id, label, dataList = [] , onChange, value}) {
    return(
    <select className={`bg-gray-1 rounded-3xl border-none text-gray-500 py-1 ${className}`} name={name} id={id} onChange={onChange} value={value}>
        <option unselectable="true"  hidden>{label}</option>
        {dataList.map(({uuid, name}) => <option key={uuid} value={uuid} hidden={value === uuid}>{name}</option>)}
    </select>
)};
