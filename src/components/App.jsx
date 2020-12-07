import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NewForms from './NewForms'
import TopBar from './TopBar'
import styled from 'styled-components'
import CustomerRegister from './CustomerRegister'
import Footer from './Footer'

const Container = styled.div`
  margin: 0 auto;
  // width: 1100px;
  width: 100%;
  max-width: 1100px;
`
const Content = styled.div`
  padding: 10px 20px;
  background-color: rgba(35, 185, 215, 0.3);

  @media print {
    background-color: white;
  }
`

const App = () => {
  return (
    <Container>
      <TopBar />

      <Content>
        <Switch>
          <Route path="/customerregister" component={CustomerRegister} />
          <Route path="/" component={NewForms} />
        </Switch>

        <Footer />
      </Content>
    </Container>
  )
}

export default App