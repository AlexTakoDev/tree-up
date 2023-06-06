import React from "react";
import Button from "../base/Button";

function ConfirmDelete({ setShowConfirm, delComment, uuid }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="p-0.5 btn-border rounded-lg">
        <div className="bg-white p-4 rounded-lg flex flex-col">
          <p className="p-4">
            Etes-vous sûr de vouloir supprimer ce commentaire ?
          </p>
          <div className="flex justify-evenly p-4">
            <div className="w-24" onClick={() => delComment(uuid)}>
              <Button title="Oui" />
            </div>
            <div className="w-24" onClick={() => setShowConfirm(false)}>
              <Button title="Non" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
