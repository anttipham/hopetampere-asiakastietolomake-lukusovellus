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
  // min-width: 325px;
`

const Flexbox = ({ minWidth, children }) => {
  return (
    <FlexParent>
      {React.Children.map(children, (child) => (
        <FlexChild style={{ minWidth }}>
          {child}
        </FlexChild>
      ))}
    </FlexParent>
  )
}

export default Flexbox
