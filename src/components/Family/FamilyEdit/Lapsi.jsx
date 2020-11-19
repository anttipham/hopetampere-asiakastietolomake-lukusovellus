import React from 'react'
import TableRow from '../../TableRow'
import styled from 'styled-components'
import FormikInput from '../../FormikInput'
import calcAge from '../../../utils/calcAge'

const Container = styled.div`
  // border: 1px solid black;
  padding: 10px;
  margin: 5px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`

const Lapsi = ({ values, index }) => {
  return (
    <Container>
      <table>
        <tbody>
          <TableRow label="Sukupuoli">
            <FormikInput name={`lapset[${index}].sukupuoli`} />
          </TableRow>
          <TableRow label="Syntymäpäivä">
            <FormikInput name={`lapset[${index}].syntymäpäivä`} type="date" />
          </TableRow>
          <TableRow label="Ikä">
            {values.lapset[index]
              && values.lapset[index].syntymäpäivä
              && calcAge(new Date(values.lapset[index].syntymäpäivä))
            }
          </TableRow>
          <TableRow label="Vaatekoko">
            <FormikInput name={`lapset[${index}].vaatekoko`} />
          </TableRow>
          <TableRow label="Kenkäkoko">
            <FormikInput name={`lapset[${index}].kenkäkoko`} />
          </TableRow>
          <tr>
            <th colSpan="2">
                  Kiinnostuksen kohteet:
            </th>
          </tr>
          <tr>
            <td colSpan="2">
              <FormikInput
                name={`lapset[${index}].kiinnostuksenKohteet`}
                type="textarea"
                rows={4}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}

export default Lapsi
