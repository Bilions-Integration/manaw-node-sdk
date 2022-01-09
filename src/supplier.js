let Model = require('./facades/model')

class App extends Model {
  /**
   * suffix route to call api
   *
   * @var {string} route
   */
  route = 'suppliers'

  constructor() {
    super()
  }
}

module.exports = new App()
