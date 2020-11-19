import React from 'react'
import TableRow from '../../TableRow'
import styled from 'styled-components'
import calcAge from '../../../utils/calcAge'

const Container = styled.div`
  height: calc(100% - 30px);
  // border: 1px solid black;
  background-color: rgba(35, 185, 215, 0.2);
  // background-color: rgb(239, 239, 239);
  padding: 10px;
  margin: 5px;
  border-radius: 20px;
`
const P = styled.p`
  margin: 0;
  word-wrap: break-word;
`

const Child = ({ child }) => {
  return (
    <Container>
      <table>
        <tbody>
          <TableRow label="Sukupuoli">{child.sukupuoli}</TableRow>
          <TableRow label="Syntymäpäivä">{child.syntymäpäivä.toLocaleDateString()}</TableRow>
          <TableRow label="Ikä">{calcAge(child.syntymäpäivä)}</TableRow>
          <TableRow label="Vaatekoko">{child.vaatekoko}</TableRow>
          <TableRow label="Kenkäkoko">{child.kenkäkoko}</TableRow>
          <tr>
            <th colSpan="2">
              Kiinnostuksen kohteet:
            </th>
          </tr>
          <tr>
            <td colSpan="2">
              <P>{child.kiinnostuksenKohteet}</P>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}

export default Child
