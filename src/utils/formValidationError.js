import { format } from 'date-fns'

// Apufuntiot
const trimAndLowerCase = (string) => string.toLowerCase().trim()
const formatBirthday = (date) => {
  if (typeof date === 'string') {
    return date
  } else {
    return format(date, 'yyyy-MM-dd')
  }
}

/** Tarkistaa, ovatko lapsijoukot samat. */
const sameChildren = (children1, children2) => {
  if (children1.length !== children2.length) {
    return false
  }

  // console.log(5555)
  // console.log(1, children1)
  // console.log(2, children2)

  const isSameChild = (child1, child2) => {
    // console.log(6666)
    // console.log(1, child1)
    // console.log(2, child2)
    return child1.sukupuoli === child2.sukupuoli
      && formatBirthday(child1.syntymäpäivä) === formatBirthday(child2.syntymäpäivä)
  }

  /** Tarkistaa, onko children1 osajoukko children2:sta */
  const isSubset = (children1, children2) => {
    for (const child1 of children1) {
      // Jos child1 ei ole joukossa children2, children1 ei ole osajoukko children2:sta
      if (!children2.some(child2 => isSameChild(child1, child2))) {
        return false
      }
    }
    return true
  }

  // Ovat samat joukot, jos molemmat ovat toistensa osajoukkoja
  return isSubset(children1, children2) && isSubset(children2, children1)
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

  // Tarkistukset, jotka liittyvät muihin perheisiin
  for (const family of families) {
    if (trimAndLowerCase(newFamily.sähköposti) === trimAndLowerCase(family.sähköposti)) {
      errors.push(`Rekisterissä on jo sähköposti ${family.sähköposti}!`)
    }

    if (
      trimAndLowerCase(newFamily.nimi) === trimAndLowerCase(family.nimi)
      && Number(newFamily.syntymävuosi) === Number(family.syntymävuosi)
    ) {
      errors.push(`Rekisterissä on henkilö ${family.nimi}, joka on syntynyt vuonna ${family.syntymävuosi}!`)
    }

    if (trimAndLowerCase(newFamily.osoite) === trimAndLowerCase(family.osoite)) {
      errors.push(`Rekisterissä on jo osoite ${family.osoite}!`)
    }

    if (
      newFamily.puhelinnumero
      && newFamily.puhelinnumero === family.puhelinnumero
    ) {
      errors.push(`Rekisterissä on jo puhelinnumero ${family.puhelinnumero}!`)
    }

    if (sameChildren(newFamily.lapset, family.lapset)) {
      errors.push(`Rekisterissä on henkilö ${family.nimi}, jonka lapsien syntymäpäivät, sukupuolet ja määrät ovat tismalleen samat tämän kanssa!`)
    }
  }

  return errors
}

export default formValidationError