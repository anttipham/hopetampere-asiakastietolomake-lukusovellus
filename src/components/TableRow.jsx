import React from 'react'
import styled from 'styled-components'

const Td = styled.td`
  width: 100%;
`
const P = styled.p`
  margin: 0;
  word-break: break-all;
`

const TableRow = ({ label, children, rowsAreSpaced, headerStyle }) => {
  const style = {
    padding: rowsAreSpaced ? '5px 10px 5px 0': '0 10px 0 0',
    ...headerStyle
  }
  return (
    <tr>
      <th style={style}>{label}:</th>
      <Td>
        <P>{children}</P>
      </Td>
    </tr>
  )
}

export default TableRow
