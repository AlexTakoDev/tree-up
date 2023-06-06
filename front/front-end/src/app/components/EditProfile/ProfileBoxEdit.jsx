import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import ModalEditExperience from "./ModalEditExeperience";
import ModalEditSoftSkills from "./ModalEditSoftSkills";
import apiGateway from '../../api/backend/apiGateway';
import { deleteExperience, deleteSoftSkill } from '../../api/backend/profile';
import ConfirmPopup from '../base/ConfirmPopup';


function ProfileBoxEdit(props) {
    const [experience, setExperience] = useState({
        name: props.name,
        date_start: props.date_start ? props.date_start : "",
        date_end: props.date_end ? props.date_end : "",
        place: props.place ? props.place : "",
        description: props.description,
        uuid: props.uuid ? props.uuid : null,
    });
    const [showDeleteEXP, setShowDeleteEXP] = useState(false)
    const [showDeleteSoft, setShowDeleteSoft] = useState(false)

    const handleUpdate = (experienceUpdate) => {
        setExperience(experienceUpdate);
    }

    const deleteExperienceCB = async () => {
        await deleteExperience({ uuid: props.uuid }).then((res) => {
            props.handleDelete(res.data.result);
        }).catch((err) => {
            if (err) {
                alert("erreur server")
            }
        });
    }

    const deleteSoftSkillsCB = async () => {
        await deleteSoftSkill({ uuid: props.uuid }).then((res) => {
            props.handleDelete(res.data.result);
        }).catch((err) => {
            if (err) {
                alert("erreur server")
            }
        });
    }

    return (
        <div>
            <div className="bg-white rounded-lg mx-5 p-5 flex ">
                <div className="w-full h-auto">
                    <div className="flex justify-between">
                        <p className="text-xl font-bold">{experience.name}</p>
                        <div className="flex-col pr-1">
                            {experience.date_start && <p className="text-xs">{new Date(experience.date_start).toLocaleDateString()}</p>}
                            {experience.date_end && <p className="text-xs">{new Date(experience.date_end).toLocaleDateString()}</p>}
                        </div>
                    </div>
                    {experience.place && <p className="text-xs">{experience.place}</p>}
                    <hr className="my-2" />
                    <p className="font-bold">Description</p>
                    <textarea
                        className="w-full border-none h-fit resize-none"
                        value={experience.description}
                        disabled
                        readOnly
                    />

                </div>

                {props.exptitle ? (
                    <div className="flex flex-col justify-between ml-1">
                        <button onClick={() => { setShowDeleteEXP(true) }}>
                            <XIcon className='h-4 w-4 m-1' />
                        </button>
                        <ConfirmPopup
                            body={(
                                <div className="flex justify-center">êtes vous sur ?</div>
                            )}
                            show={showDeleteEXP}
                            yesAction={deleteExperienceCB}
                            noAction={() => { setShowDeleteEXP(false) }}
                        />
                        <ModalEditExperience
                            name={experience.name}
                            date_start={experience.date_start}
                            date_end={experience.date_end}
                            place={experience.place}
                            description={experience.description}
                            uuid={experience.uuid}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                ) : null}

                {props.softtitle ? (
                    <div className="flex flex-col justify-between ml-1">
                        <button onClick={() => { setShowDeleteSoft(true) }}>
                            <XIcon className='h-4 w-4 m-1' />
                        </button>
                        <ConfirmPopup
                            body={(
                                <div className="flex justify-center">êtes vous sur ?</div>
                            )}
                            show={showDeleteSoft}
                            yesAction={deleteSoftSkillsCB}
                            noAction={() => { setShowDeleteSoft(false) }}
                        />
                        <ModalEditSoftSkills
                            name={experience.name}
                            description={experience.description}
                            uuid={experience.uuid}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                ) : null}


            </div>
        </div>
    )
}

export default ProfileBoxEdit;