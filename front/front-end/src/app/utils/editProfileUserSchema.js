import * as Yup from 'yup';
import { ONLY_ALPHA } from '../constants/regex'

export default Yup.object().shape({
    firstname: Yup.string().test('same-firstname', 'firstname est trop court', function (value) {
        if (value === this.parent.firstname) {
            return true; // la valeur n'a pas été modifiée
        } else {
            return value.length >= 3; // la valeur a été modifiée, vérifie la longueur
        }
    })
        .notRequired()
        .min(3, "Le prénom doit comporter au moins 2 caractères.")
        .matches(ONLY_ALPHA,
            "Le nom doit contenir uniquement des caractères alphabétiques")
    ,
    username: Yup.string().test('same-username', 'Username est trop court', function (value) {
        if (value === this.parent.username) {
            return true;
        } else {
            return value.length >= 3;
        }
    })
        .notRequired()
        .matches(ONLY_ALPHA,
            "Le nom doit contenir uniquement des caractères alphabétiques")
        .min(3, "Le nom d'utilisateur doit comporter au moins 3 caractères.")
        .max(20)
    ,
    date_birth: Yup.date()
        .min(new Date('1960-01-01'), "La date de naissance doit être supérieure ou égale à 1960 PREND TA RETRAITE MAINTEANT")
        .max(new Date(), "la date de naissance ne peut être superieure à la date d'aujourd'hui")
    ,
    lastname: Yup.string().test('same-lastname', 'Lastname est trop court', function (value) {
        if (value === this.parent.Lastname) {
            return true;
        } else {
            return value.length >= 3;
        }
    })
        .notRequired()
        .matches(ONLY_ALPHA,
            "Le nom doit contenir uniquement des caractères alphabétiques")
        .min(3, "Le nom d'utilisateur doit comporter au moins 3 caractères.")

    ,
    oldPassword: Yup.string().test('same-oldPassword', function (value) {
        if (value === this.parent.oldPassword) {
            return true;
        } else {
            return value;
        }
    })
        .notRequired()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Le mot de passse doit contenir 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial ")
    ,
    newPassword: Yup.string()
        .notRequired()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Le mot de passse doit contenir 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial ")
    ,
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Le mot de passe doit correspondre')
        .notRequired()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Le mot de passse doit contenir 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial ")
});