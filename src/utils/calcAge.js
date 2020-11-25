const { differenceInYears } = require('date-fns')

const calcAge = (birthDate, today=new Date()) => {
  if (typeof birthDate === 'string') {
    birthDate = new Date(birthDate)
  }
  return differenceInYears(today, birthDate)
}

export default calcAge