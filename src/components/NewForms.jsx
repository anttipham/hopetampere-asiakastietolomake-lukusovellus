import React from 'react'
import { parse, compareAsc } from 'date-fns'
import { useFormSheet, useDataSheet } from '../hooks/useSheets'
import formValidationError from '../utils/formValidationError'
import FamilyList from './FamilyList'
import Button from './Button'
import NoPrint from './NoPrint'
import HeaderText from './HeaderText'

const NewForms = () => {
  const { formSheetRows, parsedFormSheetRows, refetchFormSheetRows } = useFormSheet()
  const { dataSheet, parsedDataSheetRows, refetchDataSheetRows } = useDataSheet()

  const validate = (family) => {
    return formValidationError(family, parsedDataSheetRows)
  }

  const refetch = async () => {
    await Promise.all([
      refetchFormSheetRows(),
      refetchDataSheetRows()
    ])
  }

  const removeRow = async (index) => {
    const formRow = formSheetRows[index]
    formRow['Tarkistettu'] = 'X'
    await formRow.save()

    // // Päivitetään offset (eli ylin tarkastamattoman rivin paikka)
    // for (let i = 0; i < formSheetRows.length; i++) {
    //   const row = formSheetRows[i]
    //   if (!row['Tarkistettu']) {
    //     rowCell.value = row.rowIndex
    //     await rowCell.save()
    //     return
    //   }
    // }
  }

  const handleSubmit = async (values) => {
    try {
      const promises = []

      // formSheetistä ei pysty poistamaan, joten lisätään Tarkistettu-kenttään ruksi
      promises.push(removeRow(values.index))

      // kirjoita dataSheetiin
      promises.push(dataSheet.addRow({
        aika: values.aika,
        tyyppi: values.tyyppi,
        sähköposti: values.sähköposti,
        nimi: values.nimi,
        syntymävuosi: values.syntymävuosi,
        osoite: values.osoite,
        puhelinnumero: '\'' + values.puhelinnumero, // heittomerkki pakottaa solun olevan Sheetsissä merkkijono eikä numero
        elämäntilanne: values.elämäntilanne,
        ilvestappara: values.ilvestappara,
        aikuiset: JSON.stringify(values.aikuiset),
        lapset: JSON.stringify(values.lapset.map(lapsi => ({
          ...lapsi,
          syntymäpäivä: parse(lapsi.syntymäpäivä, 'yyyy-MM-dd', new Date(0, 0))
        }))),
        huomioitavaa: values.huomioitavaa,
        id: values.id,
      }))

      await Promise.all(promises)
      await refetch()
    } catch (e) {
      window.alert(JSON.stringify(e))
    }
  }
  const handleDelete = async (index) => {
    if (window.confirm(`Haluatko poistaa henkilön ${parsedFormSheetRows.find(row => row.index === index).nimi}?`)) {
      await removeRow(index)
      await refetch()
    }
  }

  return (
    <div>
      <NoPrint>
        <HeaderText>Vastaanotetut lomakkeet</HeaderText>

        <p>
          Tässä näkymässä tarkistetaan asiakkaiden lähettämiä lomakkeita.
          Kun tallennat muutokset tässä näkymässä, lomake siirretään asiakasrekisteriin.
        </p>

        <Button onClick={refetch}>
          Päivitä vastaanotetut lomakkeet
        </Button>
      </NoPrint>

      <FamilyList
        families={parsedFormSheetRows.sort((family1, family2) => compareAsc(family1.aika, family2.aika))}
        noFamiliesText="Uusia lomakkeita ei ole löydetty."
        validate={validate}
        handleEditSubmit={handleSubmit}
        handleDelete={handleDelete}
        isNewForm
      />
    </div>
  )
}

export default NewForms
