import React, { useState, useEffect} from "react";
import { XIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/solid";
import ButtonBis from '../base/ButtonBis';
import InputFile from "../base/InputFile";
import { postAvatar, deleteAvatar } from '../../api/backend/avatar';
import { useDispatch } from "react-redux";
import { removeAvatar } from "../../redux-store/authenticationSlice";
import { CircleStencil, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

export default function ModalEditAvatar(props) {
    const [showModal, setShowModal] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [newAvatarUrl, setNewAvatarUrl] = useState('');
    const [blob, setBlob] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        setAvatarUrl(props.avatar)
    }, [props.avatar])

    const fileToBase64 = (file) => {
        const promise = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            }
        })
        return promise
    }

    const handleDelete = async () => {
        if (props.avatar) {
            await deleteAvatar(props.uuid).then((res) => {
                console.log(res)
                if (res.data === true) {
                    props.handleAvatar(null);
                    dispatch(removeAvatar());
                    setShowModal(false);
                } else {
                    alert("erreur server")
                    setShowModal(false)
                }
            }).catch((err) => {
                console.log(err)
                if (err) {
                    alert("erreur server")
                }
            });
        } else {
            alert("Vous n'avez pas d'avatar")
        }
    }

    const handleChangeAvatar = async e => {
        const [file] = e.target.files;
        if (file) {
            console.log(file.size)
            console.log(file.size / (1024 * 1024));
            if (file.size / (1024 * 1024) <= 2) {
                let urlfile = await fileToBase64(file);
                setAvatarUrl(urlfile);
            } else {
                alert("poide de l'image est superieure à 2MB")
            }

        }
    }

    const onChangeCrop = (cropper) => {
        setNewAvatarUrl(cropper.getCanvas()?.toDataURL());
        cropper.getCanvas()?.toBlob((newblob) => {
            setBlob(newblob);
        })

    };

    const handleUploadAvatar = async () => {
        try {
            if (newAvatarUrl) {
                const formData = new FormData();
                const newAvatarFile = new File([blob], "avatar", { type: "image/png" });
                console.log(newAvatarFile)
                formData.append('image', newAvatarFile);
                const response = await postAvatar(formData);
                if (response.status === 200) {
                    props.handleAvatar(newAvatarUrl);
                    setShowModal(false);
                } else {
                    return (<div>error</div>)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <ButtonBis className="mt-3 w-full" title="Editer ma photo" onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto max-w-2x1 w-96 min-w-fit">
                            {/*content*/}
                            <div className="border-4 border-solid border-black rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex justify-end p-1 border-solid rounded-t">
                                    <button
                                        onClick={() => {
                                            setShowModal(false);
                                            setAvatarUrl(props.avatar)
                                        }}
                                        type="button"
                                    >
                                        <XIcon className='h-4 w-4 m-1' />
                                    </button>
                                </div>
                                <div className="relative px-8 flex-col mb-3 h-fit text-center ">
                                    <div className="">
                                        {avatarUrl ?
                                            <Cropper
                                                src={avatarUrl}
                                                className="h-96"
                                                stencilComponent={CircleStencil}
                                                stencilProps={{ aspectRatio: 1 }}
                                                onChange={onChangeCrop}
                                                maxHeight={600}
                                                minHeight={200}
                                            />
                                            :
                                            <UserCircleIcon className="w-80 h-80" />
                                        }
                                    </div>
                                    <div>
                                        <InputFile onChange={handleChangeAvatar} accept="image/png,image/jpg" className="my-1" />
                                    </div>
                                    <div>
                                        <ButtonBis
                                            title="Modifier l'avatar"
                                            onClick={handleUploadAvatar}
                                        />
                                    </div>
                                    <div>
                                        <ButtonBis
                                            title="Suprimer l'avatar"
                                            onClick={() => { handleDelete() }}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}