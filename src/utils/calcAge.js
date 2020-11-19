const { differenceInYears } = require('date-fns')

const calcAge = (birthDate, today=new Date()) => {
  return differenceInYears(today, birthDate)
}

export default calcAge