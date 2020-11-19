import React from 'react'
import { Formik } from 'formik'
import FormikInput from '../../FormikInput'

const HuomioitavaaForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <>
          <b>Huomioitavaa:</b>
          <FormikInput name="huomioitavaa" />
          <button onClick={handleSubmit} type="submit">Päivitä</button>
        </>
      )}
    </Formik>
  )
}

export default HuomioitavaaForm
