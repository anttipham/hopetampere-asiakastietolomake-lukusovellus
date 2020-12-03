import { useContext, useState, useEffect } from 'react'
import SheetsContext from '../utils/SheetsContext'
import formSheetParser from '../utils/formSheetParser'
import dataSheetParser from '../utils/dataSheetParser'

const ROWCELL_A1_PLACE = 'BZ2'

const useSheet = (sheetIndex) => {
  let parser
  switch (sheetIndex) {
    case 0:
      parser = formSheetParser
      break
    case 1:
      parser = dataSheetParser
      break
  }
  const doc = useContext(SheetsContext)
  const sheet = doc.sheetsByIndex[sheetIndex]
  const [sheetRows, setSheetRows] = useState()
  const [parsedSheetRows, setParsedSheetRows] = useState([])

  const fetchSheetRows = async () => {
    if (sheetIndex === 0) {
      await sheet.loadCells(ROWCELL_A1_PLACE)
      const rowCell = sheet.getCellByA1(ROWCELL_A1_PLACE)
      // Miinus yksi headerin vuoksi ja miinus yksi, koska indeksointi alkaa nollasta eikä ykkösestä
      setSheetRows(await sheet.getRows({ offset: Math.max(0, rowCell.value - 2) }))
      return
    } else if (sheetIndex === 1) {
      setSheetRows(await sheet.getRows())
      return
    }
  }

  // alustetaan tiedot
  useEffect(() => {
    fetchSheetRows()
  }, [])

  // kun tiedot päivittyvät, parsitaan tieto uudelleen
  useEffect(() => {
    if (!sheetRows) {
      return
    }
    setParsedSheetRows(
      sheetRows
        .map((data, index) => ({ index, ...parser(data) }))
        .filter(data => data.aika)
    )
  }, [sheetRows])

  return {
    sheet,
    sheetRows,
    parsedSheetRows,
    refetchSheetRows: fetchSheetRows
  }
}

export const useFormSheet = () => {
  const doc = useContext(SheetsContext)
  const formSheet = doc.sheetsByIndex[0]

  const wrapperObject = useSheet(0)

  // Päivitetään offset (eli ylin tarkastamattoman rivin paikka) hakemisen yhteydessä
  const rowCell = formSheet.getCellByA1(ROWCELL_A1_PLACE)
  const refetchFormSheetRows = async () => {
    await wrapperObject.refetchSheetRows()

    for (let i = 0; i < wrapperObject.sheetRows.length; i++) {
      const row = wrapperObject.sheetRows[i]
      if (!row['Tarkistettu']) {
        rowCell.value = row.rowIndex
        await rowCell.save()
        return
      }
    }
  }

  return {
    formSheet: wrapperObject.sheet,
    formSheetRows: wrapperObject.sheetRows,
    parsedFormSheetRows: wrapperObject.parsedSheetRows,
    refetchFormSheetRows
  }
}

export const useDataSheet = () => {
  const wrapperObject = useSheet(1)
  return {
    dataSheet: wrapperObject.sheet,
    dataSheetRows: wrapperObject.sheetRows,
    parsedDataSheetRows: wrapperObject.parsedSheetRows,
    refetchDataSheetRows: wrapperObject.refetchSheetRows
  }
}

