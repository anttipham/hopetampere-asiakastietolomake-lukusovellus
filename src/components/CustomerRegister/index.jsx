import React, { useState } from 'react'
import { useDataSheet } from '../../hooks/useSheets'
import { Input } from '../TextInput'
import filterFamily from '../../utils/filterFamily'
import styled from 'styled-components'
import formValidationError from '../../utils/formValidationError'
import { useDebounce } from 'use-debounce'
import FamilyList from '../FamilyList'
import { compareDesc } from 'date-fns'
import Statistics from './Statistics'
import NoPrint from '../NoPrint'
import Button from '../Button'

const FILTER_PADDING_WIDTH = 30
const FILTER_PADDING_HEIGHT = 20
const FILTER_HEIGHT = 25
const FilterInput = styled(Input)`
  width: calc(100% - ${2*FILTER_PADDING_WIDTH}px);
  height: ${FILTER_HEIGHT}px;
  padding: ${FILTER_PADDING_HEIGHT}px ${FILTER_PADDING_WIDTH}px;
  border-radius: ${(2 * FILTER_PADDING_HEIGHT + FILTER_HEIGHT) / 3}px;
  outline: none;
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
    await refetchDataSheetRows()
  }
  const handleHuomioitavaaSubmit = (values) => {
    dataSheetRows[values.index].huomioitavaa = values.huomioitavaa
    dataSheetRows[values.index].save()
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
        <Statistics families={parsedDataSheetRows} />

        <FilterInput
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
