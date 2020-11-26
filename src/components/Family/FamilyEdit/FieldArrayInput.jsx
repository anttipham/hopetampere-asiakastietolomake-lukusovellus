import React from 'react'
import styled from 'styled-components'
import { FieldArray } from 'formik'
import Button from '../../Button'
import Flexbox from '../../Flexbox'

const SmallButton = styled(Button)`
  padding: 3px;
  margin: 0 2px;
  border-radius: 4px;
`

const FieldArrayInput = ({ values, children, minWidth, name, label, newArrayElement }) => {
  return (
    <FieldArray name={name}>
      {(arrayHelpers) => {
        const incrementAmount = () => {
          arrayHelpers.push(newArrayElement)
        }
        const decrementAmount = () => {
          arrayHelpers.pop()
        }
        return (
          <>
            <div>
              <b>{label} ({values[name].length})</b>
              <SmallButton onClick={decrementAmount}>
              -1
              </SmallButton>
              <SmallButton onClick={incrementAmount}>
              +1
              </SmallButton>
            </div>

            <Flexbox minWidth={minWidth}>
              {children}
            </Flexbox>
          </>
        )
      }}
    </FieldArray>
  )
}

export default FieldArrayInput