const cds = require('@sap/cds')

module.exports = class WeatherService extends cds.ApplicationService {
  init() {

    const { Voivodeships, Cities, Temperatures, Sources } = cds.entities('WeatherService')

    this.before('READ', Voivodeships, async (voivodeships, req) => {
      console.log('Before READ')
    })

    this.on('READ', Voivodeships, async (req, next) => {
      console.log('On READ')
      const data = await next();
      return next()
    })

    this.after('READ', Voivodeships, async (voivodeships, req) => {
      console.log('After READ')
    })

    return super.init()
  }
}
