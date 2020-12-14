import React from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'
import FormikInput from '../../FormikInput'
import FieldArrayInput from './FieldArrayInput'

const Table = styled.table`
  margin: 5px 10px;
  border-spacing: 0;
  border-collapse: collapse;
`
const Td = styled.td`
  padding: 0;
  vertical-align: top;
`
const BirthYearTd = styled(Td)`
  width: 125px;
`
const nameStyle = {
  // width: 'calc(60% - 12px)',
  width: 'calc(100% - 12px)',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0
}
const ageStyle = {
  // width: 'calc(40% - 12px)',
  width: 'calc(100% - 12px)',
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0
}

const Aikuiset = ({ values }) => {
  return (
    <FieldArrayInput
      label="Täysi-ikäiset"
      name="aikuiset"
      minWidth="200px"
      values={values}
      newArrayElement={{
        id: v4(),
        nimi: '',
        syntymävuosi: ''
      }}
    >
      {values.aikuiset.map((aikuinen, i) => (
        <Table key={aikuinen.id}>
          <tbody>
            <tr>
              <Td>
                <FormikInput
                  style={nameStyle}
                  name={`aikuiset.${i}.nimi`}
                  placeholder="Nimi"
                />
              </Td>
              <BirthYearTd>
                <FormikInput
                  style={ageStyle}
                  name={`aikuiset.${i}.syntymävuosi`}
                  placeholder="Syntymävuosi"
                  type="number"
                />
              </BirthYearTd>
            </tr>
          </tbody>
        </Table>
      ))}
    </FieldArrayInput>
  )
}

export default Aikuiset
