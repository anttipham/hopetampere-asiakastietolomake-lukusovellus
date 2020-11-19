import React, { useState } from 'react'
import Family from './Family'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import styled from 'styled-components'

const DISPLAY_AMOUNT = 15

const BigText = styled.h2`
  text-align: center;
  color: rgb(35, 185, 215);
  font-size: 2.5rem;
  margin: 40px 0;
`

const FamilyList = ({
  families,
  noFamiliesText,
  validate,
  refetchRows,
  refetchText,
  handleEditSubmit,
  handleHuomioitavaaSubmit,
  handleDelete,
  isNewForm
}) => {
  const [displayAmount, setDisplayAmount] = useState(DISPLAY_AMOUNT)
  useBottomScrollListener(() => Math.max(families.length, setDisplayAmount(displayAmount + DISPLAY_AMOUNT)))

  return (
    <div>
      <button onClick={refetchRows}>{refetchText}</button>

      {families.length === 0 &&
        <BigText>{noFamiliesText}</BigText>
      }

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

      {families.length > displayAmount &&
        <BigText>+ {families.length - displayAmount}</BigText>
      }
    </div>
  )
}

export default FamilyList
