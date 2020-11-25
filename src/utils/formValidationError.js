import { format } from 'date-fns'
import calcAge from './calcAge'

// Apufuntiot
const trimAndLowerCase = (string) => string.toLowerCase().trim()

const formatBirthday = (date) => {
  if (typeof date === 'string') {
    return date
  } else {
    return format(date, 'yyyy-MM-dd')
  }
}

/** Tarkistaa, onko set1 osajoukko set2:sta */
const isSubset = (set1, set2, isSame) => {
  for (const member1 of set1) {
    // Jos child1 ei ole joukossa children2, children1 ei ole osajoukko children2:sta
    if (!set2.some(member2 => isSame(member1, member2))) {
      return false
    }
  }
  return true
}

/**
 * Tarkistaa, onko family osajoukko otherFamily:stä
 * @param family Asiakasperhe, jonka aikuiset tarkistetaan
 * @param otherFamily Asiakasperhe, jonka aikuiset verrataan
 */
const isSubsetAdults = (family, otherFamily) => {
  const parseAdultsFromFamily = (family) => ([
    {
      nimi: family.nimi,
      syntymävuosi: family.syntymävuosi
    },
    ...family.aikuiset
  ])

  const adults1 = parseAdultsFromFamily(family)
  const adults2 = parseAdultsFromFamily(otherFamily)

  const isSameAdult = (adult1, adult2) =>
    trimAndLowerCase(adult1.nimi) === trimAndLowerCase(adult2.nimi)
    && Number(adult1.syntymävuosi) === Number(adult2.syntymävuosi)

  return isSubset(adults1, adults2, isSameAdult) || isSubset(adults2, adults1, isSameAdult)
}

/** Tarkistaa, ovatko lapsijoukot samat. */
const sameChildren = (children1, children2) => {
  if (children1.length !== children2.length) {
    return false
  }

  const isSameChild = (child1, child2) => {
    return child1.sukupuoli === child2.sukupuoli
      && formatBirthday(child1.syntymäpäivä) === formatBirthday(child2.syntymäpäivä)
  }

  // Ovat samat joukot, jos molemmat ovat toistensa osajoukkoja
  return isSubset(children1, children2, isSameChild) && isSubset(children2, children1, isSameChild)
}

/**
 * @param newFamily Perhe, jonka aitoutta tarkistetaan
 * @param families Kaikki perheet, jotka ovat rekisterissä
 */
const formValidationError = (newFamily, families) => {
  const errors = []

  // Tarkistukset asiakkaasta
  const possibleAge = new Date().getFullYear() - Number(newFamily.syntymävuosi)
  if (possibleAge === 18) {
    errors.push('Lomakkeen lähettäjä on mahdollisesti alaikäinen, jos hän ei ole vielä viettänyt syntymäpäiväänsä tänä vuonna.')
  } else if (possibleAge < 18) {
    errors.push('Lomakkeen lähettäjä on alaikäinen!')
  }

  newFamily.lapset.some(lapsi => {
    if (calcAge(lapsi.syntymäpäivä) >= 18) {
      errors.push('Lomakkeen lapsikentässä on täysi-ikäinen!')
      return true
    } else {
      return false
    }
  })

  // Tarkistukset, jotka liittyvät muihin perheisiin
  for (const family of families) {
    if (trimAndLowerCase(newFamily.sähköposti) === trimAndLowerCase(family.sähköposti)) {
      errors.push(`Rekisterissä on asiakas ${family.nimi}, jonka sähköpostiosoite on ${family.sähköposti}!`)
    }

    if (trimAndLowerCase(newFamily.osoite) === trimAndLowerCase(family.osoite)) {
      errors.push(`Rekisterissä on asiakas ${family.nimi} (${family.sähköposti}), jonka osoite on ${family.osoite}!`)
    }

    if (newFamily.puhelinnumero && newFamily.puhelinnumero === family.puhelinnumero) {
      errors.push(`Rekisterissä on asiakas ${family.nimi} (${family.sähköposti}), jonka puhelinnumero on ${family.puhelinnumero}!`)
    }

    if (isSubsetAdults(newFamily, family) || isSubsetAdults(family, newFamily)) {
      errors.push(`Rekisterissä on asiakas ${family.nimi} (${family.sähköposti}), jonka täysi-ikäiset ovat samankaltaisia tämän kanssa!`)
    }

    if (sameChildren(newFamily.lapset, family.lapset)) {
      errors.push(`Rekisterissä on asiakas ${family.nimi} (${family.sähköposti}), jonka lapsien syntymäpäivät, sukupuolet ja määrät ovat tismalleen samat tämän kanssa!`)
    }
  }

  // Virheen nimi laitetaan key-proppiin, joten ei saa olla toistoja. Hashset poistaa toistot.
  return [...new Set(errors)]
}

export default formValidationError