import React, { useState } from 'react'
import { FieldArray } from 'formik'
import Lapsi from './Lapsi'
import styled from 'styled-components'
import { v4 } from 'uuid'
import SmallButton from '../../SmallButton'

const LapsiFlexParent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`
const LapsiFlexChild = styled.div`
  width: calc(100% / 3);
  min-width: 325px;
`
const Lapset = ({ name, values }) => {
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
  while (values.lapset.length < amount) {
    values.lapset.push({
      id: v4(),
      sukupuoli: '',
      syntymäpäivä: '',
      vaatekoko: '',
      kenkäkoko: '',
      kiinnostuksenKohteet: '',
    })
  }
  while (values.lapset.length > amount) {
    values.lapset.pop()
  }

  // Renderöidään komponentit taulukolla
  const lapset = []
  for (let i = 0; i < values.lapset.length; i++) {
    lapset.push(
      <LapsiFlexChild key={values.lapset[i].id}>
        <Lapsi
          index={i}
          values={values}
        />
      </LapsiFlexChild>
    )
  }


  return (
    <FieldArray name={name}>
      {() => {
        return (
          <>
            <div>
              <b>Lapset ({amount})</b>
              <SmallButton onClick={decrementAmount}>
                -1
              </SmallButton>
              <SmallButton onClick={incrementAmount}>
                +1
              </SmallButton>
            </div>
            <LapsiFlexParent>
              {lapset}
            </LapsiFlexParent>
          </>
        )
      }}
    </FieldArray>
  )
}

export default Lapset
