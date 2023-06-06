import * as Yup from 'yup';

import { PROJECT_NAME } from '../constants/regex';

export default Yup.object({
    name: Yup.string().trim().required('Le champ name est requis.').matches(PROJECT_NAME, 'Veuillez saisir un nom de projet valide.'),
    uuid_type: Yup.string().trim().required('Le champ Type de projet est requis.'),
    date_start: Yup.date().required('Le champ date de debut est requis.'),
    date_end: Yup.date(),
    description: Yup.string().trim()
        .required('Le champ description est requis.')
        .min(100, "La description doit contenir au moins 100 caractères.")
        .max(5000, 'La description ne doit pas dépasser 5000 caractères.'),
});