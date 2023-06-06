import * as Yup from 'yup';

export default Yup.object({
    username: Yup.string().min(3).required('required'),
    job: Yup.string().min(3).required('required'),
    description: Yup.string().min(3).required('required')
})