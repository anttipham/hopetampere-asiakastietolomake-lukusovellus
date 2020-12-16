import React from 'react'
import { Formik } from 'formik'
import FamilyEditForm from './FamilyEditForm'
import { format } from 'date-fns'
import * as yup from 'yup'
import calcAge from '../../../utils/calcAge'

const REQUIRED_TEXT = 'ei saa olla tyhjä'
// const SENDER_IS_NOT_ADULT_TEXT = 'Lomakkeen lähettäjä on alaikäinen'
const CHILD_IS_ADULT_TEXT = 'Lapsi on täysi-ikäinen'

const requiredString = (nimi) => yup.string().required(`${nimi} ${REQUIRED_TEXT}`)

const validationSchema = yup.object().shape({
  tyyppi: requiredString('Tyyppi'),
  sähköposti: requiredString('Sähköposti'),
  nimi: requiredString('Nimi'),
  syntymävuosi: yup
    .number()
    .required(`Syntymävuosi ${REQUIRED_TEXT}`),
  // .transform((birthYear) => new Date().getFullYear() - Number(birthYear))
  // .min(18, SENDER_IS_NOT_ADULT_TEXT),

  // .test('is adult', SENDER_IS_NOT_ADULT_TEXT, (birthYear) => {
  //   const possibleAge = new Date().getFullYear() - Number(birthYear)
  //   if (possibleAge < 18) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }),
  osoite: requiredString('Osoite'),
  // puhelinnumero: requiredString('Puhelinnumero'),
  elämäntilanne: requiredString('Elämäntilanne'),
  // ilvestappara: requiredString('Ilves tai Tappara -kenttä'),
  aikuiset: yup.array().of(
    yup.object().shape({
      nimi: requiredString('Nimi'),
      syntymävuosi: requiredString('Syntymävuosi'),
    })
  ),
  lapset: yup.array().of(
    yup.object().shape({
      sukupuoli: requiredString('Sukupuoli'),
      syntymäpäivä: requiredString('Syntymäpäivä')
        .test('is not adult', CHILD_IS_ADULT_TEXT, (birthdate) => {
          if (calcAge(birthdate) < 18) {
            return true
          } else {
            return false
          }
        }),
      vaatekoko: requiredString('Vaatekoko'),
      kenkäkoko: requiredString('Kenkäkoko'),
      kiinnostuksenKohteet: requiredString('Kiinnostuksen kohteet -kenttä'),
    })
  ),
})

const FamilyEdit = ({ family, validate, onSubmit, setDisplay, isNewForm, onDelete }) => {
  const closeEdit = () => setDisplay(isNewForm ? 'close' : 'open')

  const initialValues = {
    ...family,
    // Deep copy
    aikuiset: family.aikuiset.map(aikuinen => ({ ...aikuinen })),
    // Deep copy
    lapset: family.lapset.map(lapsi => ({
      ...lapsi,
      syntymäpäivä: format(lapsi.syntymäpäivä, 'yyyy-MM-dd')
    }))
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
