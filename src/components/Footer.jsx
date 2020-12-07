import React from 'react'
import styled from 'styled-components'
import NoPrint from './NoPrint'

const FooterContainer = styled.footer`
  text-align: center;
  font-size: 12px;
`

const Footer = () => {
  return (
    <NoPrint>
      <FooterContainer>
        <div>
          <em>Antti Pham (antti.pham@gmail.com)</em>
        </div>
        <div>
          <em>Sovellus tehty talvella 2020</em>
        </div>
      </FooterContainer>
    </NoPrint>
  )
}

export default Footer