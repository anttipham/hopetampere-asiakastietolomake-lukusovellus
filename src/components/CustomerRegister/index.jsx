import React, { useState } from 'react'
import { useDataSheet } from '../../hooks/useSheets'
import filterFamily from '../../utils/filterFamily'
import formValidationError from '../../utils/formValidationError'
import { useDebounce } from 'use-debounce'
import FamilyList from '../FamilyList'
import { compareDesc } from 'date-fns'
import Statistics from './Statistics'
import NoPrint from '../NoPrint'
import Button from '../Button'
import Filter from './Filter'
import styled from 'styled-components'
import Header from './InfoText'
import HeaderText from '../HeaderText'

const FlexParent = styled.div`
  display: flex;
  align-items: center;
`

const CustomerRegister = () => {
  const [filter, setFilter] = useState('')
  const [debouncedFilter] = useDebounce(filter, 500)

  const { dataSheetRows, parsedDataSheetRows, refetchDataSheetRows } = useDataSheet()
  const filteredRows = parsedDataSheetRows.filter(family => filterFamily(debouncedFilter, family))

  const validate = (family) => {
    const families = parsedDataSheetRows.filter(otherFamily => otherFamily.id !== family.id)
    return formValidationError(family, families)
  }

  const handleEditSubmit = async (values) => {
    console.log(values)
    const family = dataSheetRows[values.index]

    // family.aika = values.aika.toJSON()
    family.tyyppi = values.tyyppi
    family.sähköposti = values.sähköposti
    family.nimi = values.nimi
    family.syntymävuosi = values.syntymävuosi
    family.osoite = values.osoite
    family.puhelinnumero = values.puhelinnumero
    family.elämäntilanne = values.elämäntilanne
    family.ilvestappara = values.ilvestappara
    family.aikuiset = JSON.stringify(values.aikuiset)
    family.lapset = JSON.stringify(values.lapset)
    family.huomioitavaa = values.huomioitavaa
    // family.id = values.id

    await family.save()
    refetchDataSheetRows()
  }
  const handleHuomioitavaaSubmit = async (values) => {
    dataSheetRows[values.index].huomioitavaa = values.huomioitavaa
    await dataSheetRows[values.index].save()
  }
  const handleDelete = async (index) => {
    if (window.confirm(`Haluatko poistaa henkilön ${parsedDataSheetRows[index].nimi}?`)) {
      await dataSheetRows[index].delete()
      await refetchDataSheetRows()
    }
  }

  return (
    <div>
      <NoPrint>
        <HeaderText>Asiakasrekisteri</HeaderText>

        <FlexParent>
          <Statistics families={parsedDataSheetRows} />
          <Header />
        </FlexParent>

        <Filter
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
          placeholder="Filtteri"
        />

        <Button onClick={refetchDataSheetRows}>
          Päivitä rekisteri
        </Button>
        <Button onClick={() => window.print()}>
          Tulosta avatut asiakkaat
        </Button>

      </NoPrint>

      <FamilyList
        families={filteredRows.sort((family1, family2) => compareDesc(family1.aika, family2.aika))}
        noFamiliesText="Asiakasrekistereitä ei ole löydetty."
        validate={validate}
        handleEditSubmit={handleEditSubmit}
        handleHuomioitavaaSubmit={handleHuomioitavaaSubmit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default CustomerRegister
