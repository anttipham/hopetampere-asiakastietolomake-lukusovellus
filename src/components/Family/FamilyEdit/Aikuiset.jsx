import React, { useState } from 'react'
import { FieldArray } from 'formik'
import styled from 'styled-components'
import { v4 } from 'uuid'
import FormikInput from '../../FormikInput'
import SmallButton from '../../SmallButton'

const LapsiFlexParent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`
const LapsiFlexChild = styled.div`
  width: calc(100% / 3 - 20px);
  min-width: 200px;
  padding: 10px;
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

const Aikuiset = ({ name, values }) => {
  const [amount, setAmount] = useState(values[name].length)

  const incrementAmount = () => {
    setAmount(amount + 1)
  }
  const decrementAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1)
    }
  }

  // Päivitetään Formikin tilaa jos on tarve
  while (values.aikuiset.length < amount) {
    values.aikuiset.push({
      id: v4(),
      nimi: '',
      syntymävuosi: ''
    })
  }
  while (values.aikuiset.length > amount) {
    values.aikuiset.pop()
  }

  // Renderöidään komponentit taulukolla
  const aikuiset = []
  for (let i = 0; i < values.aikuiset.length; i++) {
    aikuiset.push(
      <LapsiFlexChild key={values.aikuiset[i].id}>
        <>
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
        </>
      </LapsiFlexChild>
    )
  }


  return (
    <FieldArray name={name}>
      {() => {
        return (
          <>
            <div>
              <b>Täysi-ikäiset ({amount})</b>
              <SmallButton onClick={decrementAmount}>
                -1
              </SmallButton>
              <SmallButton onClick={incrementAmount}>
                +1
              </SmallButton>
            </div>

            <LapsiFlexParent>
              {aikuiset}
            </LapsiFlexParent>
          </>
        )
      }}
    </FieldArray>
  )
}

export default Aikuiset
