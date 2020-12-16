import { format } from 'date-fns'

const formatDateToString = (date) => {
  // On truthy. On Date. Ei ole Invalid Date.
  if (date && (date instanceof Date) && !isNaN(date)) {
    return format(date, 'd.M.y')
  }
}

const sentenceToWordArray = (sentence) => {
  if (typeof sentence === 'string') {
    return sentence.toLowerCase().split(' ')
  }
}

const filterFamily = (filterString, family) => {
  let filterWords = sentenceToWordArray(filterString)

  // Kun ei ole hakusanoja, hyväksytään
  if (filterWords.length === 0) {
    return true
  }

  const lapsetStringArray = family.lapset.map(lapsi => [
    formatDateToString(lapsi.syntymäpäivä),
    ...sentenceToWordArray(lapsi.sukupuoli),
    ...sentenceToWordArray(lapsi.vaatekoko),
    ...sentenceToWordArray(lapsi.kenkäkoko),
    ...sentenceToWordArray(lapsi.kiinnostuksenKohteet)
  ])

  let familyStringArray = [
    formatDateToString(family.aika),
    family.syntymävuosi.toString(),
    ...sentenceToWordArray(family.tyyppi),
    ...sentenceToWordArray(family.sähköposti),
    ...sentenceToWordArray(family.nimi),
    ...sentenceToWordArray(family.osoite),
    ...sentenceToWordArray(family.puhelinnumero),
    ...sentenceToWordArray(family.elämäntilanne),
    ...sentenceToWordArray(family.ilvestappara),
    ...sentenceToWordArray(family.huomioitavaa),
    ...family.aikuiset.map(aikuinen => aikuinen.nimi),
    ...lapsetStringArray.reduce((previousLapsi, currentLapsi) => [...previousLapsi, ...currentLapsi], []),
  ]

  // console.log(familyStringArray)
  return filterWords.every(searchWord =>
    familyStringArray.some(familyString =>
      familyString.includes(searchWord)
    )
  )
}

export default filterFamily