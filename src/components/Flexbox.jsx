import React from 'react'
import styled from 'styled-components'

const FlexParent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: stretch;
`
const FlexChild = styled.div`
  width: calc(100% / 3);
  @media (max-width: 1080px) {
    width: calc(100% / 2);
  }
  @media (max-width: 750px) {
    width: 100%;
  }
`

const Flexbox = ({ /* minWidth, */ children }) => {
  // minWidth:iä käytin saadakseni flexboxin laatikoihin minimileveyden,
  // mutta päädyin media-ratkaisuun, koska se on helpompi toteuttaa
  return (
    <FlexParent>
      {React.Children.map(children, (child) => (
        <FlexChild>
          {child}
        </FlexChild>
      ))}
    </FlexParent>
  )
}

export default Flexbox
