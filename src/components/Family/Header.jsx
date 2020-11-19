import React from 'react'
import styled from 'styled-components'

const FlexParent = styled.div`
  display: flex;
`
const FlexChild = styled.div`
  flex-grow: 1;
  width: 100%;
`
const FlexChildDate = styled(FlexChild)`
  // margin-left: calc(-100% + 800px)
  text-align: right;
`

const Header = ({ family, children }) => {
  return (
    <FlexParent>
      <FlexChild>
        <b>{children ? children : family.tyyppi}</b>
      </FlexChild>
      <FlexChildDate>
        <b>{family.aika.toLocaleString()}</b>
      </FlexChildDate>
    </FlexParent>
  )
}

export default Header
