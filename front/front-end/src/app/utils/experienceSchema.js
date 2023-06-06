import * as Yup from 'yup';
import { LASTNAME } from "../constants/regex";

export default Yup.object({
    name : Yup.string()
    .min(3,'3 caractère minimum')
    .max(30).required('obligatoire')
    .trim('ne peut contenir que des espaces'),
    date_start : Yup.date()
    .required('obligatoire')
    .max(new Date(), "Doit être antérieur à la date d'aujourd'hui")
    .min(new Date('1980-01-01'),"Doit être superieure au 1er janvier 1980"),
    date_end : Yup.date()
    .when('date_start',(date_start, schema) => (date_start && schema.min(date_start,"La date de fin doit être postérieure à la date du début"))),
    place : Yup.string()
    .min(3,'3 caractère minimum')
    .required('obligatoire')
    .trim('ne peut contenir que des espaces')
    .matches(
        LASTNAME,
        "Le lieu doit contenir uniquement des lettres, des accents et des espaces"
      ),
    description : Yup.string()
    .min(50,'50 caractères minimum').
    max(500,'500 caractères maximum')
    .required('obligatoire')
    .trim('ne peut contenir que des espaces'),
})  