import React from "react";
import { Field, Form, Formik } from "formik";
import Button from "../Base/Button";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { selectUser, selectIsLogged } from '../../redux-store/authenticationSlice'

const ProfileUser = ({ firstname, lastname, username, email, work, date_birth, description, uuid_user, avatar}) => {
  const userLogged = useSelector(selectUser);
  const isUserLogged = userLogged?.uuid === uuid_user;
  return (
    <Formik
      initialValues={{
        firstname: firstname,
        lastname: lastname,
        date_birth: date_birth,
        email: email,
        description: description,
        username: username,
        work: work,
      }}
    >
      <div>
        <div className="flex p-5">
          <div className="flex flex-col w-1/4">
            {avatar ? 
            <img 
              src={avatar} 
              alt='user avatar' 
              className="w-full"
            /> :
              <UserCircleIcon />}
            <p className="text-center">{username}</p>
            <p className="text-center mt-1">{work}</p>
            {isUserLogged ? (
                <Link to = {`/editprofile/${uuid_user}`} >
                  <Button className="mt-3" title="Editer mon profil" />
                </Link>
            ) :null}

        </div>
        <div className="flex flex-col items-center w-3/4 ml-2">
          <Field
            className="border-2 border-gradient-v rounded-lg my-1 w-full h-full resize-none "
            id="description"
            name="description"
            component="textarea"
            value={description}
            readOnly
          />

        </div>
      </div>
      <h3 className=" mt-5 mx-5">Paramètres utilisateurs</h3>

      <Form >
        <div className="justify-between flex mt-5 mx-5">

          <Field
            type="text"
            name="firstname"
            value={firstname}
            className="input w-1/3"
            disabled
            readOnly
          />
          <Field
            type="text"
            name="lastname"
            value={lastname}
            className="input w-1/3"
            disabled
            readOnly
          />
        </div>
        <div className="flex mx-5 ">
          {date_birth ? (
            <input
              type="date"
              name="date_birth"
              value={date_birth}
              className="input flex mt-5 w-full"
              disabled
              readOnly
            />
          ) : (
            <input
              type="text"
              name="date_birth"
              placeholder="Date de naissance non renseignée"
              className="input flex mt-5 w-full"
              disabled
              readOnly
            />
          )}

        </div>
        <div>
          <h3 className=" mt-5 mx-5">Paramètre du profil</h3>
        </div>
        <div className="flex mx-5">
          <Field
            type="text"
            name="email"
            value={email}
            className="input flex mt-5 w-full "
            disabled
            readOnly
          />
        </div>
      </Form>
    </div>
    </Formik >
  );
};

export default ProfileUser;