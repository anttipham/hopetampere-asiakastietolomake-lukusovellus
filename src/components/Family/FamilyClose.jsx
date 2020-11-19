import React from 'react'
import FamilyContainer from './FamilyContainer'
import styled from 'styled-components'
import Header from './Header'

const FamilyContainerWithHover = styled(FamilyContainer)`
  background-color: rgb(239, 239, 239);

  &:hover {
    background-color: rgba(35, 185, 215, 0.3);
  }
`

const FamilyView = ({ family, setDisplay, isNewForm }) => {
  const handleOnClick = () => setDisplay(isNewForm ? 'edit' : 'open')

  return (
    <FamilyContainerWithHover onClick={handleOnClick}>
      <Header family={family} />

      <div>
        {family.nimi}, {family.sähköposti}
      </div>
      <div>
        Alaikäisiä lapsia: {family.lapset.length}
      </div>
      {/* <p>Käyntimäärät: {family.visits.length}</p> */}
    </FamilyContainerWithHover>
  )
}

export default FamilyView
