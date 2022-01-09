let Model = require('./facades/model')

class App extends Model {
  /**
   * suffix route to call api
   *
   * @var {string} route
   */
  route = 'accounts'

  constructor() {
    super()
  }
}

module.exports = new App()
