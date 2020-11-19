import React from 'react'
import styled from 'styled-components'
import FamilyContainer from '../FamilyContainer'
import TableRow from '../../TableRow'
import FormikInput from '../../FormikInput'
import Lapset from './Lapset'
import Aikuiset from './Aikuiset'
import Header from '../Header'

const FamilyEditContainer = styled(FamilyContainer)`
  background-color: rgb(251, 245, 234);
`
const Part = styled.div`
  margin: 20px 0;
`
const ErrorText = styled.p`
  color: red;
`

const FamilyEditForm = ({ family, values, validate, onSubmit, onAbort, onDelete }) => {
  const errors = validate(values)

  return (
    <FamilyEditContainer>
      <Header family={family}>
        <div>
          <b>Tyyppi:</b>
          <FormikInput name="tyyppi" style={{ marginLeft: '5px', width: '270px' }} />
        </div>
      </Header>

      <button onClick={onAbort}>Sulje muokkaustila tallentamatta</button>
      <button onClick={() => onDelete(family.index)}>
        Poista
      </button>

      <Part>
        {errors.map(error =>
          <ErrorText key={error}>{error}</ErrorText>
        )}
      </Part>

      <Part>
        <table>
          <tbody>
            <TableRow rowsAreSpaced label="Sähköposti">
              <FormikInput name="sähköposti" />
            </TableRow>
            <TableRow rowsAreSpaced label="Nimi">
              <FormikInput name="nimi" />
            </TableRow>
            <TableRow rowsAreSpaced label="Syntymävuosi">
              <FormikInput name="syntymävuosi" type="number" />
            </TableRow>
            <TableRow rowsAreSpaced label="Osoite">
              <FormikInput name="osoite" />
            </TableRow>
            <TableRow rowsAreSpaced label="Puhelinnumero">
              <FormikInput name="puhelinnumero" />
            </TableRow>
            <TableRow rowsAreSpaced label="Ilvestappara">
              <FormikInput name="ilvestappara" />
            </TableRow>
            <tr>
              <th colSpan="2">
              Elämäntilanne:
              </th>
            </tr>
            <tr>
              <td colSpan="2">
                <FormikInput
                  name="elämäntilanne"
                  type="textarea"
                  rows={8}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Part>

      <Part>
        <Aikuiset
          name="aikuiset"
          values={values}
        />
      </Part>

      <Part>
        <Lapset
          name="lapset"
          values={values}
        />
      </Part>

      <Part>
        <b>Huomioitavaa</b>
        <FormikInput name="huomioitavaa" />
      </Part>

      <button onClick={onSubmit} type="submit">
        Tallenna muutokset
      </button>
    </FamilyEditContainer>
  )
}

export default FamilyEditForm
