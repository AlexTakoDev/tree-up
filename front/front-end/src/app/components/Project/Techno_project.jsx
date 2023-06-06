import React, { useEffect, useState } from "react";

import TechnoCart from "./TechnoCart";
import { getTechnoAll } from "../../api/backend/techno";
import { getTechnoUuid } from "../../api/backend/techno";

function Techno_project({technosSelect, onTechnoSelect}) {
  const [allTechnos, setAllTechnos] = useState([]);

  // Recuperamos todas las tecnologías y las mostramos
  const showData = async () => {
    const response = await getTechnoAll();
    setAllTechnos(response.data);
  };
  useEffect(() => {
    showData();
  }, []);
  
  const filterTechnos = allTechnos.filter(techno => technosSelect.includes(techno.technologie_uuid));
  console.log(filterTechnos);
  return (
    
    <div className='flex content-start items-center gap-10 w-[10%] '>
      {filterTechnos.map((techno) => (
        <TechnoCart
          key={techno.technologie_uuid}
          name={techno.name}
          id={techno.technologie_uuid}
          selected={technosSelect.includes(techno.technologie_uuid)}
          showDelete={true}
          onTechnoSelect={onTechnoSelect}
        />
      ))}
    </div>
  );
}

export default Techno_project;