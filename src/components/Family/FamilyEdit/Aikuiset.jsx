import React, { useState } from 'react'
import { FieldArray } from 'formik'
import styled from 'styled-components'
import { v4 } from 'uuid'
import FormikInput from '../../FormikInput'

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0 20px;
`
const Li = styled.li`
  text-align: left;
  padding: 5px 15px;
`
const Button = styled.button`
  padding: 3px;
  margin: 0 2px;
  border-radius: 4px;
`

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
    })
  }
  while (values.aikuiset.length > amount) {
    values.aikuiset.pop()
  }

  // Renderöidään komponentit taulukolla
  const aikuiset = []
  for (let i = 0; i < values.aikuiset.length; i++) {
    aikuiset.push(
      <Li key={values.aikuiset[i].id}>
        <FormikInput name={`aikuiset.${i}.nimi`} />
      </Li>
    )
  }


  return (
    <FieldArray name={name}>
      {() => {
        return (
          <>
            <div>
              <b>Aikuiset ({amount})</b>
              <Button onClick={decrementAmount}>
                -1
              </Button>
              <Button onClick={incrementAmount}>
                +1
              </Button>
            </div>
            <Ul>
              {aikuiset}
            </Ul>
          </>
        )
      }}
    </FieldArray>
  )
}

export default Aikuiset
