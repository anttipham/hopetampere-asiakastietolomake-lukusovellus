import { parse } from 'date-fns'
import { v4 as uuid } from 'uuid'

const parseDate = (dateString) => {
  // console.log('string',dateString)
  const parsedDate = parse(dateString, 'd.M.y \'klo\' H.mm.ss', new Date(0, 0))
  // console.log('parsed',parsedDate)
  // console.log('format', format(new Date(), 'd.M.y \'klo\' H.mm.ss'))
  // console.log('pure method', new Date(200, 1, 1, 1, 1, 1).toLocaleString())
  return parsedDate
}

const parseTyyppi = (tyyppiString) => {
  switch (tyyppiString) {
    case 'Asiakaskäyntiä':
      return 'Asiakaskäynti'
    case 'Harrastustukihakemusta':
      return 'Harrastustukihakemus'
    case 'Asiakaskäyntiä, Harrastustukihakemusta':
      return 'Asiakaskäynti, Harrastustukihakemus'
    default:
      return tyyppiString
  }
}

const parseAikuiset = (aikuisetString) => {
  if (!aikuisetString) {
    return []
  }
  let aikuiset = aikuisetString.split(/,| ja /)
  aikuiset = aikuiset.map(aikuinenString => {
    const aikuinen = aikuinenString.split(/\(|\)/)
    const nimi = aikuinen[0].trim()
    const syntymävuosi = aikuinen[1].trim()

    return {
      id: uuid(),
      nimi,
      syntymävuosi
    }
  })
  return aikuiset
}

const parseLapset = (formData) => {
  const lapset = []
  let i = 1
  while (formData[`${i}. lapsen syntymäpäivä`]) {
    // console.log(i, formData[`${i}. lapsen syntymäpäivä`])
    lapset.push({
      id: uuid(),
      sukupuoli: formData[`${i}. lapsen sukupuoli`].trim(),
      syntymäpäivä: parse(formData[`${i}. lapsen syntymäpäivä`], 'd.M.y', new Date(0, 0)),
      vaatekoko: formData[`${i}. lapsen vaatekoko`].trim(),
      kenkäkoko: formData[`${i}. lapsen kenkäkoko`].trim(),
      kiinnostuksenKohteet: formData[`${i}. lapsen kiinnostuksen kohteet`].trim(),
    })
    i++
  }

  return lapset
}

const formSheetParser = (formData) => {
  if (!formData['Aikaleima'] || formData['Tarkistettu']) {
    return null
  }

  const data = {
    aika: parseDate(formData['Aikaleima']),
    tyyppi: parseTyyppi(formData['Yhteydenottoni koskee']),
    sähköposti: formData['Sähköpostiosoite'].trim(),
    nimi: formData['Huoltajan nimi'].trim(),
    syntymävuosi: formData['Huoltajan syntymävuosi'].trim(),
    osoite: formData['Osoite, postinumero ja postitoimipaikka'].trim(),
    puhelinnumero: formData['Puhelinnumero'].trim(),
    elämäntilanne: formData['Elämäntilanne'].trim(),
    ilvestappara: formData['Ilves vai Tappara'].trim(),
    aikuiset: parseAikuiset(formData['Kaikkien muiden taloudessa asuvien täysi-ikäisten koko nimi ja syntymävuosi']),
    lapset: parseLapset(formData),
    huomioitavaa: '',
    tarkistettu: formData['Tarkistettu'],
    id: uuid()
  }

  return data
}

export default formSheetParser