/* eslint-disable no-undef */
// Käytetään globaaleja muuttujia, jotka sijaitsevat public/config.js-tiedostossa
// interface config {
//   id: string;
//   client_email: string;
//   private_key: string;
// }

import { GoogleSpreadsheet } from 'google-spreadsheet'
// import config from './config.json'

const getSheets = async () => {
  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(config.sheet_id)

  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: config.client_email,
    private_key: config.private_key,
  })
  await doc.loadInfo()

  if (doc.sheetsByIndex.length <= 1) {
    await doc.addSheet({
      headerValues: [
        'aika',
        'tyyppi',
        'sähköposti',
        'nimi',
        'syntymävuosi',
        'osoite',
        'puhelinnumero',
        'elämäntilanne',
        'ilvestappara',
        'aikuiset',
        'lapset',
        'huomioitavaa',
        'id',
      ],
      title: 'Sovelluksen tiedot',
      gridProperties: {
        rowCount: 2,
        columnCount: 14,
        frozenRowCount: 1,
      }
    })
  }

  const formSheet = doc.sheetsByIndex[0]
  // Tehdään seuraavien kohtien promiset täällä jo valmiiksi.
  const [rows] = await Promise.all([
    formSheet.getRows({ limit: 1 }),
    formSheet.loadCells('BY2:BZ2')
  ])

  // Sovellukselle lisätään uusi sarake, johon laitetaan merkintä, onko tieto käsitelty ja laitettu asiakasrekisteriin.
  const headers = formSheet.headerValues
  if (!headers.includes('Tarkistettu')) {
    await formSheet.setHeaderRow([...headers, 'Tarkistettu'])
  }

  // Säilötään soluun BZ2 tiedot ylimmän käsittelemättömän rivin indeksistä. Solussa BY2 on label.
  const labelCell = formSheet.getCellByA1('BY2')
  const rowCell = formSheet.getCellByA1('BZ2')
  if (!labelCell.value && rows.length !== 0) {
    labelCell.value = 'Ylin tarkistamaton rivi'
    rowCell.value = 2
    await formSheet.saveUpdatedCells()
  }

  // const rows = await formSheet.getRows()
  // rows[0].rowIndex

  return doc
}

export default getSheets