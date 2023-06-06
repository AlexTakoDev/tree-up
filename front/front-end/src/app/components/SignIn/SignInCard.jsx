import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/base/Button";
import Input from "../../components/base/Input";
import { useFormik } from "formik";
import validationSchema from "../../utils/registerSchema";
import ReCAPTCHA from "react-google-recaptcha";
import Welcome from "./Welcome";
import { registerUser } from "../../api/backend/account";
import InputPassword from "../base/InputPassword";
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";

/*
Un message d'erreur apparaît lorsque l'utilisateur change de champ
Un message d'erreur apparaît lorsque l'utilisateur renseigne une adresse mail déjà utilisé
L'utilisateur ne peut pas valider le formulaire si il a commencé à remplir un champ et si tout les champs ne sont pas remplis : il ne peut pas cliquer sur le bouton de soumission
La fakeApi et le schema de validation du formulaire se trouve dans le dossier utils
Le composant est responsive
*/

function SignInCard() {
  const [captchaValidate, setcaptchaValidate] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [errorLog, setErrorLog] = useState("");

  const navigate = useNavigate();

  const captchagoogle = useRef(null);

  const handleCopy = (e) => {
    e.preventDefault();
  }

  const handlePaste = (e) => {
    e.preventDefault();
  }

  const onChange = () => {
    if (captchagoogle.current.getValue()) {
      setcaptchaValidate(true);
      console.log("Vous n'êtes pas un robot");
    } else {
      setcaptchaValidate(false);
      console.log("Vous êtes un robot !");
    }
  };

  const initialValues = {
    email: "",
    lastname: "",
    firstname: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const {
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    isValid,
    touched,
    handleSubmit,
    setFieldError,
    resetForm,
    errors,
  } = useFormik({ initialValues, validationSchema, onSubmit });

  const register = (values) => {
    delete values.passwordConfirmation;
    const user = values;
    registerUser(user)
      .then((response) => {
        console.log("utilisateur enregistrée");
        setErrorLog("");
        navigate(URL_LOGIN);
        resetForm();
        // setIsRegister(true);
      })
      .catch((error) => {
        console.log("error", error);
        if (error.message === "Network Error") {
          setErrorLog("Erreur serveur");
        }
        if (error.response) {
          console.log(error.response.data.message);
          setErrorLog(error.response.data.message);
        }
      });
  };

  async function onSubmit(formValues) {
    if (captchaValidate) {
      setcaptchaValidate(true);
      register(formValues);
    } else {
      setcaptchaValidate(false);
    }
  }

  return (
    <div className="bg-gray-1 w-full max-w-2xl md:w-4/5 lg:w-4/5 2xl:max-w-3xl rounded-lg flex flex-col  items-center">
      {isRegister ? (
        <Welcome />
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="p-2 bg-transparent w-full sm:w-4/5 md:w-4/5 lg:w-4/5 2xl:w-4/5 m-2 rounded-lg flex flex-col justify-center items-center"
          >
            <h2 className="my-8 text-2xl sm:text-3xl lg:text-4xl">
              Inscription
            </h2>
            <Input
              type="email"
              placeholder="exemple@gmail.com"
              description="Adresse mail enregistrée lors de l'inscription"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <small className="error">{errors.email}</small>
            )}
            <Input
              type="text"
              placeholder="Nom"
              name="lastname"
              value={values.lastname || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.lastname && errors.lastname && (
              <small className="error">{errors.lastname}</small>
            )}
            <Input
              type="text"
              placeholder="Prénom"
              name="firstname"
              value={values.firstname || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.firstname && errors.firstname && (
              <small className="error">{errors.firstname}</small>
            )}
            <Input
              type="text"
              placeholder="Nom d'utilisateur"
              description="Votre identité auprès des membres de Tree-up"
              name="username"
              value={values.username || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.username && errors.username && (
              <small className="error">{errors.username}</small>
            )}
            <InputPassword
              type="password"
              placeholder="********"
              name="password"
              value={values.password || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <small className="error">{errors.password}</small>
            )}
            <InputPassword
              type="password"
              placeholder="********"
              name="passwordConfirmation"
              value={values.passwordConfirmation || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              onCopy={handleCopy}
              onPaste={handlePaste}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <small className="error">{errors.passwordConfirmation}</small>
            )}
            <ReCAPTCHA
              className="my-4"
              ref={captchagoogle}
              sitekey="6Lc43mskAAAAAPGuj5wsQMpI-Bkcvy1cpXJusonn"
              onChange={onChange}
            />
            {captchaValidate === false && (
              <p className="w-full text-red-600 text-center mb-4">
                Merci de valider le captcha
              </p>
            )}
            {errorLog && (
              <p className="w-full text-red-600 text-center mb-4">{errorLog}</p>
            )}
            <Button
              className="w-full sm:w-4/5"
              title="S'INSCRIRE"
              type="submit"
              disabled={isSubmitting || !isValid}
            />
          </form>
          <div className="mb-4 w-full flex justify-end">
            <Link className="mr-4 mt-4" to="/login">
              Vous avez déjà un compte ?
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default SignInCard;
