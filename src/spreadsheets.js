import config from './atl-lukusovellus-c14569a496ec.json'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const TEST = {
  aika: new Date(),
  sähköposti: 'a',
  nimi: 'a',
  syntymävuosi: 1234,
  osoite: 'a',
  puhelinnumero: 'a',
  elämäntilanne: 'a',
  ilvestappara: 'a',
  aikuiset: 'a',
  lapset: 'a',
  huomioitavaa: 'a'
}

const spreadsheets = async () => {
  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet('1lmlIWQN2x4E2j9nkD2SHhiQXCVmiwzmLmPhSrqlem70')

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
        'sähköposti',
        'nimi',
        'syntymävuosi',
        'osoite',
        'puhelinnumero',
        'elämäntilanne',
        'ilvestaitappara',
        'aikuiset',
        'lapset',
        'huomioitavaa'
      ],
      title: 'Sovelluksen tiedot',
      gridProperties: {
        rowCount: 2,
        columnCount: 13,
        frozenRowCount: 1,
      }
    })
  }
  const theSheet = doc.sheetsByTitle['Sovelluksen tiedot']
  theSheet.addRows([TEST])

  const sheet = doc.sheetsByIndex[0]

  console.log((await sheet.getRows()).map(el => el))
  // console.log(rows[0].name) // 'Larry Page'
  // rows[1].email = 'sergey@abc.xyz' // update a value
  // await rows[1].save() // save updates
  // await rows[1].delete() // delete a row
}

// spreadsheets()

export default spreadsheets