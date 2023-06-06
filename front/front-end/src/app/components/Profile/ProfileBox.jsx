import React from "react";

const ProfileBox = ({ name, date_start, date_end, location, description }) => (
  <div className="bg-white rounded-lg mx-5 p-5">
    <div className="flex justify-between">
      <p className="text-xl font-bold">{name}</p>
      <div className="flex-col pr-1">
        {date_start && <p className="text-xs">{new Date(date_start).toLocaleDateString()}</p>}
        {date_end && <p className="text-xs">{new Date(date_end).toLocaleDateString()}</p>}
      </div>
    </div>
    {location && <p className="text-xs">{location}</p>}
    <hr className="my-2" />
    <p className="font-bold">Description</p>
    <textarea
      className="w-full border-none h-fit resize-none"
      value={description}
      disabled
      readOnly
    />
  </div>
);

export default ProfileBox;
