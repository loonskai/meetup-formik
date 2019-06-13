import { useReducer } from 'react';
import { SET_FIELD_VALUE, SET_FIELD_TOUCHED } from './constants';

function reducer(state, { type, payload }) {
  switch (type) {
    case SET_FIELD_VALUE:
      return {
        ...state, // contains errors and touched
        values: {
          ...state.values,
          ...payload
        }
      };
    case SET_FIELD_TOUCHED:
      return {
        ...state, // contains errors and values
        touched: {
          ...state.touched,
          ...payload
        }
      };
    default:
      return state;
  }
}

function useFormik({ initialValues }) {
  // As our useFormik internal state is complex object with some nested properties we'll use useReducer hook instead of useState. Another point is that in more complex form it's much easier to handle all the inputs using reducer concept
  // Formik uses name attribute of inputs as the way to access symmetrical aspects of useFormik state: values.name, errors.name, touched.name. That's pretty scalable
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    errors: {},
    touched: {}
  });

  // When we run handleChange from our component it's gonna run dispatch SET_FIELD_VALUE
  const handleChange = e => {
    e.persist();
    dispatch({
      type: SET_FIELD_VALUE,
      payload: {
        [e.target.name]: e.target.value
      }
    });
  };

  // When we run handleBlur from our component it's gonna run dispatch SET_FIELD_TOUCHED
  const handleBlur = e => {
    e.persist();
    dispatch({
      type: SET_FIELD_TOUCHED,
      payload: {
        [e.target.name]: true
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Validate inputs and touch every input just to be sure if user sees all error messages
  };

  return {
    handleChange,
    handleBlur,
    ...state // we get values, touched, errors in our component
  };
}

export default useFormik;
