import React from 'react'
import styled from 'styled-components'
import { Input } from '../TextInput'

const FILTER_PADDING_WIDTH = 30
const FILTER_PADDING_HEIGHT = 20
const FILTER_HEIGHT = 25
const FilterInput = styled(Input)`
  width: calc(100% - ${2*FILTER_PADDING_WIDTH}px);
  height: ${FILTER_HEIGHT}px;
  padding: ${FILTER_PADDING_HEIGHT}px ${FILTER_PADDING_WIDTH}px;
  border-radius: ${(2 * FILTER_PADDING_HEIGHT + FILTER_HEIGHT) / 3}px;
  outline: none;
`

const Filter = (props) => {
  return (
    <FilterInput {...props} />
  )
}

export default Filter
