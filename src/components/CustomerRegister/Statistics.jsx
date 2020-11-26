import React from 'react'
import TableRow from '../TableRow'
import NoPrint from '../NoPrint'
import styled from 'styled-components'

const Container = styled.div`
  /* padding: 15px; */
  margin: 30px;
  /* background-color: rgba(35, 185, 215, 0.3); */
  /* border-radius: 20px; */
  font-size: 1.1em;
`

const Statistics = ({ families }) => {
  const childrenAmount = families.reduce((children, family) => children + family.lapset.length, 0)

  return (
    <Container>
      <NoPrint>
        <table>
          <tbody>
            <TableRow label="Perheitä">{families.length}</TableRow>
            <TableRow label="Lapsia">{childrenAmount}</TableRow>
          </tbody>
        </table>
      </NoPrint>
    </Container>
  )
}

export default Statistics
