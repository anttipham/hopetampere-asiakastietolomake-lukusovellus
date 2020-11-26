import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: calc(100% - 30px);
  background-color: rgba(35, 185, 215, 0.2);
  padding: 10px;
  margin: 5px;
  border-radius: 20px;
  
  display: flex;
  justify-content: center;
  align-items: center;
`
const P = styled.p`
  margin: 0;
  word-wrap: break-word;
  text-align: center;
  vertical-align: middle;
`

const Aikuinen = ({ aikuinen }) => {
  return (
    <Container>
      <P>
        {aikuinen.nimi} ({aikuinen.syntymävuosi})
      </P>
    </Container>
  )
}

export default Aikuinen
