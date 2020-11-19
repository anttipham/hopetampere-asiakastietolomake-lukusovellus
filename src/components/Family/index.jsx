import React, { useState } from 'react'
import FamilyOpen from './FamilyOpen'
import FamilyClose from './FamilyClose'
import FamilyEdit from './FamilyEdit'

const Family = ({ family, validate, isNewForm, onEditSubmit, onHuomioitavaaSubmit, onDelete }) => {
  const [display, setDisplay] = useState('close')

  const handleEditSubmit = async (...args) => {
    await onEditSubmit(...args)
    if (!isNewForm) {
      setDisplay('close')
    }
  }

  return (
    <>
      {display === 'close' &&
        <FamilyClose
          family={family}
          setDisplay={setDisplay}
          isNewForm={isNewForm}
        />
      }
      {display === 'open' &&
        <FamilyOpen
          family={family}
          setDisplay={setDisplay}
          onSubmit={onHuomioitavaaSubmit}
        />
      }
      {display === 'edit' &&
        <FamilyEdit
          family={family}
          validate={validate}
          setDisplay={setDisplay}
          isNewForm={isNewForm}
          onSubmit={handleEditSubmit}
          onDelete={onDelete}
        />
      }
    </>
  )
}

export default Family
