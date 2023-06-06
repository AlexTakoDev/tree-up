import Button from "../base/Button";
import React from "react";

function ConfirmDelete2({ setShowConfirmationModal, handleDeleteCollaborator, uuid }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="p-0.5 btn-border rounded-lg">
        <div className="bg-white p-4 rounded-lg flex flex-col">
          <p className="p-4">
            Etes-vous sûr de vouloir supprimer ce collaborator ?
          </p>
          <div className="flex justify-evenly p-4">
            <div className="w-24" onClick={handleDeleteCollaborator}>
              <Button title="Oui" />
            </div>
            <div className="w-24" onClick={() => setShowConfirmationModal(false)}>
              <Button title="Non" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete2;
