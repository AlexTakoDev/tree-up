import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Base/ButtonBis";
import CollaboratorCard from "../../components/Project/CollaboratorCardEdit";
import ConfirmPopup from "../../components/base/ConfirmPopup";
import InputBis from "../../components/base/InputBis";
import { ModalAdd } from "../../components/Project/ModalAdd";
import OwnerCard from "../../components/Project/OwnerCard";
import Select from "../../components/base/Select";
import TechnoModal from "../../components/Project/TechnoModal";
import Techno_project from "../../components/Project/Techno_project";
import TextArea from "../../components/base/TextArea";
import apiGateway from "../../api/backend/apiGateway";
import { getToken } from "../../services/tokenServices";
import { selectUser } from "../../redux-store/authenticationSlice";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import validationSchema from "../../utils/createProjectSchema";

export default function CreateProject({ isEditMode }) {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { uuid } = useParams();
  const token = getToken();
  const [typeList, setTypeList] = useState([]);
  //dave
  const [showModal, setShowModal] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [collaborators, setCollaborators] = useState([]);
  const [existingCollaborators, setExistingCollaborators] = useState([]);
  const [isCollaboratorsLoaded, setIsCollaboratorsLoaded] = useState(false);
  const [ownersids, setOwnersids] = useState([]);
  const [owners, setOwners] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedCollaboratorIndex, setSelectedCollaboratorIndex] =
    useState(null);
  const handleShowConfirmationModal = (index) => {
    setSelectedCollaboratorIndex(index);
    setShowConfirmationModal(true);
  };
  const handleDeleteCollaborator = () => {
    const newSelectedUsers = selectedUsers.filter(
      (item, i) => i !== selectedCollaboratorIndex
    );
    setSelectedUsers(newSelectedUsers);
    setShowConfirmationModal(false);
  };

  const handleModalClose = (selectedUsersModal) => {
    const selectedUserIds = [...selectedUsers];
    selectedUsersModal.forEach((user) => {
      if (!selectedUserIds.includes(user)) {
        selectedUserIds.push(user);
      }
    });
    setSelectedUsers(selectedUserIds);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (selectedUsers.length > 0) {
        const promises = selectedUsers.map(async (userId) => {
          const response = await apiGateway.get(`/users/${userId}`, config);
          return response.data;
        });
        const users = await Promise.all(promises);
        setCollaborators(users);
      } else {
        setCollaborators([]);
      }
    };
    fetchCollaborators();

    const fetchOwners = async () => {
      if (ownersids.length > 0) {
        const promises = ownersids.map(async (userId) => {
          const response = await apiGateway.get(`/users/${userId}`, config);
          return response.data;
        });
        const users = await Promise.all(promises);
        setOwners(users);
      } else {
        setOwners([]);
      }
    };
    fetchOwners();

    const fetchExistingCollaborators = async () => {
      const response = await apiGateway.get(`/collaborators/project/${uuid}`);

      if (response.data) {
        const { collaborators } = response.data;
        const { owners } = response.data;
        const existingCollaborators = Object.values(collaborators);

        setExistingCollaborators(existingCollaborators);
        setSelectedUsers(existingCollaborators);
        setOwnersids(owners);
        setIsCollaboratorsLoaded(true);
      }
    };

    if (isEditMode) {
      if (!isCollaboratorsLoaded) {
        fetchExistingCollaborators();
      }
      apiGateway
        .get("/project/" + uuid, config)
        .then(({ data: { name, date_start, date_end, description, type } }) => {
          const dateStart = date_start.slice(0, date_start.indexOf("T"));
          const dateEnd = date_end
            ? date_end.slice(0, date_end.indexOf("T"))
            : "";
          setValues({
            name,
            date_start: dateStart,
            date_end: dateEnd,
            description,
            uuid_type: type?.uuid,
          });
        });
    }
  }, [selectedUsers, setExistingCollaborators, isEditMode, uuid]);

  useEffect(async () => {
    try {
      const response = await apiGateway.get("/project_type", config);
      setTypeList(response.data);
    } catch (error) {
      setError(error.response.data?.message || error.message);
    }
  },[]);

  const initialValues = {
    name: "",
    date_start: "",
    date_end: "",
    description: "",
    uuid_type: "",
  };

  const onSubmit = async (formValues) => {
    const { date_start, date_end } = formValues;
    if (date_end === "") {
      delete formValues.date_end;
    }

    let trimedValue = {};
    for (const key in formValues) {
      trimedValue[key] = formValues[key].trim();
    }
    
    if (new Date(0) > new Date(date_start)) {
      setError(
        "La date de creation du projet ne peut pas être antérieure à 1970."
      );
      return;
    }
    if (new Date(date_end) < new Date(date_start)) {
      setError(
        "Il est important de veiller à ce que la date de début du projet soit antérieure à la date de fin."
      );
      return;
    }
    if (Date.now() < new Date(date_start)) {
      setError(
        "Il est essentiel que la date de début du projet soit antérieure a la date d'aujourd'hui."
      );
      return;
    }
    try {
      if (isEditMode) {
        let response = await apiGateway.put(
          `/project/update/${uuid}`,
          formValues,
          config
        );
        const allCollaborators = [...existingCollaborators, ...selectedUsers];

        const body = {
          project_uuid: response.data.uuid,
          collaborators: selectedUsers,
        };

        await apiGateway.post("/collaborators/update/", body);
        resetForm();
        navigate("/project/" + response.data.uuid);
      } else {
        let response = await apiGateway.post(
          "/project/create/",
          formValues,
          config
        );
        resetForm();
        navigate("/project/" + response.data.uuid);
        const body = {
          project_uuid: response.data.uuid,
          collaborators: selectedUsers,
        };
        await apiGateway.post("/collaborators/add/", body);
        
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(
          "Il est impossible de modifier un projet dont vous n'êtes pas le propriétaire"
        );
      } else {
        setError(error.response ? error.response.data.message || error.response.data.error : error.message);
      }
    }
  };

  const {
    handleSubmit,
    values,
    setValues,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    resetForm,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  
  const userConect = useSelector(selectUser);
  
  const collaboratorsWithoutOwners = collaborators.filter(
    (collaborator) =>
      !owners.some((owner) => owner.user.uuid === collaborator.user.uuid)
  );
  const uuidsAdd = collaboratorsWithoutOwners.map(collaborator => collaborator.user.uuid);
//technos
  

const [showModalTechno, setShowModalTechno] = useState(null);

const [selectCurrentTechos, setSelectCurrentTechnos ] = useState([]);
const removeTech = (id) => {
  setSelectCurrentTechnos(selectCurrentTechos.filter(technoId => technoId != id))
}
  return (
    <Fragment>
      <form className="p-3" onSubmit={handleSubmit}>
        {/* image, nom du projet, type de projet, date de début, date de fin */}
        <div className="flex w-full my-5 flex-wrap">
          <div className="w-1/3 my-3">
          </div>
          <div className="flex flex-col justify-center w-1/3 my-3 gap-7">
            <div className="flex flex-col w-72 mx-auto">
              <label htmlFor="name">Nom du projet</label>
              <InputBis
                type="text"
                placeholder={isEditMode ? values.name : "Indiquez le nom du projet"}
                name="name"
                value={values.name.replace(/\s+/g, " ")}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && (
              <small className="error">{errors.name}</small>
              )}
            </div>
            <div className="flex flex-col w-72 mx-auto">
              <label htmlFor="uuid_type">Type de projet</label>
              <Select
                label="Type de projet" 
                name="uuid_type" 
                dataList={typeList} 
                onChange={handleChange} 
                value={values.uuid_type}
              />
              {touched.uuid_type && errors.uuid_type && (
                <small className="error">{errors.uuid_type}</small>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center w-1/3 my-3 gap-7">
            <div className="flex flex-col w-60 mx-auto">
              <label htmlFor="date_start">Date de début</label>
              <InputBis
                type="date"
                name="date_start"
                value={values.date_start}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.date_start && errors.date_start && (
                <small className="error">{errors.date_start}</small>
              )}
            </div>
            <div className="flex flex-col w-60 mx-auto">
              <label htmlFor="date_end">Date de fin</label>
              <InputBis
                type="date"
                name="date_end"
                value={values.date_end}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.date_end && errors.date_end && (
                <small className="error">{errors.date_end}</small>
              )}
            </div>
          </div>
        </div>
        
        <hr />

        {/* collaborateurs */}
        <div className="my-5">
          <div className="flex gap-5 items-center overflow-x-auto">
            <button
              type="button"
              title="Ajouter des collaborateurs"
              onClick={() => setShowModal(true)}
              className="border-2 border-gray-1 text-gray-400 underline bg-white py-6 px-4 rounded-xl hover:text-gray-500 hover:border-gray-500"
            >
              Ajouter des collaborateurs
            </button>
            
            {owners.map((item, index) => (
              <CollaboratorCard
                key={item.user.uuid}
                {...item.user}
                descripcion={item.user.profile.descripcion}
                owner={true}
              />
            ))}

            {collaboratorsWithoutOwners.map((item, index) => (
              <CollaboratorCard
                key={item.user.uuid}
                {...item.user}
                onDelete={() => handleShowConfirmationModal(index)}
              />
            ))}
          </div>
          
          <ConfirmPopup
            title="Supprimer un collaborateur"
            show={showConfirmationModal}
            body="Êtes-vous sûr de vouloir supprimer ce collaborateur ?"
            yesAction={() => handleDeleteCollaborator()}
            noAction={() => setShowConfirmationModal(false)}
          />
        </div>
        
        <hr />
        
        {/* description */}
        <div className="my-5 px-10">
          <label htmlFor="description">Description</label>
          <TextArea
            placeholder={
              isEditMode ? values.description : "Description du projet"
            }
            className="w-full"
            name="description"
            value={values.description.replace(/\s+/g, " ")}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.description && errors.description && (
            <small className="error">{errors.description}</small>
          )}
          {error && (
            <p className="error p-5 m-1 border-2 border-red-700 bg-white">
              {error}
            </p>
          )}
        </div>
        
        <hr />
        
        {/* les technologies */}
        <div className="flex justity-start my-5 h-32">
          <button 
            className=" flex flex-row m-auto justify-center items-center p-24px p-15px gap-10px  w-[206px] h-[65px] border-2 border-gray-300 rounded-10px"
            type="button"
            onClick={() => setShowModalTechno(true)}
            >Ajouter une technologie</button>
          <div className="w-[80%] h-[100%] p-4 overflow-x-auto">
            <Techno_project technosSelect={selectCurrentTechos} onTechnoSelect={removeTech} />
          </div>
          
          {/* penser retire le h-32 quand on aura les technologies */}
        </div>

        <hr />

        {/* liens du projet et le boutons d'envoie*/}
        <div>
          <div className="flex justify-between h-20">
             {/* liens du projet */}
             {/* retire le h-20 quand on aura les liens */}
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex mx-auto"
            title={isEditMode ? "Modifier le projet" : "Valider la création du projet"}
          />
        </div>
      </form>
      {userConect && userConect.uuid && (
        <ModalAdd
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          onClose1={handleModalClose}
          userConecte={userConect.uuid}
          userAdd= {uuidsAdd}
        />
      )}
      {userConect && userConect.uuid && (
        <TechnoModal 
          isVisible={showModalTechno}
          onClose={() => setShowModalTechno(false)}
          onTechnosSelect = {setSelectCurrentTechnos}
          technosSelect = {selectCurrentTechos}
          
        />
      )}
    </Fragment>
  );
}
