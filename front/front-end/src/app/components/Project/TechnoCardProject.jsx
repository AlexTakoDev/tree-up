import React from 'react'
import asana_icon from "../../assets/img/icons/technos/Asana 1.svg";

function TechnoCardProject( technologie_uuid, name) {
  return (
   <div key={ technologie_uuid} className= "w-[80%] h-[70%] mx-auto bg-cover bg-center bg-no-repeat flex-none order-1 flex-shrink-0">
   <div
     className="flex flex-row justify-center p2 mx-auto items-center p-2 gap-2 w-[70%] h-[100%] bg-white shadow-sm rounded-md flex-none order-1" >
     <img className="w-5 h-5 flex-none order-1" src={asana_icon} alt="" />
   </div>
   <div className="w-[100%] h-3 mt-3 flex font-normal  text-xs items-center justify-center text-black text-center">
     <p>{name}</p>
   </div>
 </div>
  )
}

export default TechnoCardProject