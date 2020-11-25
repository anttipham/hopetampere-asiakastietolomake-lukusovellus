import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import NoPrint from './NoPrint'

const TopBarContainer = styled.div`
  margin: 0 auto;
  width: calc(100% - 70px);
  max-width: 1100px;
  padding: 20px 35px;
  background-color: rgb(35, 185, 215);
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const TabContainer = styled.div`
  margin: 10px 5px;
  max-width: 250px;
  text-align: center;
  flex-grow: 1;
`
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '20px',
}

const Tab = ({ ...props }) => {
  return (
    <TabContainer>
      <Link style={linkStyle} {...props} />
    </TabContainer>
  )
}

const TopBar = () => {
  return (
    <NoPrint>
      <TopBarContainer>
        <Tab to="/">Lomakkeiden tarkistus</Tab>
        <Tab to="/customerregister">Asiakasrekisteri</Tab>
      </TopBarContainer>
    </NoPrint>
  )
}

export default TopBar