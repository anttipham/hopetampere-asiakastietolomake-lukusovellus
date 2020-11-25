import React from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'
import FormikInput from '../../FormikInput'
import FieldArrayInput from './FieldArrayInput'

const Container = styled.div`
  margin: 5px 10px;
`
const nameStyle = {
  width: 'calc(60% - 12px)',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0
}
const ageStyle = {
  width: 'calc(40% - 12px)',
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
        <Container key={aikuinen.id}>
          <FormikInput
            style={nameStyle}
            name={`aikuiset.${i}.nimi`}
            placeholder="Nimi"
          />
          <FormikInput
            style={ageStyle}
            name={`aikuiset.${i}.syntymävuosi`}
            placeholder="Syntymävuosi"
            type="number"
          />
        </Container>
      ))}
    </FieldArrayInput>
  )
}

export default Aikuiset
