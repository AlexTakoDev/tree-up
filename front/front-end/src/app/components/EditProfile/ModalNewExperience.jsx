import React, { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { Field, Formik } from 'formik';
import ButtonBis from '../base/ButtonBis'
import apiGateway from '../../api/backend/apiGateway';
import { postExperience } from '../../api/backend/profile';
import validationSchema from '../../utils/experienceSchema'

export default function ModalNewExperience(props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <ButtonBis
                className="mt-6"
                title="Ajouter une expérience"
                onClick={() => setShowModal(true)}
            />
            {showModal ? (
                <Formik
                    initialValues={{
                        name: "",
                        date_start: "",
                        date_end: "",
                        place: "",
                        description: ""
                    }}
                    onSubmit={async (values, actions) => {
                        values.name = values.name.trim();
                        values.place = values.place.trim();
                        values.description = values.description.trim();
                        await postExperience(values).then((res) => {
                            props.handleAdd(res.data.result)
                            actions.resetForm({});
                            setShowModal(false);
                        }).catch((err) => {
                            if (err) {
                                alert("erreur server")
                            }
                            console.log(err);
                            setShowModal(false);
                        });
                        actions.setSubmitting(false)
                    }}
                    validationSchema={validationSchema}
                >
                    {props => (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative my-6 mx-auto max-w-2x1 w-2/6 min-w-fit">
                                    {/*content*/}
                                    <div className="border-4 border-solid border-black rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <form onSubmit={props.handleSubmit}>
                                            <div className="flex justify-end p-1 border-solid rounded-t">
                                                <button onClick={() => setShowModal(false)} type="button">
                                                    <XIcon className='h-4 w-4 m-1' />
                                                </button>
                                            </div>
                                            <div className="relative px-8 flex-col justify-around text-center mb-3 ">
                                                <p className="text-3x1">Ajouter une experience</p>
                                                <div className="flex flex-col">
                                                    <Field
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full"
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        placeholder='Titre'
                                                        maxLength="30"
                                                    />
                                                    {props.errors.name && props.touched.name ? (
                                                        <div>{props.errors.name}</div>
                                                    ) : null}
                                                </div>

                                                <div className="flex justify-between ">
                                                    <div className="flex flex-col items-start">
                                                        <Field
                                                            id="date_start"
                                                            name="date_start"
                                                            type="date"
                                                            className="border-2 border-gradient-v rounded-lg my-2 w-36"
                                                        />
                                                        {props.errors.date_start && props.touched.date_start ? (
                                                            <div>{props.errors.date_start}</div>
                                                        ) : null}
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <Field
                                                            id="date_end"
                                                            name="date_end"
                                                            type="date"
                                                            className="border-2 border-gradient-v rounded-lg my-2 w-36"
                                                        />
                                                        {props.errors.date_end && props.touched.date_end ? (
                                                            <div>{props.errors.date_end}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <Field
                                                        id="place"
                                                        name="place"
                                                        type="text"
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full"
                                                        placeholder='Lieux'
                                                    />
                                                    {props.errors.place && props.touched.place ? (
                                                        <div>{props.errors.place}</div>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col">
                                                    <Field
                                                        as="textarea"
                                                        id="description"
                                                        name="description"
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full h-20 resize-none"
                                                        placeholder='Description'
                                                        maxLength="501"
                                                        minLength="50"
                                                    />
                                                    {props.errors.description && props.touched.description ? (
                                                        <div>{props.errors.description}</div>
                                                    ) : null}
                                                </div>
                                                <ButtonBis
                                                    title="Ajouter une experience"
                                                    type="submit"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    )}
                </Formik>
            ) : null}
        </div>
    )
}