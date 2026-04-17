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

    this.before('PATCH', Voivodeships.drafts, async(req) =>  {
      let { population } = req.data
      if (parseInt(population) < 0) {
          req.error('Population cannot be under 0!')
      }
    })

    this.before('SAVE', Voivodeships.drafts, async (req) => {
      console.log('EVENT SAVE')
    })

    this.on('getInfoBoundAction', Voivodeships, async (req) => {
      console.log('This is bound action')
    })

    this.on('getInfoBoundAction', Voivodeships.drafts, async (req) => {
      console.log('This is draft bound action')
    })

    this.on('getInfoUnboundAction', Voivodeships, async (req) => {
      console.log('This is an unbound action')
    })
    return super.init()
  }
}
