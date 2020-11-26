import React from 'react'
import styled from 'styled-components'

const Th = styled.th`
  text-align: left;
`
const Td = styled.td`
  width: 100%;
`
const Header = styled.p`
  margin: ${props => props.rowsAreSpaced ? '2px 10px 2px 0': '0 10px 0 0'};
  white-space: nowrap;
`

const TableRow = ({ label, children, rowsAreSpaced, dataStyle }) => {
  return (
    <tr>
      <Th>
        <Header rowsAreSpaced={rowsAreSpaced}>
          {label}:
        </Header>
      </Th>
      <Td style={dataStyle}>
        {children}
      </Td>
    </tr>
  )
}

export default TableRow
