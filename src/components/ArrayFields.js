import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

import Debug from './Debug';

const ArrayFields = () => {
  return (
    <Formik
      initialValues={{
        animals: [
          { name: '🐈 Kitty', type: 'text' },
          { name: '🐕 Doggo', type: 'text' },
          { name: '👨‍💻 Hackerman', type: 'password' }
        ]
      }}
      onSubmit={() => {}}
      render={({ values, ...other }) => (
        <div className="form-container">
          <Form>
            <FieldArray
              name="animals"
              render={({ push, remove, insert, swap }) =>
                values.animals && (
                  <div>
                    {values.animals.map((animal, index, arr) => (
                      <Field
                        key={index}
                        name={`animals[${index}].name`}
                        render={props => (
                          <div className="field-group">
                            <div className="array-field">
                              <input
                                {...props.field}
                                type={animal.type}
                                autoComplete="off"
                              />
                              <button
                                className="array-field__add"
                                onClick={() => remove(index)}
                              >
                                ✖
                              </button>
                            </div>
                            {index !== arr.length - 1 && (
                              <button
                                className="array-field__swap"
                                onClick={() => swap(index, index + 1)}
                              >
                                ⬍
                              </button>
                            )}
                          </div>
                        )}
                      />
                    ))}
                    <button onClick={() => push({ name: '🐣 ', type: 'text' })}>
                      One more
                    </button>
                  </div>
                )
              }
            />
          </Form>
          <Debug data={{ values, ...other }} />
        </div>
      )}
    />
  );
};

export default ArrayFields;
