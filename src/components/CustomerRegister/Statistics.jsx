import React from 'react'
import TableRow from '../TableRow'

const Statistics = ({ families }) => {
  const childrenAmount = families.reduce((children, family) => children + family.lapset.length, 0)
  return (
    <div>
      <table>
        <tbody>
          <TableRow label="Perheitä">{families.length}</TableRow>
          <TableRow label="Lapsia">{childrenAmount}</TableRow>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
