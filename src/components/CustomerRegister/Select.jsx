import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
  font-size: 0.9em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  border-width: 1px;
  border-radius: 7px;
  outline: none;
  background-color: white;
  padding: 5px 10px;
  text-align: right;
  width: 255px;

  &:focus {
    box-shadow: 0 0 0 1px black;
  }

  @media print {
    display: none;
  }

`

const Select = ({ ...props }) => (
  <StyledSelect {...props}>
    <option value="sendTime">Lähetysaika (uusin ensin)</option>
    <option value="childrenAmountDesc">Lasten lukumäärä (eniten ensin)</option>
    <option value="childrenAmountAsc">Lasten lukumäärä (vähiten ensin)</option>
  </StyledSelect>
)

export default Select
