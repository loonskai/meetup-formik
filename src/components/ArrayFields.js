import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

import Debug from './Debug';

const ArrayFields = () => {
  return (
    <div>
      <h1>Animal</h1>
      <Formik
        initialValues={{ animals: ['🐈 Kitty', '🐕 Doggo'] }}
        render={({ values, ...other }) => (
          <div className="form-container">
            <Form>
              <FieldArray
                name="animals"
                render={(
                  { push, remove, insert, swap } // arrayHelpers
                ) => (
                  <div>
                    {values.animals && (
                      <div>
                        {values.animals.map((friend, index, arr) => (
                          <Field
                            key={index}
                            name={`animals.${index}`}
                            render={({ field }) => (
                              <div className="field-group">
                                <div className="array-field">
                                  <input {...field} />
                                  <button
                                    className="array-field__add"
                                    onClick={() => remove(index)}
                                  >
                                    X
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
                        <button onClick={() => push('')}>One more</button>
                      </div>
                    )}
                  </div>
                )}
              />
            </Form>
            <Debug data={{ values, ...other }} />
          </div>
        )}
      />
    </div>
  );
};

export default ArrayFields;
