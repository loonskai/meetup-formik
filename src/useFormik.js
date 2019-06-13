import { useReducer, useEffect } from 'react';
import {
  SET_FIELD_VALUE,
  SET_FIELD_TOUCHED,
  SET_ERRORS,
  SUBMIT_ATTEMPT,
  SUBMIT_SUCCESS,
  SUBMIT_FAILURE
} from './constants';
import { setNestedObjectValues } from './utils';

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
    case SET_ERRORS:
      return {
        ...state,
        errors: payload // Your errors are always new because you replace them on each type
      };
    case SUBMIT_ATTEMPT:
      return {
        ...state,
        isSubmitting: true,
        touched: setNestedObjectValues(state.values, true) // Recurse object and set every field 'touched' to true
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: false
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        submitError: payload
      };
    default:
      return state;
  }
}

function useFormik({ initialValues, onSubmit, validate }) {
  // As our useFormik internal state is complex object with some nested properties we'll use useReducer hook instead of useState. Another point is that in more complex form it's much easier to handle all the inputs using reducer concept
  // Formik uses name attribute of inputs as the way to access symmetrical aspects of useFormik state: values.name, errors.name, touched.name. That's pretty scalable
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false
  });

  // Validation
  useEffect(() => {
    if (validate) {
      const errors = validate(state.values);
      dispatch({ type: SET_ERRORS, payload: errors });
    }
  }, [state.values, validate]);

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

  const handleSubmit = async e => {
    e.preventDefault();
    // Validate inputs and touch every input just to be sure if user sees all error messages
    dispatch({ type: SUBMIT_ATTEMPT });
    const errors = validate(state.values);
    if (!Object.keys(errors).length) {
      try {
        await onSubmit(state.values);
        dispatch({ type: SUBMIT_SUCCESS });
      } catch (submitError) {
        // Submit error is different from or component validation error. It may come from API or smth like this
        dispatch({ type: SUBMIT_FAILURE, payload: submitError });
      }
    } else {
      dispatch({ type: SET_ERRORS, payload: errors });
      dispatch({ type: SUBMIT_FAILURE });
    }
  };

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    ...state // we get values, touched, errors in our component
  };
}

export default useFormik;
