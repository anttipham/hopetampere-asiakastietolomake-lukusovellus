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
import Select from './Select'

const FlexParent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
`
const FlexChild = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: no-wrap;
`

const CustomerRegister = () => {
  const [displayAll, setDisplayAll] = useState(false)

  const [filter, setFilter] = useState('')
  const [debouncedFilter] = useDebounce(filter, 500)
  const { dataSheetRows, parsedDataSheetRows, refetchDataSheetRows } = useDataSheet()
  const filteredRows = parsedDataSheetRows.filter(family => filterFamily(debouncedFilter, family))

  const [order, setOrder] = useState('sendTimeDesc')
  const sortBySendingTime = (family1, family2) => {
    return compareDesc(family1.aika, family2.aika)
  }
  const sortFunction = (family1, family2) => {
    const childrenDifference = family1.lapset.length - family2.lapset.length
    if (order.startsWith('childrenAmount')) {
      if (childrenDifference === 0) {
        return sortBySendingTime(family1, family2)
      }
    }

    switch (order) {
      case 'childrenAmountAsc':
        return childrenDifference
      case 'childrenAmountDesc':
        return -childrenDifference
      case 'sendTimeAsc':
        return -sortBySendingTime(family1, family2)
      case 'sendTimeDesc':
      default:
        return sortBySendingTime(family1, family2)
    }
  }

  const validate = (family) => {
    const families = parsedDataSheetRows.filter(otherFamily => otherFamily.id !== family.id)
    return formValidationError(family, families)
  }

  const handleEditSubmit = async (values) => {
    // console.log(values)
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

        <div>
          <FlexParent>
            <Statistics families={parsedDataSheetRows} />
            <Header />
          </FlexParent>
        </div>

        <div>
          <Filter
            value={filter}
            onChange={({ target }) => setFilter(target.value)}
            placeholder="Filtteri"
          />
        </div>

        <FlexParent>
          <FlexChild>
            <Button onClick={refetchDataSheetRows}>
              Päivitä rekisteri
            </Button>
            {!displayAll &&
              <Button onClick={() => setDisplayAll(true)}>
                Näytä kaikki asiakkaat
              </Button>
            }
            <Button onClick={() => window.print()}>
              Tulosta avatut asiakkaat
            </Button>
          </FlexChild>

          {/* <FlexChildRight> */}
          <Select value={order} onChange={({ target }) => setOrder(target.value)} />
          {/* </FlexChildRight> */}
        </FlexParent>
      </NoPrint>

      <FamilyList
        families={filteredRows.sort(sortFunction)}
        noFamiliesText="Asiakasrekistereitä ei ole löydetty."
        validate={validate}
        handleEditSubmit={handleEditSubmit}
        handleHuomioitavaaSubmit={handleHuomioitavaaSubmit}
        handleDelete={handleDelete}
        displayAll={displayAll}
      />
    </div>
  )
}

export default CustomerRegister
