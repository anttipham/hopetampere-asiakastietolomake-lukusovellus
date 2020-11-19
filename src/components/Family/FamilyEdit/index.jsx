import React from 'react'
import { Formik } from 'formik'
import FamilyEditForm from './FamilyEditForm'
import { format } from 'date-fns'

const FamilyEdit = ({ family, validate, onSubmit, setDisplay, isNewForm, onDelete }) => {
  const closeEdit = () => setDisplay(isNewForm ? 'close' : 'open')

  const initialValues = {
    ...family,
    lapset: family.lapset.map(lapsi => ({
      ...lapsi,
      syntymäpäivä: format(lapsi.syntymäpäivä, 'yyyy-MM-dd')
    }))
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit }) => (
        <>
          <FamilyEditForm
            family={family}
            values={values}
            validate={validate}
            onSubmit={handleSubmit}
            onAbort={closeEdit}
            onDelete={onDelete}
          />
        </>
      )}
    </Formik>
  )
}

export default FamilyEdit
