import "./Scrollbar.css";
import React from "react";
import { useEffect, useState } from "react";
import PillTechnologie from "../../components/Technos/PillTechnologie";
import ProfileBox from "../../components/Profile/ProfileBox";
import ProfileProject from "../../components/Profile/ProfileProject";
import ProfileUser from "../../components/Profile/ProfileUser";
import apiGateway from '../../api/backend/apiGateway';
import { useParams } from "react-router";
import { URL_BACK_GET_PROFILE } from "../../constants/urls/urlBackEnd";
import technologies from "../../fakeData/Techno";
import { getProfile } from "../../api/backend/profile";


export default function Profile() {

  const { uuid } = useParams();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProfile(uuid);
        const userData = response.data.user;
        setUser({
          ...userData,
          experience: userData?.experience ?? [],
          soft_skill: userData?.soft_skill ?? []
        });
        setAvatar(`data:${response.data.avatar.contentType};base64,${response.data.avatar.data}`)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [uuid]);

  return (
    <div className="bg-[#ececec] justify-center flex-col">
      <div >
        <ProfileUser
          uuid_user={uuid}
          firstname={user.firstname}
          lastname={user.lastname}
          email={user.email}
          description={user.description}
          date_birth={user.date_birth}
          work={user.work}
          username={user.username}
          avatar={avatar}
        />
      </div>
      <p className="text-center my-5">Liste des technos</p>
      <div className="flex-col w-full items-center justify-center h-64 overflow-auto scrollbar">
        <div
          className="grid grid-cols-3 grid-rows-2 gap-4 mx-auto max-w-4xl"
          style={{ gridTemplateRows: "50px 50px" }}
        >
          {technologies.map((items, index) => (
            <div className="p-2" key={index} style={{ height: "50px" }}>
              <PillTechnologie {...items} />
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-4xl my-5">Mes expériences</p>
      <div className="flex flex-wrap h-64 overflow-auto scrollbar">
        {user.experience && user.experience.length > 0 ? (
          user.experience?.map((item, index) => (
            <div className="w-1/2 p-2" key={index}>
              <ProfileBox {...item} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
          <div className="bg-gray-100 rounded-lg p-8">
            <h4 className="text-dark-500 font-medium text-center">Aucune Expérience disponible</h4>
          </div>
        </div>
        )}
      </div>
      <p className="text-center text-4xl my-5">Mes SoftSkills</p>
      <div className="flex flex-wrap h-64 overflow-auto scrollbar">
        {user.soft_skill && user.soft_skill.length > 0 ? (
          user.soft_skill?.map((item, index) => (
            <div className="w-1/2 p-2" key={index} >
              <ProfileBox {...item} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
          <div className="bg-gray-100 rounded-lg p-8">
            <h4 className="text-dark-500 font-medium text-center">Aucun soft-skill disponible</h4>
          </div>
        </div>
        )}
      </div>

      <div className="pb-5">
        <p className="text-center my-5">Mes projets</p>
        <ProfileProject />
      </div>
    </div>
  );
}
