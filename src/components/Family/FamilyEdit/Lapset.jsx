import React from 'react'
import FieldArrayInput from './FieldArrayInput'
import TableRow from '../../TableRow'
import styled from 'styled-components'
import FormikInput from '../../FormikInput'
import calcAge from '../../../utils/calcAge'
import { v4 as uuid } from 'uuid'

const Container = styled.div`
  // border: 1px solid black;
  padding: 10px;
  margin: 5px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`

const Lapset = ({ name, values }) => {
  return (
    <FieldArrayInput
      name={name}
      label="Lapset"
      minWidth="325px"
      values={values}
      newArrayElement={{
        id: uuid(),
        sukupuoli: '',
        syntymäpäivä: '',
        vaatekoko: '',
        kenkäkoko: '',
        kiinnostuksenKohteet: '',
      }}
    >
      {values.lapset.map((lapsi, i) => (
        <Container key={lapsi.id}>
          <table>
            <tbody>
              <TableRow label="Sukupuoli">
                <FormikInput name={`lapset[${i}].sukupuoli`} />
              </TableRow>
              <TableRow label="Syntymäpäivä">
                <FormikInput name={`lapset[${i}].syntymäpäivä`} type="date" />
              </TableRow>
              <TableRow label="Ikä">
                {values.lapset[i]
                  && values.lapset[i].syntymäpäivä
                  && calcAge(new Date(values.lapset[i].syntymäpäivä))
                }
              </TableRow>
              <TableRow label="Vaatekoko">
                <FormikInput name={`lapset[${i}].vaatekoko`} />
              </TableRow>
              <TableRow label="Kenkäkoko">
                <FormikInput name={`lapset[${i}].kenkäkoko`} />
              </TableRow>
              <tr>
                <th colSpan="2">
                      Kiinnostuksen kohteet:
                </th>
              </tr>
              <tr>
                <td colSpan="2">
                  <FormikInput
                    name={`lapset[${i}].kiinnostuksenKohteet`}
                    type="textarea"
                    rows={4}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
      ))}
    </FieldArrayInput>
  )
}

export default Lapset
