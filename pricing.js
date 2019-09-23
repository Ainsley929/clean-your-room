function lifePrice(coverageAmount, product, price) {
  price += (coverageAmount / product.cost.costDivisor) * product.cost.price
  return price
}
function ltdPrice(employee, salaryPercentage, product, price) {
  price += ((employee.salary * salaryPercentage) / product.cost.costDivisor) * product.cost.price
  return price
}
function formatPrice(price) {
  return parseInt(price * 100) / 100
}
function discount(dollarsOff, product, price) {
  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  } else {
    dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
  }
  return (price)
}
module.exports.calculateProductPrice = function (product, employee, coverageLevels) {
  var price = 0
  var dollarsOff = 0

  switch (product.type) {
    case 'volLife':
      for (var i = 0; i < coverageLevels.length; i++) {
        var coverageAmount = coverageLevels[i].coverage

        price = lifePrice(coverageAmount, product, price)
      }

      var lifeDiscount = discount(dollarsOff, product, price)


      return formatPrice(lifeDiscount)

    case 'ltd':
      var salaryPercentage = product.coveragePercentage / 100

      price = ltdPrice(employee, salaryPercentage, product, price)

      var ltdDiscount = discount(coverageAmount, product, price)


      return formatPrice(ltdDiscount)
    default:
      return 0
  }
}
