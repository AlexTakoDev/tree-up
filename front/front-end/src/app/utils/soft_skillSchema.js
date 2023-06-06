import * as Yup from 'yup';
import { LASTNAME } from "../constants/regex";

export default Yup.object({
    name : Yup.string()
    .min(3,'3 caractère minimum')
    .required('nécessaires')
    .trim('ne peut contenir que des espaces')
    .matches(
        LASTNAME,
        "Le nom doit contenir uniquement des lettres, des accents et les espaces"
      ),
    description : Yup.string()
    .min(3,'3 caractère minimum')
    .required('nécessaires')
    .trim('ne peut contenir que des espaces')
})