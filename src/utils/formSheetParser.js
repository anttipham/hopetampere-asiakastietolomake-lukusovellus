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

const parseAikuiset = (aikuisetString) => {
  if (!aikuisetString) {
    return []
  }
  let aikuiset = aikuisetString.split(/,| ja /g)
  aikuiset = aikuiset.map(aikuinen => aikuinen.trim())
  aikuiset = aikuiset.filter(aikuinen => aikuinen)
  aikuiset = aikuiset.map(aikuinen => ({
    id: uuid(),
    nimi: aikuinen
  }))
  return aikuiset
}

const parseLapset = (formData) => {
  const lapset = []
  for (let i = 1; i <= 12; i++) {
    if (!formData[`${i}. lapsen syntymäpäivä`]) {
      continue
    }
    lapset.push({
      id: uuid(),
      sukupuoli: formData[`${i}. lapsen sukupuoli`].trim(),
      syntymäpäivä: parse(formData[`${i}. lapsen syntymäpäivä`], 'd.M.y', new Date(0, 0)),
      vaatekoko: formData[`${i}. lapsen vaatekoko`].trim(),
      kenkäkoko: formData[`${i}. lapsen kenkäkoko`].trim(),
      kiinnostuksenKohteet: formData[`${i}. lapsen kiinnostuksen kohteet`].trim(),
    })
  }

  return lapset
}

const formSheetParser = (formData) => {
  if (!formData['Aikaleima'] || formData['Tarkistettu']) {
    return null
  }

  const data = {
    aika: parseDate(formData['Aikaleima']),
    tyyppi: formData['Yhteydenottoni koskee seuraavia'].trim(),
    sähköposti: formData['Sähköpostiosoite'].trim(),
    nimi: formData['Huoltajan koko nimi'].trim(),
    syntymävuosi: formData['Huoltajan syntymävuosi'].trim(),
    osoite: formData['Osoite, postinumero ja postitoimipaikka'].trim(),
    puhelinnumero: formData['Puhelinnumero'].trim(),
    elämäntilanne: formData['Elämäntilanne'].trim(),
    ilvestappara: formData['Ilves tai Tappara'].trim(),
    aikuiset: parseAikuiset(formData['Kaikkien muiden taloudessa asuvien täysi-ikäisten koko nimi']),
    lapset: parseLapset(formData),
    huomioitavaa: '',
    tarkistettu: formData['Tarkistettu'],
    id: uuid()
  }

  return data
}

export default formSheetParser