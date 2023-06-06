import * as Yup from 'yup';

export default Yup.object({
    email: Yup.string().required('Le champ email est requis').email('Veuillez saisir une adresse email valide'),
    password: Yup.string().required('Le champ mot de passe est requis').min(8, 'Le mot de passe doit avoir au moins 8 caractères'),
});