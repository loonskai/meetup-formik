import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username is too short')
    .matches(/^((?!(Alexey)).)*$/i, 'Must not be Alexey'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Minimum eight characters, at least one letter and one number'
    )
});

export default validationSchema;
