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

  // let r = ['Aikaleima', 'Sähköpostiosoite', 'Huoltajan koko nimi', 'Huoltajan syntymävuosi', 'Osoite, postinumero ja postitoimipaikka', 'Puhelinnumero', 'Yhteydenottoni koskee seuraavia', 'Elämäntilanne', 'Ilves tai Tappara', 'Kaikkien muiden taloudessa asuvien täysi-ikäisten koko nimi', '1. lapsen sukupuoli', '1. lapsen syntymäpäivä', '1. lapsen vaatekoko', '1. lapsen kenkäkoko', '1. lapsen kiinnostuksen kohteet', '2. lapsen sukupuoli', '2. lapsen syntymäpäivä', '2. lapsen vaatekoko', '2. lapsen kenkäkoko', '2. lapsen kiinnostuksen kohteet', '3. lapsen sukupuoli', '3. lapsen syntymäpäivä', '3. lapsen vaatekoko', '3. lapsen kenkäkoko', '3. lapsen kiinnostuksen kohteet', '4. lapsen sukupuoli', '4. lapsen syntymäpäivä', '4. lapsen vaatekoko', '4. lapsen kenkäkoko', '4. lapsen kiinnostuksen kohteet', '5. lapsen sukupuoli', '5. lapsen syntymäpäivä', '5. lapsen vaatekoko', '5. lapsen kenkäkoko', '5. lapsen kiinnostuksen kohteet', '6. lapsen sukupuoli', '6. lapsen syntymäpäivä', '6. lapsen vaatekoko', '6. lapsen kenkäkoko', '6. lapsen kiinnostuksen kohteet', '7. lapsen sukupuoli', '7. lapsen syntymäpäivä', '7. lapsen vaatekoko', '7. lapsen kenkäkoko', '7. lapsen kiinnostuksen kohteet', '8. lapsen sukupuoli', '8. lapsen syntymäpäivä', '8. lapsen vaatekoko', '8. lapsen kenkäkoko', '8. lapsen kiinnostuksen kohteet', '9. lapsen sukupuoli', '9. lapsen syntymäpäivä', '9. lapsen vaatekoko', '9. lapsen kenkäkoko', '9. lapsen kiinnostuksen kohteet', '10. lapsen sukupuoli', '10. lapsen syntymäpäivä', '10. lapsen vaatekoko', '10. lapsen kenkäkoko', '10. lapsen kiinnostuksen kohteet', '11. lapsen sukupuoli', '11. lapsen syntymäpäivä', '11. lapsen vaatekoko', '11. lapsen kenkäkoko', '11. lapsen kiinnostuksen kohteet', '12. lapsen sukupuoli', '12. lapsen syntymäpäivä', '12. lapsen vaatekoko', '12. lapsen kenkäkoko', '12. lapsen kiinnostuksen kohteet', 'Hope ry:n lahjoitukset on tarkoitettu vain henkilökohtaiseen käyttöön. En myy niitä eteenpäin. Hyväksyn ilmoittamieni tietojen tallentamisen.', 'Onko taloudessasi muita täysi-ikäisiä henkilöitä sinun lisäksesi']

  // Sovellukselle lisätään uusi sarake, johon laitetaan merkintä, onko tieto käsitelty ja laitettu asiakasrekisteriin.
  const formSheet = doc.sheetsByIndex[0]
  await formSheet.loadHeaderRow()
  const headers = formSheet.headerValues
  if (!headers.includes('Tarkistettu')) {
    await formSheet.setHeaderRow([...headers, 'Tarkistettu'])
  }

  // Säilötään soluun BZ2 tiedot ylimmän käsittelemättömän rivin indeksistä. Solussa BY2 on label.
  await formSheet.loadCells('BY2:BZ2')
  const labelCell = formSheet.getCellByA1('BY2')
  const rowCell = formSheet.getCellByA1('BZ2')
  if (!rowCell.value) {
    labelCell.value = 'Ylin tarkistamaton lomake'
    rowCell.value = 2
    await formSheet.saveUpdatedCells()
  }

  // const rows = await formSheet.getRows()
  // rows[0].rowIndex

  return doc
}

export default getSheets