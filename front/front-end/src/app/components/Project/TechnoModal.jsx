import React, { useEffect, useState } from "react";

import TechnoCart from "./TechnoCart";
import { getTechnoAll } from "../../api/backend/techno";

function TechnoModal({ isVisible, onClose, onTechnosSelect, technosSelect }) {
  if (!isVisible) return null;

  const [allTechnos, setAllTechnos] = useState([]);
  const [curentTechnos, setCurentTechnos] = useState([]);
  const showData = async () => {
    const response = await getTechnoAll();
    setAllTechnos(response.data);
  };
  useEffect(() => {
    showData();
  
  }, []);
  

  const clickSelectTechno= ()=>{
    onTechnosSelect([...technosSelect,...curentTechnos])

  } 
  const handleTechnoSelect = (id, selected) => {
    if (selected) {
      setCurentTechnos([...curentTechnos, id]);
    } else {
      setCurentTechnos(curentTechnos.filter((technoId) => technoId !== id));
    }
  };
 
 

const filterTechnos = allTechnos.filter(techno => !technosSelect.includes(techno.technologie_uuid));


//button


  return (
    <div className="flex flex-col justify-center items-center  gap-8 absolute w-[95vw] md:w-[70vw] lg:w-[50vw] 2xl:w-[40vw]  h-[65vh]  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg">
      <button
        className="absolute left-0 top-[-40px] mt-4 underline"
        type="button"
        onClick={() => {
          onClose();
        }}
      >
        Retour
      </button>
      <div className="w-84 h-10  p-auto font-inter font-semibold text-black text-center">
        <p className="mt-4"> Choisir une ou plusieurs technologies</p>
      </div>
      
      <div className="grid grid-cols-4 justify-items-stretch content-start items-center gap-10 w-[70%] max-h-[300px] min-h-[100px] overflow-y-auto ">
        {filterTechnos.map((techno) => (
          
          <TechnoCart 
          key={techno.technologie_uuid} 
          id={techno.technologie_uuid} 
          name={techno.name}  
          selected={curentTechnos.includes(techno.technologie_uuid)}
          onTechnoSelect={handleTechnoSelect}
          showDelete={false}
          />
        ))}
      </div>
      <button
        className="box-border flex flex-row items-start p-2 gap-2 w-277 h-49 bg-white rounded-full border-gradient-v"
        onClick={() => {
          onClose();
          clickSelectTechno();
        }}
      >
        Valider mon/mes choix
      </button>
    </div>
  );
}

export default TechnoModal;
