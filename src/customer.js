let Model = require('./facades/model')

class App extends Model {
  /**
   * suffix route to call api
   *
   * @var {string} route
   */
  route = 'customers'

  constructor() {
    super()
  }
}

module.exports = new App()
