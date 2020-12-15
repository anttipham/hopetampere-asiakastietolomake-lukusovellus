import React, { useState, useEffect } from 'react'
import Family from './Family'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import styled from 'styled-components'
import NoPrint from './NoPrint'

const DISPLAY_AMOUNT = 25

const BigText = styled.h2`
  text-align: center;
  color: rgb(35, 185, 215);
  font-size: 2rem;
  margin: 40px 0;
`

const FamilyList = ({
  families,
  noFamiliesText,
  validate,
  handleEditSubmit,
  handleHuomioitavaaSubmit,
  handleDelete,
  isNewForm,
  displayAll
}) => {
  const [displayAmount, setDisplayAmount] = useState(DISPLAY_AMOUNT)
  useBottomScrollListener(() => Math.max(families.length, setDisplayAmount(displayAmount + DISPLAY_AMOUNT)))

  useEffect(() => {
    if (displayAll && isFinite(displayAmount)) {
      setDisplayAmount(Infinity)
    }
  }, [displayAll])

  return (
    <div>
      <NoPrint>
        {families.length === 0 &&
          <BigText>{noFamiliesText}</BigText>
        }
      </NoPrint>

      {families
        .slice(0, displayAmount)
        .map((family) =>
          <Family
            key={family.id}
            family={family}
            validate={validate}
            onEditSubmit={handleEditSubmit}
            onHuomioitavaaSubmit={handleHuomioitavaaSubmit}
            onDelete={handleDelete}
            isNewForm={isNewForm}
          />
        )
      }

      <NoPrint>
        {families.length > displayAmount &&
          <BigText>+ {families.length - displayAmount}</BigText>
        }
      </NoPrint>
    </div>
  )
}

export default FamilyList
