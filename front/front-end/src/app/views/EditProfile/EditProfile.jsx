import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfileBoxEdit from "../../components/EditProfile/ProfileBoxEdit";
import ProfileUser from "../../components/EditProfile/ProfileUserEdit";
import ModalNewExperience from "../../components/EditProfile/ModalNewExperience";
import ModalNewSoftSkills from "../../components/EditProfile/ModalNewSoftSkill";
import { URL_BACK_GET_PROFILE } from "../../constants/urls/urlBackEnd";
import apiGateway from '../../api/backend/apiGateway';
import { getProfileEdit } from '../../api/backend/profile';
import { setAvatarUrl } from '../../services/avatarServices'

export default function EditProfile() {
  const expTitle = "Ajouter une expérience ";
  const softTitle = "ajouter un soft skill";
  const [user, setUser] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [soft_skills, setSoft_skills] = useState([])
  const [avatar, setAvatar] = useState()
  const { uuid } = useParams();



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProfileEdit();
        const userData = response.data.user;
        setUser({
          ...userData,
          experience: userData?.experience ?? [],
          soft_skill: userData?.soft_skill ?? []
        });
        setExperiences(response.data.user.experience ? response.data.user.experience : []);
        setSoft_skills(response.data.user.soft_skill ? response.data.user.soft_skill : []);
        if (response.data.avatar !== null) {
          setAvatar(`data:${response.data.avatar.contentType};base64,${response.data.avatar.data}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [uuid]);

  const handleChangeAvatar = (avatarUrl) => {
    console.log(avatarUrl);
    setAvatar(avatarUrl);
    setAvatarUrl(avatarUrl)
  }

  const arrayDateSort = (tab) => {
    const sortedArray = tab.sort((a, b) => {
      // Si la date de fin est vide, considérez la date de début comme la date de fin
      const aEnd = a.date_end || a.date_start;
      const bEnd = b.date_end || b.date_start;
      // Trier en ordre décroissant de date de fin
      if (aEnd > bEnd) {
        return -1;
      } else if (aEnd < bEnd) {
        return 1;
      } else {
        // Si la date de fin est la même, trier en ordre décroissant de date de début
        if (a.date_start > b.date_start) {
          return -1;
        } else if (a.date_start < b.date_start) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return sortedArray;
  }

  const handleDeleteExperience = (uuid) => {
    const currentUserData = user;
    const foundExperience = currentUserData.experience.findIndex((exp) => exp.uuid === uuid);
    if (foundExperience >= 0) {
      currentUserData.experience.splice(foundExperience, 1);
      currentUserData.experience = arrayDateSort(currentUserData.experience)
      setUser(currentUserData);
      setExperiences([...currentUserData.experience]);
    }
  }

  const handleAddExperience = (exp) => {
    const currentUserData = user;
    currentUserData.experience.push(exp);
    currentUserData.experience = arrayDateSort(currentUserData.experience)
    console.log(currentUserData.experience)
    setUser(currentUserData);
    setExperiences([...currentUserData.experience]);
  }

  const handleDeleteSoft_skill = (uuid) => {
    const currentUserData = user;
    const foundSoft_skill = currentUserData.soft_skill.findIndex((exp) => exp.uuid === uuid);
    if (foundSoft_skill >= 0) {
      currentUserData.soft_skill.splice(foundSoft_skill, 1);
      setUser(currentUserData);
      setSoft_skills([...currentUserData.soft_skill]);
    }
  }

  const handleAddSoft_skill = (soft) => {
    const currentUserData = user;
    currentUserData.soft_skill.push(soft);
    setUser(currentUserData);
    setSoft_skills([...currentUserData.soft_skill]);
  }

  return (
    <div className="bg-[#ececec] justify-center flex-col">
      <ProfileUser
        uuid_user={user.uuid}
        username={user?.username}
        work={user?.work}
        description={user?.description}
        date_birth={user?.date_birth}
        firstname={user?.firstname}
        lastname={user?.lastname}
        email={user?.email}
        avatar={avatar}
        handleAvatar={handleChangeAvatar}
      />
      <p className="text-center my-5">Liste des technos</p>
      <div className="flex-col w-full items-center justify-center h-64 border-2 border-white overflow-auto scrollbar">
        <div className="flex flex-wrap justify-center w-full">
          {/* {technologies.map((items) => (
                <div className="w-1/3 p-2" key={items.uuid}>
                  <PillTechnologie {...items} />
                </div>
              ))} */}
        </div>
      </div>
      <p className="text-center text-4xl my-5">Mes expériences</p>
      <div className="flex flex-wrap h-64 overflow-auto scrollbar">
        {experiences?.map((item) => {
          item.exptitle = expTitle
          item.handleDelete = handleDeleteExperience
          return (
            <div className="w-1/2 p-2" key={item.uuid}>
              <ProfileBoxEdit {...item} />
            </div>
          )
        })}
      </div>
      <div className="flex justify-center">
        <ModalNewExperience handleAdd={handleAddExperience} />
      </div>
      <p className="text-center text-4xl my-5">Mes SoftSkills</p>
      <div className="flex flex-wrap h-64 overflow-auto scrollbar">
        {soft_skills?.map((item) => {
          item.softtitle = softTitle;
          item.handleDelete = handleDeleteSoft_skill
          return (
            <div className="w-1/2 p-2" key={item.uuid}>
              <ProfileBoxEdit {...item} />
            </div>
          )
        })}
      </div>
      <div className="flex justify-center pb-4">
        {soft_skills.length < 10 ? (
          <ModalNewSoftSkills handleAdd={handleAddSoft_skill} />
        ) : <p>10/10 soft skills</p>}

      </div>
    </div>
  )
}