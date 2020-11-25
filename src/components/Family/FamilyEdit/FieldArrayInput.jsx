import React from 'react'
import styled from 'styled-components'
import { FieldArray } from 'formik'
import Button from '../../Button'

const FlexParent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`
const FlexChild = styled.div`
  width: calc(100% / 3);
  min-width: 325px;
`
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

            <FlexParent>
              {React.Children.map(children, (child) => (
                <FlexChild style={{ minWidth }}>
                  {child}
                </FlexChild>
              ))}
            </FlexParent>
          </>
        )
      }}
    </FieldArray>
  )
}

export default FieldArrayInput