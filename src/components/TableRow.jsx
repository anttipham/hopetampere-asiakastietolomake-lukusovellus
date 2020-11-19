import React from 'react'
import styled from 'styled-components'

const Td = styled.td`
  width: 100%;
`

const TableRow = ({ label, children, rowsAreSpaced }) => {
  const style = {
    padding: rowsAreSpaced ? '5px 10px 5px 0': '0 10px 0 0'
  }

  return (
    <tr>
      <th style={style}>{label}:</th>
      <Td>{children}</Td>
    </tr>
  )
}

export default TableRow
