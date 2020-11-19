import React, { useState } from 'react'
import styled from 'styled-components'
import Child from './Child'
import FamilyContainer from '../FamilyContainer'
import TableRow from '../../TableRow'
import Header from '../Header'
import HuomioitavaaForm from './HuomioitavaaForm'

const FamilyOpenContainer = styled(FamilyContainer)`
  // background-color: rgb(243, 243, 243);
`
const Part = styled.div`
  margin: 20px 0;
`
const P = styled.p`
  margin: 0;
  word-wrap: break-word;
`
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
const LapsiFlexParent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: stretch;
`
const LapsiFlexChild = styled.div`
  width: calc(100% / 3);
  min-width: 230px;
`
const NotificationSuccess = styled.div`
  color: green;
`

const FamilyOpen = ({ family, setDisplay, onSubmit }) => {
  const [huomioitavaaMessage, setHuomioitavaaMessage] = useState('')

  const handleSubmit = (values) => {
    onSubmit(values)

    setHuomioitavaaMessage('Päivitetty')
    setTimeout(() => {
      setHuomioitavaaMessage('')
    }, 5000)
  }

  return (
    <FamilyOpenContainer>
      <Header family={family} />

      <button onClick={() => setDisplay('close')}>
        Sulje
      </button>
      <button onClick={() => setDisplay('edit')}>
        Muokkaa
      </button>

      <Part>
        <table>
          <tbody>
            <TableRow rowsAreSpaced label="Sähköposti">
              {family.sähköposti}
            </TableRow>
            <TableRow rowsAreSpaced label="Nimi">
              {family.nimi}
            </TableRow>
            <TableRow rowsAreSpaced label="Syntymävuosi">
              {family.syntymävuosi}
            </TableRow>
            <TableRow rowsAreSpaced label="Osoite">
              {family.osoite}
            </TableRow>
            {Boolean(family.puhelinnumero) &&
              <TableRow rowsAreSpaced label="Puhelinnumero">
                {family.puhelinnumero}
              </TableRow>
            }
            {Boolean(family.ilvestappara) &&
              <TableRow rowsAreSpaced label="Ilves tai Tappara">
                {family.ilvestappara}
              </TableRow>
            }
            <tr>
              <th colSpan="2">
              Elämäntilanne:
              </th>
            </tr>
            <tr>
              <td colSpan="2">
                <P>{family.elämäntilanne}</P>
              </td>
            </tr>
          </tbody>
        </table>
      </Part>

      <Part>
        <b>Aikuiset ({family.aikuiset.length})</b>
        {family.aikuiset.length > 0 &&
          <Ul>
            {family.aikuiset.map(aikuinen =>
              <Li key={aikuinen.id}>{aikuinen.nimi}</Li>
            )}
          </Ul>
        }
      </Part>

      <Part>
        <b>Lapset ({family.lapset.length})</b>
        {family.lapset.length > 0 &&
          <LapsiFlexParent>
            {family.lapset.map(lapsi =>
              <LapsiFlexChild key={lapsi.id}>
                <Child child={lapsi} />
              </LapsiFlexChild>
            )}
          </LapsiFlexParent>
        }
      </Part>

      <HuomioitavaaForm
        initialValues={{
          index: family.index,
          huomioitavaa: family.huomioitavaa
        }}
        onSubmit={handleSubmit}
      />
      {huomioitavaaMessage &&
        <NotificationSuccess>
          {huomioitavaaMessage}
        </NotificationSuccess>
      }
    </FamilyOpenContainer>
  )
}

export default FamilyOpen
