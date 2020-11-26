import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
  text-align: center;
  font-size: 3em;
  color: rgb(35, 185, 215);
  /* color: white; */
  /* text-shadow: 0 0 3px #999999; */
`

const HeaderText = ({ children }) => {
  return (
    <H1>
      {children}
    </H1>
  )
}

export default HeaderText
