import React, { useState, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { format } from 'date-fns';
import { useParams } from "react-router-dom";
import ButtonBis from "../base/ButtonBis";
import { UserCircleIcon } from "@heroicons/react/solid";
import validationSchema from '../../utils/editProfileUserSchema';
import { useNavigate } from 'react-router-dom';
import { editProfile } from "../../api/backend/profile";
import ModalEditAvatar from "./ModalEditAvatar";


const ProfileUser = ({ firstname, lastname, username, email, work, date_birth, description, avatar, handleAvatar }) => {
    const { uuid } = useParams();

    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [users, setUsers] = useState({
        newPassword: "",
        confirmPassword: "",
        oldPassword: "",
        firstname: firstname,
        lastname: lastname,
        date_birth: date_birth,
        email: email,
        work: work,
        description: description,
        username: username,
    });

    const navigate = useNavigate();

    useEffect(() => {
        setUsers({
            firstname: firstname,
            lastname: lastname,
            date_birth: date_birth,
            email: email,
            work: work,
            description: description,
            username: username,
        });
    }, [firstname, lastname, date_birth, email, work, description, username]);

    return (
        <div>
            <Formik
                initialValues={{
                    ...users,
                    newPassword: users.newPassword,
                    confirmPassword: users.confirmPassword,
                    oldPassword: users.oldPassword,
                }}

                onSubmit={async (values, { setFieldError, setErrors }) => {

                    const updatedValues = {
                        username: values.username || username,
                        avatar: values.avatar,
                        date_birth: values.date_birth || date_birth,
                        firstname: values.firstname || firstname,
                        lastname: values.lastname || lastname,
                        email: values.email || email,
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword,
                        confirmPassword: values.confirmPassword,
                        description: values.description || description,
                        work: values.work || work,
                        city: values.city
                    };
                    try {
                        console.log(updatedValues)
                        const res = await editProfile(updatedValues);
                        setUsers(updatedValues);

                        navigate(`/profile/${uuid}`)
                    } catch (err) {
                        setErrorMessage(err.response.data.message.message);
                        setIsError(true);


                    }
                }}
                validationSchema={validationSchema}
            >
                {props => (
                    <div>
                        {isError && (
                            <div className="error flex items-center justify-center text-red-500 text-xl italic">
                                {errorMessage}
                            </div>
                        )}
                        <Form onSubmit={props.handleSubmit}>
                            <ErrorMessage name="global" >
                                {message => <div className="error  flex items-center justify-center text-red-500 text-xl italic">{message}</div>}
                            </ErrorMessage>
                            <div className="flex p-5">
                                <div className="flex flex-col w-1/4 ">
                                    <div className="h-3/4">
                                        {avatar ?
                                            <img
                                                src={avatar}
                                                alt='user avatar'
                                                className="w-full"
                                            /> :
                                            <UserCircleIcon className="w-full" />}
                                    </div>

                                    <Field
                                        className="text-center border-2 border-gradient-v rounded-lg my-1 "
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder={props.values.username ? props.values.username : username}
                                        onChange={(event) => {
                                            const value = event.target.value.trim();
                                            props.handleChange(event);
                                            if (value === '') {
                                                event.target.value = users.username;
                                            }
                                        }}
                                    />
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                    <Field
                                        className="text-center border-2 border-gradient-v rounded-lg my-1 "
                                        id="work"
                                        name="work"
                                        type="text"
                                        value={props.values.work}
                                        placeholder={work ? work : 'work'}
                                        onChange={(event) => {
                                            const value = event.target.value.trim();
                                            props.handleChange(event);
                                            if (value === '') {
                                                event.target.value = users.work;
                                            }
                                        }}
                                    />
                                    <ModalEditAvatar avatar={avatar} uuid={uuid} handleAvatar={handleAvatar} />
                                </div>
                                <div className="flex flex-col items-center w-3/4 ml-2">
                                    <Field
                                        className="border-2 border-gradient-v rounded-lg my-1 w-full h-full resize-none "
                                        id="description"
                                        name="description"
                                        component="textarea"
                                        placeholder={description ? description : "Courte description de l'utilisateur"}
                                        onChange={(event) => {
                                            const value = event.target.value.trim();
                                            props.handleChange(event);
                                            if (value === '') {
                                                event.target.value = users.description;
                                            }
                                        }}
                                    />
                                    <ButtonBis
                                        className="mt-2"
                                        title="Sauvegarder les modification"
                                        type="submit"
                                    />
                                </div>
                            </div>

                            <h3 className=" mt-5 mx-5">Paramètres utilisateurs</h3>
                            <div className="justify-between flex mt-5 mx-5">

                                <Field
                                    type="text"
                                    name="firstname"
                                    placeholder={firstname}
                                    className="input w-1/3"
                                    onChange={(event) => {
                                        const value = event.target.value.trim();
                                        props.handleChange(event);
                                        if (value === '') {
                                            event.target.value = users.firstname;
                                        }
                                    }}
                                />
                                <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />

                                <Field
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder={lastname}
                                    className="input w-1/3"
                                    onChange={(event) => {
                                        const value = event.target.value.trim();
                                        props.handleChange(event);
                                        if (value === '') {
                                            event.target.value = users.lastname;
                                        }
                                    }}

                                />
                                <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="flex mx-5 ">
                                <Field
                                    type="date"
                                    name="date_birth"
                                    id="date_birth"
                                    value={props.values.date_birth}
                                    className="input mt-5 w-full"
                                    onChange={(event) => {
                                        const value = event.target.value.trim();
                                        props.handleChange(event);
                                        if (value === '') {
                                            event.target.value = users.date_birth;
                                        }
                                    }}
                                />
                            </div>
                            <ErrorMessage name="date_birth" component="div" className="text-red-500 text-sm mx-5" />
                            <div>
                                <h3 className=" mt-5 mx-5">Paramètre du profil</h3>
                            </div>
                            <div className="flex mt-5 mx-5 ">
                                <Field
                                    type="password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    placeholder="Ancien mot de passe"
                                    className="input w-full"
                                    onChange={(event) => {
                                        const value = event.target.value.trim();
                                        props.handleChange(event);
                                        if (value === '') {
                                            event.target.value = oldPassword;
                                        }
                                    }}
                                />
                            </div>
                            <div className="mx-5">
                                <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex mt-5 mx-5 justify-between">
                                <Field
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="Nouveau mot de passe"
                                    className="input w-1/3"
                                    onChange={(event) => {
                                        const value = event.target.value.trim();
                                        props.handleChange(event);
                                        if (value === '') {
                                            event.target.value = newPassword;
                                        }
                                    }}
                                />
                                <Field
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirmation mot de passe"
                                    className="input w-1/3"
                                    onChange={(event) => {
                                        const value = event.target.value.trim();
                                        props.handleChange(event);
                                        if (value === '') {
                                            event.target.value = confirmPassword;
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex mt-5 mx-5 justify-between">
                                <div className=" w-1/3">
                                    <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="w-1/3">
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                        </Form>
                    </div>)}
            </Formik>
        </div>
    );
};

export default ProfileUser;