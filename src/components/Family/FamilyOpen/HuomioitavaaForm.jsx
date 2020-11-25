import React from 'react'
import { Formik } from 'formik'
import FormikInput from '../../FormikInput'
import Button from '../../Button'

const HuomioitavaaForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <>
          <b>Huomioitavaa:</b>
          <FormikInput
            name="huomioitavaa"
            type="textarea"
            rows={4}
          />
          <Button onClick={handleSubmit} type="submit">Päivitä</Button>
        </>
      )}
    </Formik>
  )
}

export default HuomioitavaaForm
