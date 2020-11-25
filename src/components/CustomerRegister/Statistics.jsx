import React from 'react'
import TableRow from '../TableRow'
import NoPrint from '../NoPrint'

const Statistics = ({ families }) => {
  const childrenAmount = families.reduce((children, family) => children + family.lapset.length, 0)

  return (
    <NoPrint>
      <table>
        <tbody>
          <TableRow label="Perheitä">{families.length}</TableRow>
          <TableRow label="Lapsia">{childrenAmount}</TableRow>
        </tbody>
      </table>
    </NoPrint>
  )
}

export default Statistics
